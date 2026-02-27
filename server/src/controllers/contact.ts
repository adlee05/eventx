import { Request, Response } from "express";
import { userContactModel } from "../models/contact.js";
import * as z from "zod";
import { log } from "node:console";

const Issue = z.object({
  issue: z.string(),
  message: z.string()
})
async function createUserContact(req: Request, res: Response) {
  // validate input
  const result = Issue.safeParse({
    issue: req.body.issue,
    message: req.body.message
  });

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Bad Values for an Issue"
    })
  }

  if (req.user == undefined) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }

  const issue = new userContactModel({
    userId: req.user.userId,
    issue: result.data.issue,
    message: result.data.message
  });

  try {
    await issue.save();
    return res.status(201).json({
      success: true,
      message: "Issue Successfully Reported."
    })
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error."
    })
  }
}

async function getAllQueries(req: Request, res: Response) {
}

export { createUserContact, getAllQueries };
