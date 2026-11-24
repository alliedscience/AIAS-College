"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enquirySchema = void 0;
const zod_1 = require("zod");
/**
 * Strict Zod validation schema for student admission inquiries
 * Adheres to Section 8 of the Master Project Specification.
 */
exports.enquirySchema = zod_1.z.object({
    studentName: zod_1.z
        .string()
        .min(2, "Student name must be at least 2 characters")
        .max(100, "Student name cannot exceed 100 characters")
        .trim(),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
    email: zod_1.z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .optional()
        .or(zod_1.z.literal("")),
    institutionId: zod_1.z
        .string()
        .min(1, "Please select an educational institution"),
    courseId: zod_1.z
        .string()
        .min(1, "Please select your preferred course of study"),
    highestQualification: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal("")),
    city: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal("")),
    state: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal("")),
    wbsccInterest: zod_1.z
        .boolean()
        .default(false),
    message: zod_1.z
        .string()
        .max(1000, "Message cannot exceed 1000 characters")
        .optional()
        .or(zod_1.z.literal("")),
    consent: zod_1.z
        .boolean()
        .refine((val) => val === true, {
        message: "You must consent to be contacted for academic counseling.",
    }),
});
