"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCourses = handleCourses;
const portalData_1 = require("../services/portalData");
function handleCourses(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        success: true,
        count: portalData_1.COURSES_DATA.length,
        courses: portalData_1.COURSES_DATA,
    }));
}
