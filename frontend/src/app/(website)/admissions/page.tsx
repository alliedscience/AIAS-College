import React from "react";
import Link from "next/link";
import {
  FileCheck,
  CheckCircle2,
  Calendar,
  CreditCard,
  Phone,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { COURSES_DATA, INSTITUTIONS_DATA } from "@/lib/data/portalData";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export const metadata = {
  title: "Admissions 2026-27 | Asansol Institute of Allied Sciences",
  description:
    "Official admissions desk for Diploma in Agriculture, DMLT, Veterinary Assistant, B.Ed, GNM, B.Sc Nursing, and D.El.Ed in Asansol. Direct counseling & WBSCC loan support.",
};

export default function AdmissionsPage() {
  const steps = [
    {
      step: "01",
      title: "Online Enquiry & Registration",
      desc: "Fill the admission enquiry form on this portal with your candidate details and desired academic program.",
    },
    {
      step: "02",
      title: "Academic Eligibility Counseling",
      desc: "Our institutional admission counselor contacts you to review marksheets, rank cards, and subject requirements.",
    },
    {
      step: "03",
      title: "Document Verification & Campus Visit",
      desc: "Visit our central campus at Burnpur Riverside Road, Asansol with original academic credentials and certificates.",
    },
    {
      step: "04",
      title: "Seat Allotment & WBSCC Processing",
      desc: "Complete provisional enrollment, process West Bengal Student Credit Card or scholarship papers, and receive admission kit.",
    },
  ];

  const documentsRequired = [
    "Madhyamik / Class 10th Admit Card (Proof of Age)",
    "Madhyamik / Class 10th Marksheet & Certificate",
    "Higher Secondary / Class 12th Marksheet & Passing Certificate",
    "Graduation / PG Marksheet & Degree (Mandatory for B.Ed)",
    "Aadhaar Card of Candidate & Guardian",
    "Recent Passport Size Color Photographs (6 Copies)",
    "Caste Certificate (SC / ST / OBC) if applicable",
    "Valid Entrance Rank Card (JENPAS-UG for B.Sc Nursing, where applicable)",
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-700 text-white text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border-l-2 border-yellow-300">
              ★ 2026-27 ADMISSION DESK OPEN
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Admissions &amp; Counseling Enrollment
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Direct &amp; counseling admission procedures for technical allied sciences, teacher education, and nursing qualifications in Asansol.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Strip */}
      <div className="bg-ivory border-b border-slate-200 py-3 text-xs text-slate-600">
        <div className="academic-container flex items-center gap-2">
          <Link href="/" className="hover:text-navy font-semibold">
            Home
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">Admissions 2026</span>
        </div>
      </div>

      {/* Admissions Architecture */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Process & Requirements */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              
              {/* 4-Step Admission Journey */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Procedure &amp; Enrollment Guide
                </span>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-navy">
                  Simple 4-Step Admission Process
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {steps.map((s) => (
                    <div
                      key={s.step}
                      className="bg-ivory p-4 rounded-xs border-2 border-slate-200 space-y-2 shadow-xs"
                    >
                      <div className="font-mono font-black text-base text-gold-dark">
                        STEP {s.step}
                      </div>
                      <h3 className="font-heading font-black text-sm text-navy">
                        {s.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility Matrix Table */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-lg sm:text-xl text-navy">
                  Eligibility Matrix (All 7 Programmes)
                </h3>
                <div className="border border-slate-300 rounded-xs overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left min-w-[500px]">
                      <thead className="bg-navy text-white text-[11px] uppercase tracking-wider font-extrabold">
                        <tr>
                          <th className="p-3">Course Name</th>
                          <th className="p-3">Duration</th>
                          <th className="p-3">Min. Qualification</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
                        {COURSES_DATA.map((c) => (
                          <tr key={c.slug} className="hover:bg-ivory transition">
                            <td className="p-3 font-bold text-navy">
                              {c.name}
                            </td>
                            <td className="p-3 font-mono font-semibold">{c.duration}</td>
                            <td className="p-3 text-slate-600">{c.eligibility}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="bg-ivory p-5 sm:p-6 rounded-xs border-2 border-slate-300 space-y-4 shadow-xs">
                <h3 className="font-heading font-black text-base text-navy flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-forest" />
                  <span>Mandatory Verification Documents Checklist</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Please bring self-attested photocopies along with original documents for in-person verification at the admissions desk.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {documentsRequired.map((doc, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2.5 rounded-xs border border-slate-200 text-xs text-slate-800 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Helpline Directory Notice with Aligned Touch Buttons */}
              <div className="bg-slate-50 p-5 rounded-xs border border-slate-200 space-y-3 text-xs">
                <h4 className="font-heading font-bold text-navy uppercase tracking-wider">
                  Need Help? Direct Admissions Helplines
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-700">
                  <a
                    href="tel:1800897334"
                    className="btn btn-phone btn-sm text-xs justify-center flex-col py-2.5 h-auto text-center"
                  >
                    <span className="text-[10px] text-slate-500 uppercase font-bold">AIAS Allied Sciences</span>
                    <span className="font-mono font-black text-sm text-navy">1800 897 334</span>
                  </a>
                  <a
                    href="tel:18008911734"
                    className="btn btn-phone btn-sm text-xs justify-center flex-col py-2.5 h-auto text-center"
                  >
                    <span className="text-[10px] text-slate-500 uppercase font-bold">B.Ed &amp; D.El.Ed</span>
                    <span className="font-mono font-black text-sm text-navy">1800 891 1734</span>
                  </a>
                  <a
                    href="tel:18008907334"
                    className="btn btn-phone btn-sm text-xs justify-center flex-col py-2.5 h-auto text-center"
                  >
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Nursing Academy</span>
                    <span className="font-mono font-black text-sm text-navy">1800 890 7334</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Admissions Enquiry Form */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
