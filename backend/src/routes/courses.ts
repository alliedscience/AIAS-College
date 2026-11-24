import { IncomingMessage, ServerResponse } from "node:http";
import { COURSES_DATA } from "../services/portalData";

export function handleCourses(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      count: COURSES_DATA.length,
      courses: COURSES_DATA,
    })
  );
}
