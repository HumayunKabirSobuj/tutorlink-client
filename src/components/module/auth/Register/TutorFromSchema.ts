import { z } from "zod";

export const TutorFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(10, "Name must be at least 10 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phone: z
    .string({ required_error: "Phone is required" })
    .length(11, "Phone must be 11 characters"),
  password: z
    .string({ required_error: "Password is required" })
    .length(6, "Password must be 6 characters"),
  passwordConfirm: z.string(),
  district: z.string({ required_error: "District is required" }),
  thana: z.string({ required_error: "Thana is required" }),
  selectedThanas: z.array(z.string()),
  image: z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    // Max 5MB size
    message: "File size must be less than 5MB",
  })
  .refine((file) => file.type.startsWith("image/"), {
    // Must be an image
    message: "Only image files are allowed",
  }),
});