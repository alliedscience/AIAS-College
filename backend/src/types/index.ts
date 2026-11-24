import { Institution, Course, Enquiry, AdminUser, Notice, Media, Role, EnquiryStatus } from "@prisma/client";

export type { Institution, Course, Enquiry, AdminUser, Notice, Media, Role, EnquiryStatus };

export interface InstitutionWithCourses extends Institution {
  courses: Course[];
}

export interface CourseWithInstitution extends Course {
  institution: Institution;
}

export interface EnquiryWithDetails extends Enquiry {
  institution: Institution;
  course: Course;
  assignedTo?: AdminUser | null;
}

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
