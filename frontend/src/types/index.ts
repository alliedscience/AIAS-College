export type EnquiryStatus = "NEW" | "CONTACTED" | "IN_REVIEW" | "ADMITTED" | "CLOSED";

export interface StoredEnquiry {
  id: string;
  enquiryNumber: string;
  studentName: string;
  candidateName: string;
  email: string;
  phone: string;
  institutionSlug: string;
  institutionName: string;
  courseSlug: string;
  courseName: string;
  highestQualification: string;
  qualification: string;
  city: string;
  state: string;
  notes?: string;
  status: EnquiryStatus;
  source: string;
  createdAt: string;
  updatedAt: string;
  timeline: Array<{
    date: string;
    action: string;
    note: string;
  }>;
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
