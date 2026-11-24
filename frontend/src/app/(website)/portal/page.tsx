"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  GraduationCap,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  CreditCard,
  LogOut,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface StudentSession {
  id: string;
  studentId: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  institutionPreference: string;
  coursePreference: string;
  wbsccInterest: boolean;
  applicationStatus: string;
  createdAt: string;
}

export default function StudentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aias_user");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(stored));
      } else {
        // If no user is logged in, redirect to login page
        router.push("/login");
      }
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("aias_user");
    localStorage.removeItem("aias_token");
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-ivory">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-3 border-navy border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-navy uppercase tracking-wider">
            Loading Student Portal...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="academic-container max-w-5xl mx-auto space-y-8">
        
        {/* Portal Header */}
        <div className="bg-navy text-white p-6 sm:p-8 rounded-xs border-2 border-gold shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="bg-forest text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs">
                Active Applicant
              </span>
              <span className="text-gold-light text-xs font-mono font-bold">
                ID: {user.studentId || "AIAS-2026-STU-1082"}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Welcome, {user.fullName}!
            </h1>
            <p className="text-xs text-slate-300">
              Candidate Enrollment Docket • Academic Batch 2026–2027
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/courses"
              className="btn btn-outline-white text-xs h-10 px-3.5 flex-1 sm:flex-none justify-center"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore Programs</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-gold text-xs h-10 px-3.5 flex-1 sm:flex-none justify-center"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Live Admission Application Tracker */}
        <div className="bg-white p-6 rounded-xs border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="font-heading font-black text-base text-navy flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-forest" />
                <span>Admission Application Progress Tracker</span>
              </h2>
              <p className="text-xs text-slate-500">
                Official docket status across institutional counseling wings.
              </p>
            </div>
            <span className="bg-amber-100 text-amber-900 font-black text-[10px] uppercase px-2.5 py-1 rounded-xs">
              Status: {user.applicationStatus || "IN_REVIEW"}
            </span>
          </div>

          {/* 4-Step Progress Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-xs border-2 border-forest bg-forest-50/50 space-y-1">
              <span className="text-[10px] font-black uppercase text-forest tracking-wider block">
                Step 1: Completed
              </span>
              <h4 className="font-heading font-bold text-xs text-navy">
                Account &amp; Docket Created
              </h4>
              <p className="text-[11px] text-slate-600">
                Personal details verified on portal.
              </p>
            </div>

            <div className="p-3.5 rounded-xs border-2 border-gold bg-amber-50/40 space-y-1">
              <span className="text-[10px] font-black uppercase text-gold-dark tracking-wider block">
                Step 2: In Review
              </span>
              <h4 className="font-heading font-bold text-xs text-navy">
                Eligibility Assessment
              </h4>
              <p className="text-[11px] text-slate-600">
                Counselor reviewing marksheet &amp; seat availability.
              </p>
            </div>

            <div className="p-3.5 rounded-xs border border-slate-200 bg-slate-50 space-y-1 opacity-75">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                Step 3: Pending
              </span>
              <h4 className="font-heading font-bold text-xs text-navy">
                Counseling &amp; Bonafide
              </h4>
              <p className="text-[11px] text-slate-500">
                Fee structure &amp; WBSCC bonafide issuance.
              </p>
            </div>

            <div className="p-3.5 rounded-xs border border-slate-200 bg-slate-50 space-y-1 opacity-75">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                Step 4: Pending
              </span>
              <h4 className="font-heading font-bold text-xs text-navy">
                Seat Allotment
              </h4>
              <p className="text-[11px] text-slate-500">
                Final admission letter &amp; student ID card.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Course Profile & WBSCC Support */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Academic & Institution Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-xs border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-black text-base text-navy flex items-center gap-2 border-b border-slate-200 pb-3">
                <GraduationCap className="w-4 h-4 text-navy" />
                <span>Selected Academic Details</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xs border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Programme:
                  </span>
                  <span className="font-heading font-black text-sm text-navy block mt-0.5">
                    {user.coursePreference || "Diploma in Medical Laboratory Technology (DMLT)"}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xs border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Enrolling Institution:
                  </span>
                  <span className="font-heading font-bold text-xs text-navy block mt-0.5">
                    {user.institutionPreference || "Asansol Institute of Allied Sciences (AIAS)"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xs border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Registered Phone:
                    </span>
                    <span className="font-mono font-bold text-navy block mt-0.5">
                      {user.phone}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xs border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Registered Email:
                    </span>
                    <span className="font-medium text-navy block mt-0.5 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xs border border-slate-200 flex items-start gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Campus Address:</strong> Burnpur Riverside Road, Asansol, West Bengal, PIN - 713325.
                  </span>
                </div>
              </div>
            </div>

            {/* Document Verification Checklist */}
            <div className="bg-white p-6 rounded-xs border border-slate-200 shadow-xs space-y-3">
              <h3 className="font-heading font-black text-sm text-navy flex items-center gap-2">
                <FileText className="w-4 h-4 text-forest" />
                <span>Documents Required for Verification at Campus</span>
              </h3>
              <p className="text-xs text-slate-500">
                Please bring original copies along with 2 self-attested photocopies when visiting the Admissions Office:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span>Madhyamik (Class 10) Admit / Age Proof</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span>Class 10+2 / H.S. Marksheet</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span>Aadhaar Card of Candidate &amp; Guardian</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span>4 Passport Size Color Photographs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: WBSCC Education Loan & Counseling Helpline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WBSCC Loan Facilitation Card */}
            <div className="bg-navy text-white p-6 rounded-xs border-2 border-gold shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gold-light uppercase tracking-wider">
                  State Government Support
                </span>
                <span className="bg-gold text-navy font-black text-[10px] px-2 py-0.5 rounded-xs">
                  ₹10 Lakhs Limit
                </span>
              </div>
              <h3 className="font-heading font-black text-lg text-white">
                West Bengal Student Credit Card (WBSCC) Desk
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Eligible students can fund 100% of institutional course fees, laboratory expenses, and study materials at a 4% simple interest rate.
              </p>
              <div className="p-3 bg-white/10 rounded-xs border border-white/20 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300">Nodal Institutional Help:</span>
                  <span className="font-bold text-gold-light">Free Bonafide Stamping</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Govt Portal:</span>
                  <a
                    href="https://wbscc.wb.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-sky-300 underline inline-flex items-center gap-1"
                  >
                    <span>wbscc.wb.gov.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="pt-1">
                <Link
                  href="/student-credit-card"
                  className="btn btn-gold text-xs h-10 w-full justify-center"
                >
                  <span>View Step-by-Step WBSCC Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Direct Admissions Counseling Callout */}
            <div className="bg-white p-6 rounded-xs border border-slate-200 shadow-xs space-y-3 text-xs">
              <h4 className="font-heading font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest" />
                <span>Direct Counselor Helpline</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Have questions regarding syllabus, hostel accommodation, or fee installment schedules? Connect directly with our admissions desk.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Central Toll-Free Line:
                </span>
                <a
                  href="tel:1800897334"
                  className="font-mono font-black text-lg text-navy hover:text-gold-dark transition block"
                >
                  1800 897 334
                </a>
                <span className="text-[10px] text-slate-500 block">
                  Monday to Saturday • 9:30 AM to 5:30 PM
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
