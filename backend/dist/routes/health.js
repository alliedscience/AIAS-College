"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHealth = handleHealth;
const portalData_1 = require("../services/portalData");
function handleHealth(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "AIAS Education Portal Backend API Engine",
        environment: process.env.NODE_ENV || "development",
        institutionsCount: portalData_1.INSTITUTIONS_DATA.length,
        coursesCount: portalData_1.COURSES_DATA.length,
    }));
}
