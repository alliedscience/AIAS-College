import React from "react";
import Link from "next/link";
import {
  Briefcase,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Award,
  Phone,
  ArrowRight,
  Stethoscope,
  Sprout,
  GraduationCap,
} from "lucide-react";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export const metadata = {
  title: "100% Placement Assistance | AIAS Asansol Group",
  description:
    "Explore the dedicated Training & Placement Cell at Asansol Institute of Allied Sciences. Clinical hospital tie-ups, diagnostic pathology networks, and career support.",
};

export default function PlacementPage() {
  const sectors = [
    {
      title: "Allied Health & Diagnostic Pathology",
      courses: "Diploma in Medical Laboratory Technology (DMLT)",
      roles: "Pathology Technologists, Lab Supervisors, Hematology Analysts, Phlebotomists",
      tieUps: "Multi-specialty hospital pathology departments, regional diagnostic laboratory chains, and government clinical centers.",
    },
    {
      title: "Nursing & Hospital Healthcare",
      courses: "G.N.M (3 Yrs) & B.Sc Nursing (4 Yrs)",
      roles: "Staff Nurses, Community Health Officers (CHO), ICU Specialists, Nurse Tutors",
      tieUps: "Premier corporate hospitals, government health centers, and superspecialty surgical centers.",
    },
    {
      title: "Modern Agronomy & Agro-Enterprises",
      courses: "Diploma in Agriculture (2 Yrs)",
      roles: "Farm Managers, Hydroponic Technicians, Fertilizer Quality Inspectors, Agri-extension leads",
      tieUps: "Agri-business firms, commercial greenhouses, seed production nurseries, and agro-chemical providers.",
    },
    {
      title: "Veterinary Healthcare & Animal Husbandry",
      courses: "Diploma in Veterinary Assistant (2 Yrs)",
      roles: "Veterinary Hospital Assistants, Livestock Health Officers, Pet Clinic Managers",
      tieUps: "Animal welfare centers, government veterinary clinics, commercial dairy & poultry farm operations.",
    },
    {
      title: "Primary & Secondary School Teaching",
      courses: "B.Ed (12 Method Subjects) & D.El.Ed (2 Yrs)",
      roles: "Secondary Teachers (TGT/PGT), Primary Educators, Educational Counselors",
      tieUps: "Affiliated secondary schools, government primary schools, private CBSE/ICSE institutions.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Brochure Source: 100% Placement Assistance
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Dedicated Training &amp; Placement Wing
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Every course is engineered for direct employability, supplemented by mandatory clinical rotations, school internships, and active industry linkages.
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
          <span className="text-navy font-bold">Placements</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Placement Philosophy */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Career Readiness Framework
                </span>
                <h2 className="font-heading font-black text-2xl text-navy">
                  Bridging Academic Rigor &amp; Professional Employment
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  As affirmed in the official institutional brochure, Asansol Institute of Allied Sciences and its affiliated institutions maintain a dedicated Placement Cell. Our objective is to ensure that every student graduates with verified hands-on clinical and pedagogical experience, professional grooming, and direct interview opportunities.
                </p>
              </div>

              {/* Sector-by-Sector Employment Wings */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-xl text-navy">
                  Career Sectors &amp; Internship Environments
                </h3>
                <div className="space-y-4">
                  {sectors.map((sec, i) => (
                    <div
                      key={i}
                      className="bg-ivory p-5 rounded-xs border-2 border-slate-200 hover:border-navy transition space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading font-black text-base text-navy">
                          {sec.title}
                        </h4>
                        <span className="text-[10px] font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-xs">
                          {sec.courses}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div>
                          <strong className="text-navy">Target Roles:</strong> {sec.roles}
                        </div>
                        <div>
                          <strong className="text-navy">Internship &amp; Placement Networks:</strong> {sec.tieUps}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Placement Services */}
              <div className="bg-slate-50 p-6 rounded-xs border border-slate-200 space-y-3">
                <h3 className="font-heading font-black text-base text-navy flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold-dark" />
                  <span>The AIAS Placement Cell Commitment</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <span>Resume building, interview prep &amp; professional grooming sessions.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <span>Compulsory hospital bedside internship for nursing &amp; DMLT students.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <span>Real-world school internship and macro-teaching practicums for B.Ed &amp; D.El.Ed.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <span>On-campus recruitment drives &amp; ongoing job notification support.</span>
                  </div>
                </div>
              </div>

              {/* Placement Assistance Callout with Aligned Action Buttons */}
              <div className="bg-navy text-white p-6 rounded-xs border-2 border-gold space-y-3">
                <div className="flex items-center gap-2 text-gold-light font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span>100% Placement Assistance Cell</span>
                </div>
                <h4 className="font-heading font-black text-lg text-white">
                  Join Our Professional Healthcare, Agriculture &amp; Teaching Batches
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Brochure verified: 100% placement assistance backed by corporate tie-ups and clinical hospital postings in Asansol and greater Bengal.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/admissions"
                    className="btn btn-gold text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <span>Apply for 2026 Batch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href="tel:1800897334"
                    className="btn btn-outline-white text-xs h-11 px-5 justify-center w-full sm:w-auto"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Placement Desk: 1800 897 334</span>
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
