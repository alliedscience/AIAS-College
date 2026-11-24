"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEnquiriesGet = handleEnquiriesGet;
exports.handleEnquiriesPost = handleEnquiriesPost;
exports.handleEnquiriesPatch = handleEnquiriesPatch;
const enquiryStore_1 = require("../services/enquiryStore");
const portalData_1 = require("../services/portalData");
const enquiry_1 = require("../lib/validations/enquiry");
async function handleEnquiriesGet(req, res, url) {
    try {
        const institution = url.searchParams.get("institution") || undefined;
        const course = url.searchParams.get("course") || undefined;
        const status = url.searchParams.get("status") || undefined;
        const search = url.searchParams.get("search") || undefined;
        const enquiries = await enquiryStore_1.EnquiryRepository.list({
            institution,
            course,
            status,
            search,
        });
        const stats = enquiryStore_1.EnquiryRepository.getStats();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            count: enquiries.length,
            stats,
            enquiries,
        }));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Failed to fetch enquiries.",
        }));
    }
}
async function handleEnquiriesPost(req, res, body) {
    try {
        const validation = enquiry_1.enquirySchema.safeParse(body);
        if (!validation.success) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: false,
                errors: validation.error.flatten().fieldErrors,
                message: "Please verify all required fields.",
            }));
            return;
        }
        const { studentName, email, phone, institutionId, courseId, highestQualification, city, state, message, wbsccInterest, } = validation.data;
        const institution = portalData_1.INSTITUTIONS_DATA.find((i) => i.slug === institutionId) ||
            portalData_1.INSTITUTIONS_DATA[0];
        const course = portalData_1.COURSES_DATA.find((c) => c.slug === courseId) || portalData_1.COURSES_DATA[0];
        const enquiry = await enquiryStore_1.EnquiryRepository.create({
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
        res.end(JSON.stringify({
            success: true,
            enquiryNumber: enquiry.enquiryNumber,
            message: "Admission enquiry registered successfully.",
            enquiry,
        }));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Failed to process enquiry. Please call our toll-free admissions desk directly.",
        }));
    }
}
async function handleEnquiriesPatch(req, res, id, body) {
    try {
        const { status, notes } = body || {};
        const updated = await enquiryStore_1.EnquiryRepository.updateStatus(id, status, notes);
        if (!updated) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, message: "Enquiry not found" }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            message: "Enquiry status updated successfully",
            enquiry: updated,
        }));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Failed to update enquiry",
        }));
    }
}
