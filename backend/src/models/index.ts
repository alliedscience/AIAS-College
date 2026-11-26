import { Model, Schema, Types, model, models } from "mongoose";

const optionalString = { type: String, trim: true, default: null };

// 1. Institution Model
export interface IInstitution {
  name: string;
  shortName?: string | null;
  slug: string;
  code: string;
  description: string;
  shortDescription?: string | null;
  logo?: string | null;
  crest?: string | null;
  bannerImage?: string | null;
  address: string;
  phone: string;
  altPhone?: string | null;
  email: string;
  affiliation: string;
  recognitions?: string | null;
  establishedYear?: number;
  theme?: any;
  published: boolean;
  displayOrder: number;
}

const institutionSchema = new Schema<IInstitution>(
  {
    name: { type: String, required: true, trim: true },
    shortName: optionalString,
    slug: { type: String, required: true, unique: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    shortDescription: optionalString,
    logo: optionalString,
    crest: optionalString,
    bannerImage: optionalString,
    address: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: optionalString,
    email: { type: String, required: true },
    affiliation: { type: String, required: true },
    recognitions: optionalString,
    establishedYear: Number,
    theme: Schema.Types.Mixed,
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

// 2. Course Model
export interface ICourse {
  institutionId: Types.ObjectId;
  name: string;
  shortName?: string | null;
  slug: string;
  code?: string | null;
  description: string;
  duration: string;
  durationYears: number;
  eligibility: string;
  curriculum?: any;
  careerProspects?: any;
  featuredImage?: string | null;
  isCreditCardEligible: boolean;
  hasPlacementAssistance: boolean;
  tuitionFeeNote?: string | null;
  displayOrder: number;
  published: boolean;
}

const courseSchema = new Schema<ICourse>(
  {
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution", required: true },
    name: { type: String, required: true },
    shortName: optionalString,
    slug: { type: String, required: true },
    code: optionalString,
    description: { type: String, required: true },
    duration: { type: String, required: true },
    durationYears: { type: Number, required: true },
    eligibility: { type: String, required: true },
    curriculum: Schema.Types.Mixed,
    careerProspects: Schema.Types.Mixed,
    featuredImage: optionalString,
    isCreditCardEligible: { type: Boolean, default: true },
    hasPlacementAssistance: { type: Boolean, default: true },
    tuitionFeeNote: optionalString,
    displayOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);
courseSchema.index({ institutionId: 1, slug: 1 }, { unique: true });

// 3. Enquiry Activity Model
export interface IEnquiryActivity {
  enquiryId: Types.ObjectId;
  authorId?: Types.ObjectId | null;
  activityType: string;
  notes: string;
}

const enquiryActivitySchema = new Schema<IEnquiryActivity>(
  {
    enquiryId: { type: Schema.Types.ObjectId, ref: "Enquiry", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    activityType: { type: String, required: true },
    notes: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

// 4. Admission Enquiry Model
export interface IEnquiry {
  enquiryNumber: string;
  studentName: string;
  phone: string;
  email?: string | null;
  institutionId: Types.ObjectId;
  courseId: Types.ObjectId;
  highestQualification?: string | null;
  wbsccInterest: boolean;
  message?: string | null;
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "DOCUMENTS_PENDING" | "ADMITTED" | "CLOSED" | "REJECTED";
  assignedToId?: Types.ObjectId | null;
  source: string;
  ipAddress?: string | null;
  city?: string | null;
  state?: string | null;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    enquiryNumber: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    phone: { type: String, required: true },
    email: optionalString,
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    highestQualification: optionalString,
    wbsccInterest: { type: Boolean, default: false },
    message: optionalString,
    status: {
      type: String,
      enum: ["NEW", "IN_REVIEW", "CONTACTED", "DOCUMENTS_PENDING", "ADMITTED", "CLOSED", "REJECTED"],
      default: "NEW",
    },
    assignedToId: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    source: { type: String, default: "WEBSITE" },
    ipAddress: optionalString,
    city: optionalString,
    state: optionalString,
  },
  { timestamps: true, versionKey: false }
);

// 5. Admin User Model
export interface IAdminUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "SUPER_ADMIN" | "INSTITUTION_ADMIN" | "ADMISSION_MANAGER" | "CONTENT_EDITOR";
  institutionId?: Types.ObjectId | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
}

const adminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "INSTITUTION_ADMIN", "ADMISSION_MANAGER", "CONTENT_EDITOR"],
      default: "CONTENT_EDITOR",
    },
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution" },
    isActive: { type: Boolean, default: true },
    lastLoginAt: Date,
  },
  { timestamps: true, versionKey: false }
);

// 6. Student User Model
export interface IStudentUser {
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
}

const studentUserSchema = new Schema<IStudentUser>(
  {
    studentId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["STUDENT", "ADMIN"], default: "STUDENT" },
    institutionPreference: { type: String, required: true },
    coursePreference: { type: String, required: true },
    wbsccInterest: { type: Boolean, default: true },
    applicationStatus: {
      type: String,
      enum: ["REGISTERED", "DOCS_PENDING", "IN_REVIEW", "ADMITTED"],
      default: "REGISTERED",
    },
  },
  { timestamps: true, versionKey: false }
);

