"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnquiryNumber = generateEnquiryNumber;
exports.formatPhoneNumber = formatPhoneNumber;
exports.slugify = slugify;
exports.formatDate = formatDate;
/**
 * Generates a human-friendly unique enquiry reference number
 * Example: "AIAS-2026-8492"
 */
function generateEnquiryNumber(prefix = "AIAS") {
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${randomSuffix}`;
}
/**
 * Format Indian phone number into readable format (e.g. 1800 897 334 or +91 98320 00000)
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
}
/**
 * Slugs a string for URL usage
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "-and-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}
/**
 * Format date for academic notices and timestamps
 */
function formatDate(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(d);
}
