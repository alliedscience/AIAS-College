import { IncomingMessage, ServerResponse } from "node:http";
import { NOTICES_DATA } from "../services/portalData";

let memoryNotices = [...NOTICES_DATA];

export function handleNoticesGet(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  const institution = url.searchParams.get("institution");
  let notices = [...memoryNotices];
  if (institution && institution !== "ALL") {
    notices = notices.filter(
      (n) => n.institutionSlug === institution || n.institutionSlug === "all"
    );
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      count: notices.length,
      notices,
    })
  );
}

export function handleNoticesPost(
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) {
  const { title, category, institutionSlug, summary, content, priority } =
    body || {};

  if (!title || !category || !content) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ success: false, message: "Missing required fields" })
    );
    return;
  }

  const newNotice = {
    id: `not-${Date.now()}`,
    title,
    category,
    institutionSlug: institutionSlug || "all",
    date: new Date().toISOString().split("T")[0],
    priority: priority || "MEDIUM",
    summary: summary || title,
    content,
  };

  memoryNotices.unshift(newNotice);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      message: "Notice published successfully",
      notice: newNotice,
    })
  );
}
