import React from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Phone,
  HelpCircle,
  Building2,
  Percent,
} from "lucide-react";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export const metadata = {
  title: "West Bengal Student Credit Card (WBSCC) | AIAS Asansol",
  description:
    "Official guidance for the West Bengal Student Credit Card Scheme (WBSCC) up to ₹10 Lakhs at 4% simple interest for courses at AIAS Asansol.",
};

export default function StudentCreditCardPage() {
  const benefits = [
    {
      title: "Loan Amount up to ₹10 Lakhs",
      desc: "Covers institutional course fees, laboratory charges, hostel accommodation, computer/laptop purchases, and study materials.",
    },
    {
      title: "Concessional 4% Simple Interest",
      desc: "Subsidized interest rate of 4% per annum simple interest with 0.5% additional rebate for female candidates.",
    },
    {
      title: "15-Year Repayment Period",
      desc: "Repayment begins after completion of the course with a 1-year moratorium period, easing the transition into professional employment.",
    },
    {
      title: "State Government Credit Guarantee",
      desc: "No collateral security or third-party guarantee required. Guaranteed by the Government of West Bengal.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Online Portal Registration",
      desc: "Register on the official West Bengal Student Credit Card portal (wbscc.wb.gov.in) using your mobile and Aadhaar details.",
    },
    {
      step: "02",
      title: "Institutional Bonafide & Fee Structure",
      desc: "Collect the verified Course Fee Structure, Bonafide Certificate, and Institution Nodal Approval from our Admissions Office.",
    },
    {
      step: "03",
      title: "Online Application & Document Upload",
      desc: "Upload candidate & co-borrower Aadhaar, PAN card, admission receipt, and fee structure on the portal.",
    },
    {
      step: "04",
      title: "Institutional Verification & Forwarding",
      desc: "Our institutional Nodal Officer verifies and forwards the application directly to the Higher Education Department and bank.",
    },
    {
      step: "05",
      title: "Bank Sanction & Direct Disbursement",
      desc: "The designated public or private bank issues the sanction letter, and credit is disbursed directly for academic expenses.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Brochure Source: Student Credit Card Support
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              West Bengal Student Credit Card (WBSCC) Scheme
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Complete institutional facilitation for education loans up to ₹10 Lakhs at 4% simple interest for all courses across our four institutions.
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
          <span className="text-navy font-bold">Student Credit Card (WBSCC)</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Core Features */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Affordable Financial Empowerment
                </span>
                <h2 className="font-heading font-black text-2xl text-navy">
                  Key Benefits of WBSCC for AIAS Students
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((b, i) => (
                    <div
                      key={i}
                      className="bg-ivory p-4 rounded-xs border border-slate-300 space-y-2"
                    >
                      <h3 className="font-heading font-black text-sm text-navy flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                        <span>{b.title}</span>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Application Process */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-xl text-navy">
                  Step-by-Step WBSCC Application Workflow
                </h3>
                <div className="space-y-3">
                  {steps.map((st) => (
                    <div
                      key={st.step}
                      className="bg-slate-50 p-4 rounded-xs border border-slate-200 flex items-start gap-4"
                    >
                      <div className="font-mono font-black text-base text-gold-dark bg-white px-2.5 py-1 rounded-xs border border-slate-200 flex-shrink-0">
                        {st.step}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-heading font-black text-sm text-navy">
                          {st.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Checklist for WBSCC */}
              <div className="bg-ivory p-6 rounded-xs border-2 border-slate-300 space-y-4">
                <h3 className="font-heading font-black text-base text-navy flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-forest" />
                  <span>Documents Checklist for WBSCC Application</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>Color Photograph of Student &amp; Co-borrower</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>Signature Specimen of Student &amp; Co-borrower</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>Aadhaar Card / Class 10th Registration Doc</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>PAN Card of Student &amp; Co-borrower / Form 60</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>Course Fee Structure Issued by AIAS</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xs border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                    <span>Provisional Admission Receipt &amp; Bank Details</span>
                  </div>
                </div>
              </div>

              {/* On-Campus WBSCC Cell */}
              <div className="bg-navy text-white p-6 rounded-xs border-2 border-gold space-y-3">
                <div className="flex items-center gap-2 text-gold-light font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>On-Campus WBSCC Facilitation Cell</span>
                </div>
                <h4 className="font-heading font-black text-lg text-white">
                  Visit the Student Credit Card Helpdesk at Asansol Campus
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Our dedicated institutional nodal officers provide free, one-on-one document review and portal submission support for every prospective student.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/admissions"
                    className="btn btn-gold text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <span>Apply with WBSCC Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="tel:1800897334"
                    className="btn btn-outline-white text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WBSCC Desk: 1800 897 334</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Admission Enquiry Form */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
