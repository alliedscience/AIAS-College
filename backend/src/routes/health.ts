import { IncomingMessage, ServerResponse } from "node:http";
import { INSTITUTIONS_DATA, COURSES_DATA } from "../services/portalData";
import { isDatabaseConnected, isDatabaseConfigured } from "../lib/db";

export function handleHealth(req: IncomingMessage, res: ServerResponse) {
  const connected = isDatabaseConnected();
  const configured = isDatabaseConfigured();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
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
      institutionsCount: INSTITUTIONS_DATA.length,
      coursesCount: COURSES_DATA.length,
    })
  );
}
