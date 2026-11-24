import { db } from "../prisma/db";
import { generateEnquiryNumber } from "../lib/utils";
import { EnquiryFormValues } from "../lib/validations/enquiry";

export interface StoredEnquiry {
  id: string;
  enquiryNumber: string;
  studentName: string;
  candidateName: string; // convenient alias
  email: string;
  phone: string;
  institutionSlug: string;
  institutionName: string;
  courseSlug: string;
  courseName: string;
  highestQualification: string;
  qualification: string; // convenient alias
  city: string;
  state: string;
  notes?: string;
  status: "NEW" | "CONTACTED" | "IN_REVIEW" | "ADMITTED" | "CLOSED";
  source: string;
  createdAt: string;
  updatedAt: string;
  timeline: Array<{
    date: string;
    action: string;
    note: string;
  }>;
}

const initialMockEnquiries: StoredEnquiry[] = [
  {
    id: "enq-01",
    enquiryNumber: "ENQ-2026-08142",
    studentName: "Sourav Mukherjee",
    candidateName: "Sourav Mukherjee",
    email: "sourav.mukherjee2026@gmail.com",
    phone: "9832000000",
    institutionSlug: "aias",
    institutionName: "Asansol Institute of Allied Sciences",
    courseSlug: "medical-laboratory-technology",
    courseName: "Diploma in Medical Laboratory Technology (DMLT)",
    highestQualification: "10+2 Science (PCB)",
    qualification: "10+2 Science (PCB)",
    city: "Asansol",
    state: "West Bengal",
    notes: "Candidate inquired about hospital internship rotations and WBSCC loan processing.",
    status: "NEW",
    source: "Website Admissions Desk",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    timeline: [
      {
        date: new Date(Date.now() - 3600000 * 4).toISOString(),
        action: "ENQUIRY_RECEIVED",
        note: "Admission enquiry submitted via portal.",
      },
    ],
  },
  {
    id: "enq-02",
    enquiryNumber: "ENQ-2026-08143",
    studentName: "Priyanka Roy",
    candidateName: "Priyanka Roy",
    email: "priyanka.roy99@outlook.com",
    phone: "8765432109",
    institutionSlug: "pramoth-nath-das",
    institutionName: "Pramoth Nath Das Academy of Nursing",
    courseSlug: "gnm",
    courseName: "General Nursing and Midwifery (G.N.M)",
    highestQualification: "10+2 Arts (62%)",
    qualification: "10+2 Arts (62%)",
    city: "Durgapur",
    state: "West Bengal",
    notes: "Counselor called candidate; explained 3-year curriculum and hostel accommodation.",
    status: "CONTACTED",
    source: "Website Header Apply",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    timeline: [
      {
        date: new Date(Date.now() - 3600000 * 24).toISOString(),
        action: "ENQUIRY_RECEIVED",
        note: "Admission enquiry submitted.",
      },
      {
        date: new Date(Date.now() - 3600000 * 18).toISOString(),
        action: "PHONE_CALL",
        note: "Counselor discussed eligibility and hostel facilities.",
      },
    ],
  },
  {
    id: "enq-03",
    enquiryNumber: "ENQ-2026-08144",
    studentName: "Anirban Banerjee",
    candidateName: "Anirban Banerjee",
    email: "anirban.b@rediffmail.com",
    phone: "9123456780",
    institutionSlug: "bijoy-pal-memorial",
    institutionName: "Bijoy Pal Memorial B.Ed College",
    courseSlug: "bed",
    courseName: "Bachelor of Education (B.Ed)",
    highestQualification: "M.A. English (58%)",
    qualification: "M.A. English (58%)",
    city: "Raniganj",
    state: "West Bengal",
    notes: "Applied for English Method subject. Documents under verification.",
    status: "IN_REVIEW",
    source: "Course Detail Page",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    timeline: [
      {
        date: new Date(Date.now() - 3600000 * 48).toISOString(),
        action: "ENQUIRY_RECEIVED",
        note: "Applied for B.Ed English method subject.",
      },
      {
        date: new Date(Date.now() - 3600000 * 12).toISOString(),
        action: "STATUS_CHANGE",
        note: "Marked as IN_REVIEW pending M.A. marksheet verification.",
      },
    ],
  },
  {
    id: "enq-04",
    enquiryNumber: "ENQ-2026-08145",
    studentName: "Debjit Ghosh",
    candidateName: "Debjit Ghosh",
    email: "debjit.ghosh@yahoo.com",
    phone: "9876501234",
    institutionSlug: "aias",
    institutionName: "Asansol Institute of Allied Sciences",
    courseSlug: "agriculture",
    courseName: "Diploma in Agriculture",
    highestQualification: "10+2 Pure Science",
    qualification: "10+2 Pure Science",
    city: "Burdwan",
    state: "West Bengal",
    notes: "Candidate verified credentials, processed WBSCC application, admitted to 2026 session.",
    status: "ADMITTED",
    source: "Homepage Admissions Form",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    timeline: [
      {
        date: new Date(Date.now() - 3600000 * 72).toISOString(),
        action: "ENQUIRY_RECEIVED",
        note: "Enquiry submitted for Agriculture Diploma.",
      },
      {
        date: new Date(Date.now() - 3600000 * 2).toISOString(),
        action: "ADMITTED",
        note: "Admission confirmed for 2026-27 batch.",
      },
    ],
  },
];

