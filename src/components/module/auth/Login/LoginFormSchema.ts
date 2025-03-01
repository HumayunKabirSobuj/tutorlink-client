import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string({ required_error: "Name or Phone is required" }),
  password: z.string({ required_error: "Password is required" }),
});
