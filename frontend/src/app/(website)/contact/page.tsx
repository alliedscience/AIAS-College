import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { INSTITUTIONS_DATA } from "@/lib/data/portalData";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export const metadata = {
  title: "Contact & Helplines Directory | AIAS Asansol Group",
  description:
    "Official contact desk, toll-free helpline directory, and campus address on Burnpur Riverside Road, Asansol for AIAS, B.Ed, Nursing, and D.El.Ed colleges.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Institutional Contact Directory
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Connect with Our Central Admissions Desk
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Reach our nodal admissions officers, schedule an in-person campus visit, or consult regarding eligibility and student credit card loans.
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
          <span className="text-navy font-bold">Contact &amp; Helplines</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Content Column: Institutional Directory */}
            <div className="lg:col-span-7 space-y-8 sm:space-y-10">
              
              {/* Campus Address Card */}
              <div className="bg-ivory p-5 sm:p-6 rounded-xs border-2 border-slate-300 space-y-4 shadow-xs">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Central Campus Location
                </span>
                <div className="space-y-2">
                  <h2 className="font-heading font-black text-xl sm:text-2xl text-navy">
                    Burnpur Riverside Road Campus
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Burnpur Riverside Road, Asansol, West Bengal – 713325. Serving students from across Paschim Bardhaman, Purba Bardhaman, Bankura, Purulia, and neighboring districts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-forest flex-shrink-0" />
                    <span>
                      <strong>Office Hours:</strong> Mon – Sat: 9:30 AM – 5:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-forest flex-shrink-0" />
                    <span>
                      <strong>Email:</strong> admissions@aias.edu.in
                    </span>
                  </div>
                </div>
              </div>

              {/* Institution-Wise Helpline Directory (Preserved Brochure Data with Aligned Buttons) */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-lg sm:text-xl text-navy">
                  Institution-Wise Toll-Free Lines Directory
                </h3>
                <p className="text-xs text-slate-600">
                  Direct telephone lines published in the official brochure (&ldquo;AIAS P1.pdf&rdquo;) for admissions and department counseling:
                </p>

                <div className="space-y-3">
                  {INSTITUTIONS_DATA.map((inst) => (
                    <div
                      key={inst.slug}
                      className="bg-white p-4 sm:p-5 rounded-xs border-2 border-slate-200 hover:border-navy transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-heading font-black text-sm text-navy">
                          {inst.name}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {inst.shortDescription}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={`tel:${inst.phone.replace(/\s+/g, "")}`}
                          className="btn btn-phone btn-sm text-xs justify-center w-full sm:w-auto min-w-[150px]"
                        >
                          <Phone className="w-3.5 h-3.5 text-navy" />
                          <span>{inst.phone}</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transportation & Directions Guide */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-xs border border-slate-200 space-y-3 text-xs text-slate-700">
                <h4 className="font-heading font-bold text-navy uppercase tracking-wider text-xs flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  <span>How to Reach the Campus</span>
                </h4>
                <div className="space-y-2 leading-relaxed">
                  <p>
                    <strong>By Train:</strong> Asansol Junction (ASN) is approximately 15 minutes away by auto-rickshaw or taxi. Burnpur Railway Station (BURN) is just 5 minutes from campus.
                  </p>
                  <p>
                    <strong>By Road / Bus:</strong> Regularly connected by SBSTC, private buses, and auto routes connecting Asansol City Bus Stand to Burnpur Riverside Road.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Admission Enquiry Form */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
