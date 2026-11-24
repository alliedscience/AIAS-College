import { IncomingMessage, ServerResponse } from "node:http";
import { EnquiryRepository } from "../services/enquiryStore";
import { INSTITUTIONS_DATA, COURSES_DATA } from "../services/portalData";
import { enquirySchema } from "../lib/validations/enquiry";

export async function handleEnquiriesGet(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  try {
    const institution = url.searchParams.get("institution") || undefined;
    const course = url.searchParams.get("course") || undefined;
    const status = url.searchParams.get("status") || undefined;
    const search = url.searchParams.get("search") || undefined;

    const enquiries = await EnquiryRepository.list({
      institution,
      course,
      status,
      search,
    });

    const stats = EnquiryRepository.getStats();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        count: enquiries.length,
        stats,
        enquiries,
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Failed to fetch enquiries.",
      })
    );
  }
}

export async function handleEnquiriesPost(
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) {
  try {
    const validation = enquirySchema.safeParse(body);
    if (!validation.success) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          errors: validation.error.flatten().fieldErrors,
          message: "Please verify all required fields.",
        })
      );
      return;
    }

    const {
      studentName,
      email,
      phone,
      institutionId,
      courseId,
      highestQualification,
      city,
      state,
      message,
      wbsccInterest,
    } = validation.data;

    const institution =
      INSTITUTIONS_DATA.find((i) => i.slug === institutionId) ||
      INSTITUTIONS_DATA[0];

    const course =
      COURSES_DATA.find((c) => c.slug === courseId) || COURSES_DATA[0];

    const enquiry = await EnquiryRepository.create({
      studentName,
      email: email || undefined,
      phone,
      institutionSlug: institution.slug,
      institutionName: institution.name,
      courseSlug: course.slug,
      courseName: course.name,
      highestQualification: highestQualification || "10+2 / Equivalent",
      city: city || "Asansol",
      state: state || "West Bengal",
      message: message || undefined,
      wbsccInterest,
    });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        enquiryNumber: enquiry.enquiryNumber,
        message: "Admission enquiry registered successfully.",
        enquiry,
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message:
          "Failed to process enquiry. Please call our toll-free admissions desk directly.",
      })
    );
  }
}

export async function handleEnquiriesPatch(
  req: IncomingMessage,
  res: ServerResponse,
  id: string,
  body: any
) {
  try {
    const { status, notes } = body || {};

    const updated = await EnquiryRepository.updateStatus(id, status, notes);
    if (!updated) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ success: false, message: "Enquiry not found" })
      );
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Enquiry status updated successfully",
        enquiry: updated,
      })
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Failed to update enquiry",
      })
    );
  }
}
