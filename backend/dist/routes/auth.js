"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAuth = void 0;
exports.handleAuthRegister = handleAuthRegister;
exports.handleAuthLogin = handleAuthLogin;
exports.handleAuthLogout = handleAuthLogout;
const userStore_1 = require("../services/userStore");
async function handleAuthRegister(req, res, body) {
    try {
        const { fullName, email, phone, password, institutionPreference, coursePreference, wbsccInterest } = body || {};
        if (!fullName || !email || !phone || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: false,
                message: "Please provide full name, email address, 10-digit mobile, and password.",
            }));
            return;
        }
        if (password.length < 6) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: false,
                message: "Password must be at least 6 characters long.",
            }));
            return;
        }
        const { user, token } = await userStore_1.UserRepository.register({
            fullName,
            email,
            phone,
            password,
            institutionPreference,
            coursePreference,
            wbsccInterest,
        });
        res.writeHead(201, {
            "Content-Type": "application/json",
            "Set-Cookie": `aias_user_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
        });
        res.end(JSON.stringify({
            success: true,
            message: "Account registered successfully! Welcome to the AIAS Education Portal.",
            user,
            token,
        }));
    }
    catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: error?.message || "Failed to register account.",
        }));
    }
}
async function handleAuthLogin(req, res, body) {
    try {
        const { email, password } = body || {};
        if (!email || !password) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                success: false,
                message: "Please enter your email or phone number and password.",
            }));
            return;
        }
        // Authenticate through repository
        const result = await userStore_1.UserRepository.authenticate(email, password);
        if (result) {
            const cookieName = result.user.role === "ADMIN" ? "aias_admin_session" : "aias_user_session";
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Set-Cookie": `${cookieName}=${result.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`,
            });
            res.end(JSON.stringify({
                success: true,
                message: `Welcome back, ${result.user.fullName}!`,
                user: result.user,
                token: result.token,
                role: result.user.role,
            }));
            return;
        }
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Invalid credentials. Please verify your email/phone and password.",
        }));
    }
    catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            success: false,
            message: "Server authentication error. Please try again.",
        }));
    }
}
function handleAuthLogout(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Set-Cookie": [
            "aias_user_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
            "aias_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
        ],
    });
    res.end(JSON.stringify({
        success: true,
        message: "Logged out successfully.",
    }));
}
// Backward compatibility alias for handleAuth
exports.handleAuth = handleAuthLogin;
