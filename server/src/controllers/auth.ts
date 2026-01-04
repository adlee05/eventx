import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.ts";;
import * as z from 'zod';
import envs from "../config/index.ts";

// type 
import type { Request, Response } from "express";

// login zod schema
const zodLogin = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8, "Password too short.")
});

// cookie options
const cookieOpts = {
  httpOnly: true,
  secure: envs.env_type == "prod",
  sameSite: "strict" as const,
}

async function login(req: Request, res: Response) {
  //validate input
  const result = zodLogin.safeParse({
    email: req.body.email,
    password: req.body.password
  });

  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({
      message: "Credentials do not conform to rules",
      error: result.error.format(),
    });
  }

  // get userDetails post validation
  let details;
  try {
    details = await UserModel.findOne({ email: req.body.email }, 'username email password role');
    console.log(details);
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error.");
  }

  if (details == null) {
    return res.status(400).send("User does not exist");
  }

  // verify user
  const match = await bcrypt.compare(result.data.password, details.password);
  if (!match) {
    return res.status(401).send("Invalid password");
  }

  // create a JWT
  const token = jwt.sign({
    userId: details._id,
    role: details.role
  },
    envs.jwt_secret,
    { expiresIn: "7d" }
  );

  res.cookie("auth_token", token, {
    ...cookieOpts,
    maxAge: 60 * 60 * 24 * 7 * 1000
  });

  return res.status(200).send("login successful, token sent");
}

// signup zod schema
const zodSignUp = z.object({
  username: z.string().trim().min(4, "Username too Short!").max(12, "Username too long!"),
  email: z.string().email("Invalid email address."),
  password: z.string().trim().min(8, "Password too short.")
});

async function signup(req: Request, res: Response) {
  const userDetails = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }

  const result = zodSignUp.safeParse(userDetails);
  console.log(result);
  if (!result.success) {
    return res.status(400).json({
      message: "Credentials do not conform to rules.",
      error: result.error.format(),
    });
  }

  // post validation: saving to the db
  // hash the password first
  try {
    const hashedPass = await bcrypt.hash(userDetails.password, 10);

    const user = new UserModel({
      username: userDetails.username,
      email: userDetails.email,
      password: hashedPass,
    })

    await user.save();

    const token = jwt.sign({
      userId: user._id,
      role: user.role
    }, envs.jwt_secret, {
      expiresIn: "7d"
    });

    // set token
    res.cookie("auth_token", token, {
      ...cookieOpts,
      maxAge: 60 * 60 * 24 * 7 * 1000
    });

    res.status(200).send("User created successfully, token sent");

  } catch (e) {
    console.log(e);

    // differentiate b/w mongodb and bcrypt errors
    if (e.name == 'MongoServerError' && (e.code == 11000 || e.code == 11001)) {
      let duplicateField: string;

      if (e.message.includes('username')) {
        duplicateField = 'username';
      } else if (e.message.includes('email')) {
        duplicateField = 'email';
      } else {
        duplicateField = 'unknown';
      }

      return res.status(400).send(`A user with that ${duplicateField} already exists.`);
    }

    // other issues
    return res.status(500).send("Internal Server Error.");
  }
}

export { login, signup };