let memoryEnquiries: StoredEnquiry[] = [...initialMockEnquiries];

export class EnquiryRepository {
  static async create(data: {
    studentName: string;
    email?: string;
    phone: string;
    institutionSlug: string;
    institutionName: string;
    courseSlug: string;
    courseName: string;
    highestQualification?: string;
    city?: string;
    state?: string;
    message?: string;
    wbsccInterest?: boolean;
  }): Promise<StoredEnquiry> {
    const enquiryNumber = generateEnquiryNumber();
    const now = new Date().toISOString();

    const newEnquiry: StoredEnquiry = {
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      enquiryNumber,
      studentName: data.studentName,
      candidateName: data.studentName,
      email: data.email || "",
      phone: data.phone,
      institutionSlug: data.institutionSlug,
      institutionName: data.institutionName,
      courseSlug: data.courseSlug,
      courseName: data.courseName,
      highestQualification: data.highestQualification || "10+2 / Equivalent",
      qualification: data.highestQualification || "10+2 / Equivalent",
      city: data.city || "Asansol",
      state: data.state || "West Bengal",
      notes: data.message,
      status: "NEW",
      source: "Website Admissions Desk",
      createdAt: now,
      updatedAt: now,
      timeline: [
        {
          date: now,
          action: "ENQUIRY_RECEIVED",
          note: "Enquiry registered in portal.",
        },
      ],
    };

    // Try saving to Prisma if DB is available
    try {
      if (prisma) {
        const inst = await db.orm.public.Institution.where({
          slug: data.institutionSlug,
        }).first();

        if (inst) {
          const course = await db.orm.public.Course.where({
            institutionId: inst.id,
            slug: data.courseSlug,
          }).first();

          if (course) {
            await db.orm.public.Enquiry.create({
              enquiryNumber,
              studentName: data.studentName,
              email: data.email || null,
              phone: data.phone,
              institutionId: inst.id,
              courseId: course.id,
              highestQualification: data.highestQualification || null,
              wbsccInterest: data.wbsccInterest ?? false,
              message: data.message || null,
              status: "NEW",
            });
          }
        }
      }
    } catch {
      // Continue with in-memory store
    }

    memoryEnquiries.unshift(newEnquiry);
    return newEnquiry;
  }

