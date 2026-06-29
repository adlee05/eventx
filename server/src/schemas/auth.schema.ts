import * as z from 'zod';

// login zod schema
const zodLogin = z.object({
  email: z.string().email(),
  password: z.string().trim().min(8, "Password too short.")
});

// signup zod schema
const zodSignUp = z.object({
  username: z.string().trim().min(4, "Username too Short!").max(12, "Username too long!"),
  email: z.string().email("Invalid email address."),
  password: z.string().trim().min(8, "Password too short.")
});

export { zodLogin, zodSignUp };
