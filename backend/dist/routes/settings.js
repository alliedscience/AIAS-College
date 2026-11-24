"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSettingsGet = handleSettingsGet;
exports.handleSettingsPost = handleSettingsPost;
const settingsStore_1 = require("../services/settingsStore");
function handleSettingsGet(req, res) {
    const settings = settingsStore_1.SettingsRepository.getSettings();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        success: true,
        settings,
    }));
}
function handleSettingsPost(req, res, body) {
    try {
        const updated = settingsStore_1.SettingsRepository.updateSettings(body || {});
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: true,
            message: "Website institutional settings updated successfully.",
            settings: updated,
        }));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error?.message || "Failed to update settings.",
        }));
    }
}
