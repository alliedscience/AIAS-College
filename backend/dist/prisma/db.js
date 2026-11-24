"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const runtime_1 = __importDefault(require("@prisma/orm-postgres/runtime"));
const static_1 = require("@prisma/orm-postgres/static");
const contract_json_1 = __importDefault(require("./contract.json"));
exports.db = (0, runtime_1.default)({
    contract: (0, static_1.contractFromJson)(contract_json_1.default),
    url: process.env.DATABASE_URL,
});
