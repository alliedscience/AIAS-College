import { IncomingMessage, ServerResponse } from "node:http";
import { INSTITUTIONS_DATA, COURSES_DATA } from "../services/portalData";

export function handleHealth(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "AIAS Education Portal Backend API Engine",
      environment: process.env.NODE_ENV || "development",
      institutionsCount: INSTITUTIONS_DATA.length,
      coursesCount: COURSES_DATA.length,
    })
  );
}
