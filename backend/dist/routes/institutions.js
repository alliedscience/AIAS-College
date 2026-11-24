"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInstitutions = handleInstitutions;
const portalData_1 = require("../services/portalData");
function handleInstitutions(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        success: true,
        count: portalData_1.INSTITUTIONS_DATA.length,
        institutions: portalData_1.INSTITUTIONS_DATA,
    }));
}
