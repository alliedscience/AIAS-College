import bcrypt from "bcryptjs";

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

// In-memory persistent collection for user sessions and registrations
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

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newUser: RegisteredUser = {
      id: `user-${Date.now()}`,
      studentId: `AIAS-2026-STU-${randomSuffix}`,
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
