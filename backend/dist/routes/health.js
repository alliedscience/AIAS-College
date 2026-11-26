"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHealth = handleHealth;
const portalData_1 = require("../services/portalData");
const db_1 = require("../lib/db");
function handleHealth(req, res) {
    const connected = (0, db_1.isDatabaseConnected)();
    const configured = (0, db_1.isDatabaseConfigured)();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        status: "ok",
        timestamp: new Date().toISOString(),
        service: "AIAS Education Portal Dedicated Backend Engine",
        environment: process.env.NODE_ENV || "development",
        database: {
            type: "MongoDB",
            connected,
            status: connected ? "CONNECTED" : configured ? "CONNECTING_OR_RETRYING" : "FALLBACK_MODE",
            configured,
        },
        institutionsCount: portalData_1.INSTITUTIONS_DATA.length,
        coursesCount: portalData_1.COURSES_DATA.length,
    }));
}
