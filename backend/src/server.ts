import http, { IncomingMessage, ServerResponse } from "node:http";
import { handleHealth } from "./routes/health";
import {
  handleAuthLogin,
  handleAuthRegister,
  handleAuthLogout,
} from "./routes/auth";
import { handleInstitutions } from "./routes/institutions";
import { handleCourses } from "./routes/courses";
import { handleNoticesGet, handleNoticesPost } from "./routes/notices";
import {
  handleEnquiriesGet,
  handleEnquiriesPost,
  handleEnquiriesPatch,
} from "./routes/enquiries";
import {
  handleSettingsGet,
  handleSettingsPost,
} from "./routes/settings";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

function parseJsonBody(req: IncomingMessage): Promise<any> {
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
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        resolve({});
      }
    });
    req.on("error", (err) => reject(err));
  });
}

function setCorsHeaders(req: IncomingMessage, res: ServerResponse) {
  const origin = req.headers.origin || "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

const server = http.createServer(async (req, res) => {
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
      return handleHealth(req, res);
    }

    // 2. Authentication
    if (pathname === "/api/auth/register" && method === "POST") {
      const body = await parseJsonBody(req);
      return await handleAuthRegister(req, res, body);
    }

    if (pathname === "/api/auth/login" && method === "POST") {
      const body = await parseJsonBody(req);
      return await handleAuthLogin(req, res, body);
    }

    if (pathname === "/api/auth/logout" && method === "POST") {
      return handleAuthLogout(req, res);
    }

    // 2b. Website Settings & Data Management
    if (pathname === "/api/settings") {
      if (method === "GET") {
        return handleSettingsGet(req, res);
      }
      if (method === "POST" || method === "PUT") {
        const body = await parseJsonBody(req);
        return handleSettingsPost(req, res, body);
      }
    }

    // 3. Institutions
    if (pathname === "/api/institutions" && method === "GET") {
      return handleInstitutions(req, res);
    }

    // 4. Courses
    if (pathname === "/api/courses" && method === "GET") {
      return handleCourses(req, res);
    }

    // 5. Notices
    if (pathname === "/api/notices") {
      if (method === "GET") {
        return handleNoticesGet(req, res, url);
      }
      if (method === "POST") {
        const body = await parseJsonBody(req);
        return handleNoticesPost(req, res, body);
      }
    }

    // 6. Enquiries
    if (pathname === "/api/enquiries") {
      if (method === "GET") {
        return await handleEnquiriesGet(req, res, url);
      }
      if (method === "POST") {
        const body = await parseJsonBody(req);
        return await handleEnquiriesPost(req, res, body);
      }
    }

    // 7. Enquiry update by ID: PATCH /api/enquiries/:id
    const enquiryMatch = pathname.match(/^\/api\/enquiries\/([^/]+)$/);
    if (enquiryMatch && method === "PATCH") {
      const id = enquiryMatch[1];
      const body = await parseJsonBody(req);
      return await handleEnquiriesPatch(req, res, id, body);
    }

    // Not Found
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: `Endpoint ${method} ${pathname} not found on AIAS Backend Server.`,
      })
    );
  } catch (error: any) {
    console.error("Unhandled Backend Exception:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: "Internal Server Error",
        error: error?.message,
      })
    );
  }
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    const nextPort = PORT + 1;
    console.warn(`[BACKEND] Port ${PORT} in use, attempting port ${nextPort}...`);
    server.listen(nextPort, () => {
      console.log("=================================================");
      console.log("🚀 AIAS Education Portal Dedicated Backend Engine");
      console.log(`📡 Listening on: http://localhost:${nextPort}`);
      console.log("=================================================");
    });
  } else {
    console.error("[BACKEND] Server error:", err);
  }
});

server.listen(PORT, () => {
  console.log("=================================================");
  console.log("🚀 AIAS Education Portal Dedicated Backend Engine");
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log("=================================================");
});
