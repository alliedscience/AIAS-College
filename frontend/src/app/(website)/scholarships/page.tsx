import React from "react";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Phone,
  ArrowRight,
  CreditCard,
  Building2,
  HelpCircle,
} from "lucide-react";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export const metadata = {
  title: "Scholarships & Financial Aid | AIAS Asansol Group",
  description:
    "Explore government and institutional scholarship schemes: SVMCM, Aikyashree, OASIS, Kanyashree, and National Scholarship Portal assistance for students at AIAS Asansol.",
};

export default function ScholarshipsPage() {
  const scholarships = [
    {
      name: "Swami Vivekananda Merit-cum-Means Scholarship (SVMCM)",
      provider: "Government of West Bengal (Higher Education Dept.)",
      eligibility: "Candidates with 60% and above in last qualifying exam with family income within state limits.",
      benefits: "Substantial direct benefit financial assistance towards academic tuition fee.",
      tag: "Major State Scheme",
    },
    {
      name: "Aikyashree Scholarship Scheme",
      provider: "West Bengal Minorities Development & Finance Corporation (WBMDFC)",
      eligibility: "Minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) domicile of West Bengal.",
      benefits: "Pre-matric, Post-matric & Merit-cum-Means tuition and maintenance allowances.",
      tag: "Minority Welfare",
    },
    {
      name: "OASIS Scholarship (SC / ST / OBC)",
      provider: "Backward Classes Welfare Department, Govt. of West Bengal",
      eligibility: "Students belonging to SC, ST, and OBC categories with valid caste certificates.",
      benefits: "Post-matric scholarship and maintenance stipend credited directly to bank account.",
      tag: "Social Welfare",
    },
    {
      name: "Kanyashree Prakalpa (K2 & K3)",
      provider: "Department of Women Development & Social Welfare, Govt. of WB",
      eligibility: "Unmarried female students pursuing higher education in recognized institutions.",
      benefits: "One-time financial incentive of ₹25,000/- and university study support.",
      tag: "Women Empowerment",
    },
    {
      name: "National Scholarship Portal (NSP)",
      provider: "Ministry of Electronics & Information Technology, Govt. of India",
      eligibility: "Centrally sponsored post-matric scholarships for eligible minority and technical students.",
      benefits: "Tuition fee reimbursement and central scholarship disbursements.",
      tag: "Central Scheme",
    },
    {
      name: "Institutional Merit & Needy Student Support Desk",
      provider: "AIAS Group Internal Scholarship Committee",
      eligibility: "Meritorious students with verified economic constraints, orphans, or single-parent candidates.",
      benefits: "Special institutional fee concessions decided on a case-by-case evaluation.",
      tag: "Institutional Aid",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Brochure Source: All Types of Scholarships
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Scholarships &amp; Financial Aid Support Desk
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              We ensure that meritorious and economically disadvantaged students receive full guidance to apply for State, Central, and Institutional scholarship programs.
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
          <span className="text-navy font-bold">Scholarships</span>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Scholarship Schemes */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Comprehensive Student Aid
                </span>
                <h2 className="font-heading font-black text-2xl text-navy">
                  Available Government &amp; Institutional Schemes
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As affirmed in the institutional brochure, our central admissions and student welfare office provides end-to-end documentation, bonafide certificates, and portal registration guidance for all major scholarship schemes.
                </p>
              </div>

              {/* Scholarship Cards Grid */}
              <div className="space-y-4">
                {scholarships.map((sch, i) => (
                  <div
                    key={i}
                    className="bg-ivory p-5 rounded-xs border-2 border-slate-200 hover:border-navy transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-gold text-navy-950 px-2.5 py-0.5 rounded-xs">
                        {sch.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        {sch.provider}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-base text-navy">
                      {sch.name}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                      <div className="bg-white p-2.5 rounded-xs border border-slate-200">
                        <strong className="text-navy block text-[11px] uppercase">
                          Eligibility:
                        </strong>
                        <span>{sch.eligibility}</span>
                      </div>
                      <div className="bg-white p-2.5 rounded-xs border border-slate-200">
                        <strong className="text-navy block text-[11px] uppercase">
                          Assistance:
                        </strong>
                        <span>{sch.benefits}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* On-Campus Helpdesk Notice */}
              <div className="bg-navy text-white p-6 rounded-xs border-2 border-gold space-y-3">
                <div className="flex items-center gap-2 text-gold-light font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>On-Campus Nodal Officer Guidance</span>
                </div>
                <h4 className="font-heading font-black text-lg text-white">
                  Dedicated Scholarship Verification Desk
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Our administrative staff assists students with online portal verification, uploading bonafide certificates, institution stamping, and Aadhaar-linked bank account seeding.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/admissions"
                    className="btn btn-gold text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <span>Apply with Scholarship Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="tel:1800897334"
                    className="btn btn-outline-white text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Helpdesk: 1800 897 334</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Admission & Scholarship Enquiry Form */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
