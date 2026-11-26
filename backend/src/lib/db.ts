import "dotenv/config";
import mongoose from "mongoose";

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/aias_db";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

let isConnecting = false;

/**
 * Connects to MongoDB via Mongoose.
 * Reuses the existing connection across server requests.
 * If connection fails, falls back gracefully so development continues with in-memory store.
 */
export async function connectDatabase(): Promise<typeof mongoose | null> {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  if (isConnecting && global.mongooseConnection) {
    return await global.mongooseConnection;
  }

  try {
    isConnecting = true;
    global.mongooseConnection = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
    });

    const conn = await global.mongooseConnection;
    isConnecting = false;
    console.log(`[DATABASE] MongoDB successfully connected to: ${mongoUri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")}`);
    return conn;
  } catch (error) {
    isConnecting = false;
    global.mongooseConnection = undefined;
    // Log helpful diagnostic without crashing the HTTP server
    console.warn("[DATABASE] MongoDB connection not available; using resilient in-memory repository fallback.");
    return null;
  }
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

export default mongoose;
