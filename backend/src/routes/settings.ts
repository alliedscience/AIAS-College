import { IncomingMessage, ServerResponse } from "node:http";
import { SettingsRepository } from "../services/settingsStore";

export function handleSettingsGet(req: IncomingMessage, res: ServerResponse) {
  const settings = SettingsRepository.getSettings();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      settings,
    })
  );
}

export function handleSettingsPost(
  req: IncomingMessage,
  res: ServerResponse,
  body: any
) {
  try {
    const updated = SettingsRepository.updateSettings(body || {});
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        message: "Website institutional settings updated successfully.",
        settings: updated,
      })
    );
  } catch (error: any) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        message: error?.message || "Failed to update settings.",
      })
    );
  }
}
