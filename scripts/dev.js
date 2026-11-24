import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

console.log("=================================================");
console.log("🚀 Starting AIAS Portal (Frontend + Backend)...");
console.log("=================================================");

// 1. Start Backend Server (Port 5000)
const backend = spawn(npmCmd, ["run", "dev", "--workspace=backend"], {
  cwd: projectRoot,
  stdio: "pipe",
  shell: true,
});

backend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[36m[BACKEND]\x1b[0m ${data}`);
});

backend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[31m[BACKEND ERROR]\x1b[0m ${data}`);
});

// 2. Start Frontend Next.js Server (Port 3000)
const frontend = spawn(npmCmd, ["run", "dev", "--workspace=frontend"], {
  cwd: projectRoot,
  stdio: "pipe",
  shell: true,
});

frontend.stdout.on("data", (data) => {
  process.stdout.write(`\x1b[32m[FRONTEND]\x1b[0m ${data}`);
});

frontend.stderr.on("data", (data) => {
  process.stderr.write(`\x1b[33m[FRONTEND LOG]\x1b[0m ${data}`);
});

function cleanup() {
  console.log("\nShutting down AIAS frontend and backend processes...");
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
