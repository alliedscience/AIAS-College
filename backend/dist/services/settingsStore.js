"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsRepository = void 0;
const db_1 = require("../lib/db");
const models_1 = require("../models");
let liveSettings = {
    portalName: "AIAS Education Portal",
    admissionsSession: "2026-2027",
    admissionsActive: true,
    wbsccActive: true,
    wbsccLimit: "₹10 Lakhs",
    wbsccInterestRate: "4% Simple Interest",
    centralAddress: "Burnpur Riverside Road, Asansol, West Bengal, PIN - 713325",
    centralTollFree: "1800 897 334",
    supportEmail: "admissions@aias.edu.in",
    collaborationCenter: "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)",
    collaborationUniversity: "Diamond Harbour Women's University (ডায়মন্ড হারবার মহিলা বিশ্ববিদ্যালয়)",
    helplineHours: "Monday to Saturday (9:30 AM – 5:30 PM)",
    institutions: [
        {
            slug: "aias",
            name: "Asansol Institute of Allied Sciences (AIAS)",
            phone: "1800 897 334",
            email: "info@aias.edu.in",
            address: "Burnpur Riverside Road, Asansol, WB",
            affiliations: [
                "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)",
                "Diamond Harbour Women's University",
            ],
        },
        {
            slug: "bijoy-pal-memorial",
            name: "Bijoy Pal Memorial B.Ed College",
            phone: "1800 891 1734",
            email: "contact@bijoypalbed.org",
            address: "Burnpur Riverside Road, Asansol, WB",
            affiliations: [
                "National Council for Teacher Education (N.C.T.E.)",
                "Baba Saheb Ambedkar Education University (B.S.A.E.U. / erstwhile WBUTTEPA)",
            ],
        },
        {
            slug: "pramoth-nath-das",
            name: "Pramoth Nath Das Academy of Nursing",
            phone: "1800 890 7334",
            email: "nursing@pndasacademy.org",
            address: "Burnpur Riverside Road, Asansol, WB",
            affiliations: [
                "Indian Nursing Council (INC)",
                "West Bengal Nursing Council (WBNC)",
                "West Bengal University of Health Sciences (WBUHS)",
            ],
        },
        {
            slug: "pn-das-academy",
            name: "P.N. Das Academy (D.El.Ed College)",
            phone: "1800 891 1734",
            email: "deled@pndasacademy.org",
            address: "Burnpur Riverside Road, Asansol, WB",
            affiliations: [
                "National Council for Teacher Education (N.C.T.E.)",
                "West Bengal Board of Primary Education (WBBPE)",
            ],
        },
    ],
};
class SettingsRepository {
    static async getSettingsAsync() {
        try {
            if (await (0, db_1.connectDatabase)()) {
                const doc = await models_1.SiteSettings.findOne({ key: "general_settings" }).lean();
                if (doc && doc.value) {
                    return typeof doc.value === "string" ? JSON.parse(doc.value) : doc.value;
                }
            }
        }
        catch {
            // Return memory fallback
        }
        return { ...liveSettings };
    }
    static getSettings() {
        return { ...liveSettings };
    }
    static async updateSettingsAsync(partial) {
        liveSettings = {
            ...liveSettings,
            ...partial,
            institutions: partial.institutions || liveSettings.institutions,
        };
        try {
            if (await (0, db_1.connectDatabase)()) {
                await models_1.SiteSettings.findOneAndUpdate({ key: "general_settings" }, { key: "general_settings", value: liveSettings, description: "Core portal settings" }, { upsert: true, new: true });
            }
        }
        catch {
            // Memory update already applied
        }
        return { ...liveSettings };
    }
    static updateSettings(partial) {
        liveSettings = {
            ...liveSettings,
            ...partial,
            institutions: partial.institutions || liveSettings.institutions,
        };
        // Trigger async persistence in background
        this.updateSettingsAsync(partial).catch(() => { });
        return { ...liveSettings };
    }
}
exports.SettingsRepository = SettingsRepository;
