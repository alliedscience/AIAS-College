"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const db_1 = require("./lib/db");
const health_1 = require("./routes/health");
const auth_1 = require("./routes/auth");
const institutions_1 = require("./routes/institutions");
const courses_1 = require("./routes/courses");
const notices_1 = require("./routes/notices");
const enquiries_1 = require("./routes/enquiries");
const settings_1 = require("./routes/settings");
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
            // Protect against overly large payloads (max 2MB)
            if (data.length > 2 * 1024 * 1024) {
                req.destroy();
                reject(new Error("Payload Too Large"));
            }
        });
        req.on("end", () => {
            if (!data)
                return resolve({});
            try {
                resolve(JSON.parse(data));
            }
            catch (err) {
                resolve({});
            }
        });
        req.on("error", (err) => reject(err));
    });
}
function setCorsHeaders(req, res) {
    const origin = req.headers.origin || "*";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");
}
const server = node_http_1.default.createServer(async (req, res) => {
    setCorsHeaders(req, res);
    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }
    const host = req.headers.host || `localhost:${PORT}`;
    const url = new URL(req.url || "/", `http://${host}`);
    const pathname = url.pathname;
    const method = req.method || "GET";
    console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);
    try {
        // 1. Health check
        if (pathname === "/api/health" && method === "GET") {
            return (0, health_1.handleHealth)(req, res);
        }
        // 2. Authentication
        if (pathname === "/api/auth/register" && method === "POST") {
            const body = await parseJsonBody(req);
            return await (0, auth_1.handleAuthRegister)(req, res, body);
        }
        if (pathname === "/api/auth/login" && method === "POST") {
            const body = await parseJsonBody(req);
            return await (0, auth_1.handleAuthLogin)(req, res, body);
        }
        if (pathname === "/api/auth/logout" && method === "POST") {
            return (0, auth_1.handleAuthLogout)(req, res);
        }
        // 2b. Website Settings & Data Management
        if (pathname === "/api/settings") {
            if (method === "GET") {
                return (0, settings_1.handleSettingsGet)(req, res);
            }
            if (method === "POST" || method === "PUT") {
                const body = await parseJsonBody(req);
                return (0, settings_1.handleSettingsPost)(req, res, body);
            }
        }
        // 3. Institutions
        if (pathname === "/api/institutions" && method === "GET") {
            return (0, institutions_1.handleInstitutions)(req, res);
        }
        // 4. Courses
        if (pathname === "/api/courses" && method === "GET") {
            return (0, courses_1.handleCourses)(req, res);
        }
        // 5. Notices
        if (pathname === "/api/notices") {
            if (method === "GET") {
                return (0, notices_1.handleNoticesGet)(req, res, url);
            }
            if (method === "POST") {
                const body = await parseJsonBody(req);
                return (0, notices_1.handleNoticesPost)(req, res, body);
            }
        }
        // 6. Enquiries
        if (pathname === "/api/enquiries") {
            if (method === "GET") {
                return await (0, enquiries_1.handleEnquiriesGet)(req, res, url);
            }
            if (method === "POST") {
                const body = await parseJsonBody(req);
                return await (0, enquiries_1.handleEnquiriesPost)(req, res, body);
            }
        }
        // 7. Enquiry update by ID: PATCH /api/enquiries/:id
        const enquiryMatch = pathname.match(/^\/api\/enquiries\/([^/]+)$/);
        if (enquiryMatch && method === "PATCH") {
            const id = enquiryMatch[1];
            const body = await parseJsonBody(req);
            return await (0, enquiries_1.handleEnquiriesPatch)(req, res, id, body);
        }
        // Not Found
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: `Endpoint ${method} ${pathname} not found on AIAS Backend Server.`,
        }));
    }
    catch (error) {
        console.error("Unhandled Backend Exception:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Internal Server Error",
            error: error?.message,
        }));
    }
});
server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        const nextPort = PORT + 1;
        console.warn(`[BACKEND] Port ${PORT} in use, attempting port ${nextPort}...`);
        server.listen(nextPort, () => {
            console.log("=================================================");
            console.log("🚀 AIAS Education Portal Dedicated Backend Engine");
            console.log(`📡 Listening on: http://localhost:${nextPort}`);
            console.log("=================================================");
        });
    }
    else {
        console.error("[BACKEND] Server error:", err);
    }
});
server.listen(PORT, () => {
    console.log("=================================================");
    console.log("🚀 AIAS Education Portal Dedicated Backend Engine");
    console.log(`📡 Listening on: http://localhost:${PORT}`);
    console.log("=================================================");
    // Eagerly initiate database connection on startup
    (0, db_1.connectDatabase)().catch((err) => {
        console.warn("[DATABASE] Initial connection notice:", err?.message);
    });
});
