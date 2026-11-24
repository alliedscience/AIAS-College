import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

export type PortalRole = "ADMIN" | "STUDENT";

export type PortalUser = {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  role: PortalRole;
  institutionPreference: string;
  coursePreference: string;
  wbsccInterest: boolean;
  applicationStatus: "REGISTERED" | "DOCS_PENDING" | "IN_REVIEW" | "ADMITTED";
  createdAt: string;
};

type StoredPortalUser = PortalUser & { passwordHash: string };

const defaultUsers: StoredPortalUser[] = [
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

// Keep registration data for the lifetime of this Next.js server process.
// This matches the current development backend's in-memory behaviour.
const userStore = defaultUsers;

function toPublicUser({ passwordHash: _passwordHash, ...user }: StoredPortalUser): PortalUser {
  return user;
}

function createToken(userId: string) {
  return `aias_token_${userId}_${randomUUID()}`;
}

export async function authenticatePortalUser(
  identifier: string,
  password: string
): Promise<{ user: PortalUser; token: string } | null> {
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const user = userStore.find(
    (candidate) =>
      candidate.email.toLowerCase() === normalizedIdentifier ||
      candidate.phone === normalizedIdentifier
  );

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null;
  }

  return { user: toPublicUser(user), token: createToken(user.id) };
}

export async function registerPortalUser(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  institutionPreference?: string;
  coursePreference?: string;
  wbsccInterest?: boolean;
}): Promise<{ user: PortalUser; token: string }> {
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();

  if (userStore.some((user) => user.email.toLowerCase() === email || user.phone === phone)) {
    throw new Error("An account with this email address or phone number already exists.");
  }

  const studentNumber = Math.floor(1000 + Math.random() * 9000);
  const user: StoredPortalUser = {
    id: `user-${randomUUID()}`,
    studentId: `AIAS-2026-STU-${studentNumber}`,
    fullName: input.fullName.trim(),
    email,
    phone,
    passwordHash: await bcrypt.hash(input.password, 10),
    role: "STUDENT",
    institutionPreference: input.institutionPreference || "Asansol Institute of Allied Sciences (AIAS)",
    coursePreference: input.coursePreference || "Diploma in Medical Laboratory Technology (DMLT)",
    wbsccInterest: input.wbsccInterest ?? true,
    applicationStatus: "REGISTERED",
    createdAt: new Date().toISOString(),
  };

  userStore.push(user);
  return { user: toPublicUser(user), token: createToken(user.id) };
}
