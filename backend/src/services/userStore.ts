import bcrypt from "bcryptjs";
import { connectDatabase } from "../lib/db";
import { AdminUser, StudentUser } from "../models";

export interface RegisteredUser {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: "STUDENT" | "ADMIN";
  institutionPreference: string;
  coursePreference: string;
  wbsccInterest: boolean;
  applicationStatus: "REGISTERED" | "DOCS_PENDING" | "IN_REVIEW" | "ADMITTED";
  createdAt: string;
}

// In-memory fallback collection for user sessions and local offline dev
const usersStore: RegisteredUser[] = [
  {
    id: "user-demo-01",
    studentId: "AIAS-2026-STU-1082",
    fullName: "Sourav Mukherjee",
    email: "student@aias.edu.in",
    phone: "9832000000",
    passwordHash: bcrypt.hashSync("student123", 10),
    role: "STUDENT",
    institutionPreference: "Asansol Institute of Allied Sciences (AIAS)",
    coursePreference: "Diploma in Medical Laboratory Technology (DMLT)",
    wbsccInterest: true,
    applicationStatus: "IN_REVIEW",
    createdAt: "2026-05-10T10:00:00.000Z",
  },
  {
    id: "user-admin-01",
    studentId: "AIAS-ADMIN-001",
    fullName: "Portal Super Administrator",
    email: process.env.INITIAL_ADMIN_EMAIL || "admin@aias.edu.in",
    phone: "1800897334",
    passwordHash: bcrypt.hashSync(
      process.env.INITIAL_ADMIN_PASSWORD || "ChangeMe_AIAS2026!Secure",
      10
    ),
    role: "ADMIN",
    institutionPreference: "Central Administrative Secretariat",
    coursePreference: "All Academic Wings",
    wbsccInterest: false,
    applicationStatus: "ADMITTED",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export class UserRepository {
  static async register(data: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    institutionPreference?: string;
    coursePreference?: string;
    wbsccInterest?: boolean;
  }): Promise<{ user: Omit<RegisteredUser, "passwordHash">; token: string }> {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const studentId = `AIAS-2026-STU-${randomSuffix}`;

    // 1. Try MongoDB persistence
    try {
      if (await connectDatabase()) {
        const existingStudent = await StudentUser.findOne({
          $or: [{ email: data.email.toLowerCase().trim() }, { phone: data.phone.trim() }],
        }).lean();

        if (existingStudent) {
          throw new Error("An account with this email address or phone number already exists.");
        }

        const created = await StudentUser.create({
          studentId,
          fullName: data.fullName.trim(),
          email: data.email.toLowerCase().trim(),
          phone: data.phone.trim(),
          passwordHash,
          role: "STUDENT",
          institutionPreference: data.institutionPreference || "Asansol Institute of Allied Sciences (AIAS)",
          coursePreference: data.coursePreference || "Diploma in Medical Laboratory Technology (DMLT)",
          wbsccInterest: data.wbsccInterest ?? true,
          applicationStatus: "REGISTERED",
        });

        const safeUser: Omit<RegisteredUser, "passwordHash"> = {
          id: (created as any)._id.toString(),
          studentId: created.studentId,
          fullName: created.fullName,
          email: created.email,
          phone: created.phone,
          role: "STUDENT",
          institutionPreference: created.institutionPreference,
          coursePreference: created.coursePreference,
          wbsccInterest: created.wbsccInterest,
          applicationStatus: created.applicationStatus as RegisteredUser["applicationStatus"],
          createdAt: (created as any).createdAt ? (created as any).createdAt.toISOString() : new Date().toISOString(),
        };

        const token = `aias_token_${safeUser.id}_${Date.now()}`;
        return { user: safeUser, token };
      }
    } catch (err: any) {
      if (err.message && err.message.includes("already exists")) {
        throw err;
      }
      // Continue to fallback store
    }

    // 2. In-memory store fallback
    const existing = usersStore.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() ||
        u.phone === data.phone
    );

    if (existing) {
      throw new Error(
        "An account with this email address or phone number already exists."
      );
    }

    const newUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      studentId,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      passwordHash,
      role: "STUDENT",
      institutionPreference:
        data.institutionPreference ||
        "Asansol Institute of Allied Sciences (AIAS)",
      coursePreference:
        data.coursePreference ||
        "Diploma in Medical Laboratory Technology (DMLT)",
      wbsccInterest: data.wbsccInterest ?? true,
      applicationStatus: "REGISTERED",
      createdAt: new Date().toISOString(),
    };

    usersStore.push(newUser);

    const { passwordHash: _, ...safeUser } = newUser;
    const token = `aias_token_${newUser.id}_${Date.now()}`;

    return { user: safeUser, token };
  }

  static async authenticate(
    emailOrPhone: string,
    password: string
  ): Promise<{ user: Omit<RegisteredUser, "passwordHash">; token: string } | null> {
    const identifier = emailOrPhone.toLowerCase().trim();

    // 1. Try MongoDB authentication
    try {
      if (await connectDatabase()) {
        // Check AdminUser first
        const admin = await AdminUser.findOne({ email: identifier, isActive: true }).lean();
        if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
          const safeAdmin: Omit<RegisteredUser, "passwordHash"> = {
            id: (admin as any)._id.toString(),
            studentId: "AIAS-ADMIN-001",
            fullName: admin.name,
            email: admin.email,
            phone: "1800897334",
            role: "ADMIN",
            institutionPreference: "Central Administrative Secretariat",
            coursePreference: "All Academic Wings",
            wbsccInterest: false,
            applicationStatus: "ADMITTED",
            createdAt: (admin as any).createdAt ? (admin as any).createdAt.toISOString() : new Date().toISOString(),
          };
          const token = `aias_token_${safeAdmin.id}_${Date.now()}`;
          return { user: safeAdmin, token };
        }

        // Check StudentUser
        const student = await StudentUser.findOne({
          $or: [{ email: identifier }, { phone: identifier }],
        }).lean();

        if (student && (await bcrypt.compare(password, student.passwordHash))) {
          const safeStudent: Omit<RegisteredUser, "passwordHash"> = {
            id: (student as any)._id.toString(),
            studentId: student.studentId,
            fullName: student.fullName,
            email: student.email,
            phone: student.phone,
            role: "STUDENT",
            institutionPreference: student.institutionPreference,
            coursePreference: student.coursePreference,
            wbsccInterest: student.wbsccInterest,
            applicationStatus: student.applicationStatus as RegisteredUser["applicationStatus"],
            createdAt: (student as any).createdAt ? (student as any).createdAt.toISOString() : new Date().toISOString(),
          };
          const token = `aias_token_${safeStudent.id}_${Date.now()}`;
          return { user: safeStudent, token };
        }
      }
    } catch {
      // Fallback to memory
    }

    // 2. In-memory authentication fallback
    const user = usersStore.find(
      (u) => u.email.toLowerCase() === identifier || u.phone === identifier
    );

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return null;
    }

    const { passwordHash: _, ...safeUser } = user;
    const token = `aias_token_${user.id}_${Date.now()}`;

    return { user: safeUser, token };
  }

  static findById(id: string): Omit<RegisteredUser, "passwordHash"> | null {
    const user = usersStore.find((u) => u.id === id);
    if (!user) return null;
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  static listStudents(): Array<Omit<RegisteredUser, "passwordHash">> {
    return usersStore
      .filter((u) => u.role === "STUDENT")
      .map(({ passwordHash: _, ...safeUser }) => safeUser);
  }
}