  static async list(filters?: {
    institution?: string;
    course?: string;
    status?: string;
    search?: string;
  }): Promise<StoredEnquiry[]> {
    // Attempt Prisma first
    try {
      if (prisma) {
        const dbEnquiries = await db.orm.public.Enquiry.include("institution")
          .include("course")
          .orderBy((enquiry) => enquiry.createdAt.desc())
          .all();

        if (dbEnquiries && dbEnquiries.length > 0) {
          return dbEnquiries.map((e) => ({
            id: e.id,
            enquiryNumber: e.enquiryNumber,
            studentName: e.studentName,
            candidateName: e.studentName,
            email: e.email || "",
            phone: e.phone,
            institutionSlug: e.institution.slug,
            institutionName: e.institution.name,
            courseSlug: e.course?.slug || "general",
            courseName: e.course?.name || "General Enquiry",
            highestQualification: e.highestQualification || "10+2",
            qualification: e.highestQualification || "10+2",
            city: "Asansol",
            state: "West Bengal",
            notes: e.message || undefined,
            status: e.status as StoredEnquiry["status"],
            source: e.source || "Website",
            createdAt: e.createdAt.toISOString(),
            updatedAt: e.updatedAt.toISOString(),
            timeline: [],
          }));
        }
      }
    } catch {
      // Fall through to memory store
    }

    let result = [...memoryEnquiries];

    if (filters?.institution && filters.institution !== "ALL") {
      result = result.filter((e) => e.institutionSlug === filters.institution);
    }
    if (filters?.course && filters.course !== "ALL") {
      result = result.filter((e) => e.courseSlug === filters.course);
    }
    if (filters?.status && filters.status !== "ALL") {
      result = result.filter((e) => e.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.studentName.toLowerCase().includes(q) ||
          e.enquiryNumber.toLowerCase().includes(q) ||
          e.phone.includes(q) ||
          e.email.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
      );
    }

    return result;
  }

  static async updateStatus(
    id: string,
    status: StoredEnquiry["status"],
    note?: string
  ): Promise<StoredEnquiry | null> {
    const idx = memoryEnquiries.findIndex((e) => e.id === id || e.enquiryNumber === id);
    if (idx === -1) return null;

    const current = memoryEnquiries[idx];
    const now = new Date().toISOString();

    const updatedTimeline = [
      ...current.timeline,
      {
        date: now,
        action: `STATUS_CHANGE_TO_${status}`,
        note: note || `Status updated to ${status}.`,
      },
    ];

    memoryEnquiries[idx] = {
      ...current,
      status,
      updatedAt: now,
      timeline: updatedTimeline,
      notes: note ? `${current.notes ? current.notes + " | " : ""}${note}` : current.notes,
    };

    try {
      if (prisma) {
        await db.orm.public.Enquiry.whereUnique({ id: current.id }).update({
          status,
        });
      }
    } catch {
      // Continue
    }

    return memoryEnquiries[idx];
  }

  static async getById(id: string): Promise<StoredEnquiry | null> {
    const found = memoryEnquiries.find((e) => e.id === id || e.enquiryNumber === id);
    return found || null;
  }

  static getStats() {
    const total = memoryEnquiries.length;
    const newEnquiries = memoryEnquiries.filter((e) => e.status === "NEW").length;
    const contacted = memoryEnquiries.filter((e) => e.status === "CONTACTED").length;
    const inReview = memoryEnquiries.filter((e) => e.status === "IN_REVIEW").length;
    const admitted = memoryEnquiries.filter((e) => e.status === "ADMITTED").length;
    const closed = memoryEnquiries.filter((e) => e.status === "CLOSED").length;

    const byInstitution: Record<string, number> = {};
    const byCourse: Record<string, number> = {};

    memoryEnquiries.forEach((e) => {
      byInstitution[e.institutionName] = (byInstitution[e.institutionName] || 0) + 1;
      byCourse[e.courseName] = (byCourse[e.courseName] || 0) + 1;
    });

    return {
      total,
      newEnquiries,
      contacted,
      inReview,
      admitted,
      closed,
      byInstitution,
      byCourse,
    };
  }
}
