"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = connectDatabase;
exports.isDatabaseConnected = isDatabaseConnected;
exports.isDatabaseConfigured = isDatabaseConfigured;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/aias_db";
let isConnecting = false;
/**
 * Connects to MongoDB via Mongoose.
 * Reuses the existing connection across server requests.
 * If connection fails, falls back gracefully so development continues with in-memory store.
 */
async function connectDatabase() {
    if (mongoose_1.default.connection.readyState === 1) {
        return mongoose_1.default;
    }
    if (isConnecting && global.mongooseConnection) {
        return await global.mongooseConnection;
    }
    try {
        isConnecting = true;
        global.mongooseConnection = mongoose_1.default.connect(mongoUri, {
            serverSelectionTimeoutMS: 4000,
            connectTimeoutMS: 5000,
        });
        const conn = await global.mongooseConnection;
        isConnecting = false;
        console.log(`[DATABASE] MongoDB successfully connected to: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")}`);
        return conn;
    }
    catch (error) {
        isConnecting = false;
        global.mongooseConnection = undefined;
        // Log helpful diagnostic without crashing the HTTP server
        console.warn("[DATABASE] MongoDB connection not available; using resilient in-memory repository fallback.");
        return null;
    }
}
function isDatabaseConnected() {
    return mongoose_1.default.connection.readyState === 1;
}
function isDatabaseConfigured() {
    return Boolean(process.env.MONGODB_URI);
}
exports.default = mongoose_1.default;
