import { z } from "zod";

// Zod Schema
export const marathonSchema = z
  .object({
    fname: z
      .string()
      .min(3, { message: "First name must have at least 3 letters" }),
    lname: z.string().min(5, "Last name must have at least 5 letters"),
    plan: z.enum(["funrun", "mini", "half", "full"], {
      message: "Select a plan",
    }),
    gender: z.enum(["male", "female"], { message: "Select gender" }),
    agree: z.boolean().default(false),
    email: z.email(),
    password: z.string()
      .min(6, {message: "Password must contain at least 6 letters"})
      .max(12, {message: "Password must not exceed 12 characters"}),
    confirmpassword: z.string().optional(),
    haveCoupon: z.boolean().default(false),
    couponCode: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.haveCoupon) return true;
      return data.couponCode?.trim() === "CMU2025";
    },
    {
      message: "Invalid coupon code",
      path: ["couponCode"],
    }
  )
  .refine(
    (data) => {
      if (data.password === data.confirmpassword) return true;
      return data.password?.trim() === data.confirmpassword;
    },
    {
      message: "Password does not match",
      path: ["confirmpassword"],
    }
  );
export type MarathonForm = z.infer<typeof marathonSchema>;
