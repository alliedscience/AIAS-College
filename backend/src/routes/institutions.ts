import { IncomingMessage, ServerResponse } from "node:http";
import { INSTITUTIONS_DATA } from "../services/portalData";

export function handleInstitutions(req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      count: INSTITUTIONS_DATA.length,
      institutions: INSTITUTIONS_DATA,
    })
  );
}