// 7. Notice Model
export interface INotice {
  institutionId?: Types.ObjectId | null;
  title: string;
  slug: string;
  category: string;
  content: string;
  featuredImage?: string | null;
  attachmentUrl?: string | null;
  isUrgent: boolean;
  published: boolean;
  publishedAt: Date;
}

const noticeSchema = new Schema<INotice>(
  {
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution" },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "GENERAL" },
    content: { type: String, required: true },
    featuredImage: optionalString,
    attachmentUrl: optionalString,
    isUrgent: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

// 8. Media Model
export interface IMedia {
  institutionId?: Types.ObjectId | null;
  url: string;
  altText: string;
  caption?: string | null;
  category: "CAMPUS" | "LABORATORY" | "CLASSROOM" | "EVENT" | "LOGO" | "FACULTY" | "DOCUMENT";
  fileType?: string | null;
  fileSize?: number | null;
}

const mediaSchema = new Schema<IMedia>(
  {
    institutionId: { type: Schema.Types.ObjectId, ref: "Institution" },
    url: { type: String, required: true },
    altText: { type: String, required: true },
    caption: optionalString,
    category: {
      type: String,
      enum: ["CAMPUS", "LABORATORY", "CLASSROOM", "EVENT", "LOGO", "FACULTY", "DOCUMENT"],
      default: "CAMPUS",
    },
    fileType: optionalString,
    fileSize: Number,
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

// 9. Site Settings Model
export interface ISiteSettings {
  key: string;
  value: any;
  description?: string | null;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: optionalString,
  },
  { timestamps: true, versionKey: false }
);

// 10. Audit Log Model
export interface IAuditLog {
  userId?: Types.ObjectId | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  details?: any;
  ipAddress?: string | null;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: String,
    details: Schema.Types.Mixed,
    ipAddress: String,
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

function getModel<T>(name: string, schema: Schema<T>): Model<T> {
  return (models[name] as Model<T>) || model<T>(name, schema);
}

export const Institution = getModel<IInstitution>("Institution", institutionSchema);
export const Course = getModel<ICourse>("Course", courseSchema);
export const Enquiry = getModel<IEnquiry>("Enquiry", enquirySchema);
export const EnquiryActivity = getModel<IEnquiryActivity>("EnquiryActivity", enquiryActivitySchema);
export const AdminUser = getModel<IAdminUser>("AdminUser", adminUserSchema);
export const StudentUser = getModel<IStudentUser>("StudentUser", studentUserSchema);
export const Notice = getModel<INotice>("Notice", noticeSchema);
export const Media = getModel<IMedia>("Media", mediaSchema);
export const SiteSettings = getModel<ISiteSettings>("SiteSettings", siteSettingsSchema);
export const AuditLog = getModel<IAuditLog>("AuditLog", auditLogSchema);

export { Types };
