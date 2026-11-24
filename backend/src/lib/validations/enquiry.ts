import { z } from "zod";

/**
 * Strict Zod validation schema for student admission inquiries
 * Adheres to Section 8 of the Master Project Specification.
 */
export const enquirySchema = z.object({
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Student name cannot exceed 100 characters")
    .trim(),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  institutionId: z
    .string()
    .min(1, "Please select an educational institution"),
  courseId: z
    .string()
    .min(1, "Please select your preferred course of study"),
  highestQualification: z
    .string()
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .optional()
    .or(z.literal("")),
  wbsccInterest: z
    .boolean()
    .default(false),
  message: z
    .string()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must consent to be contacted for academic counseling.",
    }),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
export type EnquiryInput = EnquiryFormValues;
