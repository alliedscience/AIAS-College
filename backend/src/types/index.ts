import type { InferSchemaType } from "mongoose";
import type { AdminUser, Course, Enquiry, Institution, Media, Notice } from "../models";

export type Role = "SUPER_ADMIN" | "INSTITUTION_ADMIN" | "ADMISSION_MANAGER" | "CONTENT_EDITOR";
export type EnquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "DOCUMENTS_PENDING" | "ADMITTED" | "CLOSED" | "REJECTED";
export type InstitutionDocument = InferSchemaType<typeof Institution.schema>;
export type CourseDocument = InferSchemaType<typeof Course.schema>;
export type EnquiryDocument = InferSchemaType<typeof Enquiry.schema>;
export type AdminUserDocument = InferSchemaType<typeof AdminUser.schema>;
export type NoticeDocument = InferSchemaType<typeof Notice.schema>;
export type MediaDocument = InferSchemaType<typeof Media.schema>;
export type InstitutionWithCourses = InstitutionDocument & { courses: CourseDocument[] };
export type CourseWithInstitution = CourseDocument & { institution: InstitutionDocument };
export type EnquiryWithDetails = EnquiryDocument & { institution: InstitutionDocument; course: CourseDocument; assignedTo?: AdminUserDocument | null };


export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  children?: NavItem[];
}

export interface InstitutionalContact {
  institutionName: string;
  tollFree: string;
  email: string;
  address: string;
}
