"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LogIn,
  UserPlus,
  Lock,
  Mail,
  Phone,
  User,
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
} from "lucide-react";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

type AuthApiResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  role?: "ADMIN" | "STUDENT";
  user?: {
    fullName?: string;
    [key: string]: unknown;
  };
};

/**
 * Next.js returns plain text when its API proxy cannot reach the backend.
 * Read the response first so that situation produces a useful message instead
 * of exposing a JSON parsing error to candidates.
 */
async function readAuthResponse(response: Response): Promise<AuthApiResponse> {
  const responseText = await response.text();

  try {
    return JSON.parse(responseText) as AuthApiResponse;
  } catch {
    throw new Error(
      response.ok
        ? "The sign-in service returned an invalid response. Please try again."
        : "The sign-in service is temporarily unavailable. Please try again shortly."
    );
  }
}

export default function StudentLoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registration Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regInstitution, setRegInstitution] = useState("aias");
  const [regCourse, setRegCourse] = useState("medical-laboratory-technology");
  const [regWbscc, setRegWbscc] = useState(true);

  const filteredCourses = COURSES_DATA.filter(
    (c) => c.institutionSlug === regInstitution
  );

  const handleInstitutionChange = (slug: string) => {
    setRegInstitution(slug);
    const instCourses = COURSES_DATA.filter((c) => c.institutionSlug === slug);
    if (instCourses.length > 0) {
      setRegCourse(instCourses[0].slug);
    }
  };

  const handleFillDemoStudent = () => {
    setLoginIdentifier("student@aias.edu.in");
    setLoginPassword("student123");
    setErrorMsg("");
  };

  const handleFillDemoAdmin = () => {
    setLoginIdentifier("admin@aias.edu.in");
    setLoginPassword("ChangeMe_AIAS2026!Secure");
    setErrorMsg("");
  };

  // 1. Submit Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginIdentifier,
          password: loginPassword,
        }),
      });

      const data = await readAuthResponse(res);

      if (!res.ok || !data.success || !data.user || !data.token) {
        throw new Error(data.message || "Invalid credentials.");
      }

      // Save user session in localStorage
      localStorage.setItem("aias_user", JSON.stringify(data.user));
      localStorage.setItem("aias_token", data.token);

      setSuccessMsg(`Welcome, ${data.user.fullName}! Redirecting to your portal...`);

      // If user is admin, redirect to admin dashboard; else redirect to student portal
      setTimeout(() => {
        if (data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/portal");
        }
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(regPhone)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);

    try {
      const instObj = INSTITUTIONS_DATA.find((i) => i.slug === regInstitution);
      const courseObj = COURSES_DATA.find((c) => c.slug === regCourse);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: regName,
          email: regEmail,
          phone: regPhone,
          password: regPassword,
          institutionPreference: instObj?.name || "AIAS",
          coursePreference: courseObj?.name || "Diploma in Medical Laboratory Technology (DMLT)",
          wbsccInterest: regWbscc,
        }),
      });

      const data = await readAuthResponse(res);

      if (!res.ok || !data.success || !data.user || !data.token) {
        throw new Error(data.message || "Registration failed.");
      }

      localStorage.setItem("aias_user", JSON.stringify(data.user));
      localStorage.setItem("aias_token", data.token);

      setSuccessMsg("Account created successfully! Taking you to your Student Portal...");
      setTimeout(() => {
        router.push("/portal");
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Registration error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-ivory py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-6">
        
        {/* Institutional Crest & Breadcrumb */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-navy/5 text-navy text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-navy/10">
            <ShieldCheck className="w-3.5 h-3.5 text-forest" />
            <span>Official Candidate &amp; Student Portal</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-navy">
            Asansol Institute of Allied Sciences
          </h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Log in to manage your admission docket, track counseling status, and access WBSCC student loan facilitation across all 4 partner institutions.
          </p>
        </div>

        {/* Tab Controls (Login vs Register) */}
        <div className="bg-white rounded-xs border-2 border-navy shadow-card overflow-hidden">
          <div className="grid grid-cols-2 border-b-2 border-navy">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-3.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                activeTab === "login"
                  ? "bg-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`py-3.5 text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition ${
                activeTab === "register"
                  ? "bg-navy text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Feedback Notifications */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-xs flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* TAB 1: LOGIN FORM */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* One-Click Demo Helper */}
                <div className="bg-amber-50/60 border border-amber-200/80 p-3 rounded-xs flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-amber-900 leading-tight">
                    <span className="font-bold block">Testing Credentials:</span>
                    <span className="text-[11px] text-amber-700">Quickly test student or staff access.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFillDemoStudent}
                      className="btn btn-gold btn-sm h-8 px-2.5 text-[11px] flex-shrink-0"
                      title="Fill demo student credentials"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Student Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFillDemoAdmin}
                      className="btn btn-primary btn-sm h-8 px-2.5 text-[11px] flex-shrink-0"
                      title="Fill demo admin credentials"
                    >
                      <ShieldCheck className="w-3 h-3 text-gold" />
                      <span>Admin Demo</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                    Registered Email or Phone Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. student@aias.edu.in or 9832000000"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Password <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password recovery: Please contact the central admissions helpline at 1800 897 334 to reset your student portal PIN.")}
                      className="text-[11px] text-slate-500 hover:text-navy underline"
                    >
                      Forgot PIN?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your secret password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full text-xs pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono transition"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-navy"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full text-xs py-3.5 justify-center shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" />
                        <span>Sign In to Student Account</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">
                    Don&apos;t have an admission account yet?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("register")}
                      className="text-navy font-bold hover:underline"
                    >
                      Create one now
                    </button>
                  </span>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTRATION FORM */}
            {activeTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                    Candidate Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sourav Mukherjee"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      10-Digit Mobile <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9832000000"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono transition"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Target Institution & Course */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      Target Institution <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={regInstitution}
                      onChange={(e) => handleInstitutionChange(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold transition"
                    >
                      {INSTITUTIONS_DATA.map((inst) => (
                        <option key={inst.slug} value={inst.slug}>
                          {inst.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      Preferred Programme / Diploma <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={regCourse}
                      onChange={(e) => setRegCourse(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold transition"
                    >
                      {filteredCourses.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      Set Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
                      Confirm Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono transition"
                    />
                  </div>
                </div>

                <div className="bg-ivory border border-gold/30 p-3 rounded-xs">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={regWbscc}
                      onChange={(e) => setRegWbscc(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded-xs text-navy border-slate-400"
                    />
                    <span className="text-xs text-navy font-semibold leading-tight">
                      I request institutional facilitation for the West Bengal Student Credit Card (WBSCC) scheme up to ₹10 Lakhs.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold w-full text-xs py-3.5 justify-center shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Register Account &amp; Access Portal</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-1">
                  <span className="text-xs text-slate-500">
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="text-navy font-bold hover:underline"
                    >
                      Sign in here
                    </button>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Dedicated Admin Portal Navigation Callout */}
        <div className="text-center bg-white border border-slate-200 p-4 rounded-xs text-xs text-slate-600 space-y-1">
          <div className="font-bold text-navy">
            Institutional Faculty or Staff Administrator?
          </div>
          <div>
            Manage website content, inquiries, courses, and circulars in the{" "}
            <Link
              href="/admin/login"
              className="text-navy font-bold underline hover:text-gold-dark"
            >
              Central Administration Console →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
