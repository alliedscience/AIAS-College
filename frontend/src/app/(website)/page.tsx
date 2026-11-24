import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Sprout,
  Stethoscope,
  Building2,
  CheckCircle2,
  Phone,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  FileCheck,
  HelpCircle,
} from "lucide-react";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

export default function HomePage() {
  const aiasCourses = COURSES_DATA.filter((c) => c.institutionSlug === "aias");

  return (
    <div className="flex flex-col">
      
      {/* =======================================================================
          1. HERO SECTION (Academic, Authoritative, Editorial, Responsive)
          ======================================================================= */}
      <section className="relative bg-navy text-white pt-6 pb-10 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 overflow-hidden border-b-4 border-gold">
        {/* Subtle Architectural Grid Texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="academic-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-700 text-white text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border-l-2 border-yellow-300">
                ★ ADMISSION OPEN FOR 2026 ACADEMIC SESSION
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.18] tracking-tight">
                Building Future Leaders in{" "}
                <span className="text-gold-light italic font-serif">Allied Health, Agriculture</span>{" "}
                &amp; Teacher Education
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed max-w-2xl">
                Asansol Institute of Allied Sciences (AIAS) delivers specialized university-partnered 2-year diploma programs engineered for direct employment. In formal academic collaboration with{" "}
                <strong className="text-white font-bold">The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)</strong>, Diamond Harbour Women&apos;s University.
              </p>

              {/* 3 Core Value Props from Brochure Page 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xs space-y-1 hover:border-gold transition">
                  <div className="flex items-center gap-1.5 text-gold-light font-black text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>100% Placement</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Dedicated placement wing &amp; clinical hospital internships.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xs space-y-1 hover:border-gold transition">
                  <div className="flex items-center gap-1.5 text-gold-light font-black text-xs uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>Student Credit Card</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    West Bengal Student Credit Card (WBSCC) support up to ₹10 Lakhs.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xs space-y-1 hover:border-gold transition">
                  <div className="flex items-center gap-1.5 text-gold-light font-black text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>All Scholarships</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    SVMCM, Oasis, Aikyashree, and National Scholarship Portal desk.
                  </p>
                </div>
              </div>

              {/* Responsive Action Buttons (Identical 44px touch targets on mobile & desktop) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                <a href="#courses" className="btn btn-gold text-xs h-11 px-5 justify-center">
                  <BookOpen className="w-4 h-4" />
                  <span>Explore 2-Year Diplomas</span>
                </a>
                <a href="tel:1800897334" className="btn btn-outline-white text-xs h-11 px-5 justify-center font-mono">
                  <Phone className="w-4 h-4" />
                  <span>Toll Free: 1800 897 334</span>
                </a>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-5 w-full" id="admissions">
              <AdmissionEnquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          2. INSTITUTIONAL CREDENTIAL STRIP (Fluid Responsive Grid)
          ======================================================================= */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="academic-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
            
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-slate-100 text-navy rounded-xs flex items-center justify-center flex-shrink-0 border border-slate-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-navy text-xs sm:text-sm block leading-tight">
                  University Partnered
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  DHWU (MCCIS) Collaboration
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-slate-100 text-navy rounded-xs flex items-center justify-center flex-shrink-0 border border-slate-300">
                <CheckCircle2 className="w-5 h-5 text-forest" />
              </div>
              <div>
                <span className="font-extrabold text-navy text-xs sm:text-sm block leading-tight">
                  100% Placement Wing
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  Hospitals, Labs &amp; Smart Farms
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-slate-100 text-navy rounded-xs flex items-center justify-center flex-shrink-0 border border-slate-300">
                <CreditCard className="w-5 h-5 text-navy" />
              </div>
              <div>
                <span className="font-extrabold text-navy text-xs sm:text-sm block leading-tight">
                  WBSCC Loan Facility
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  Govt. Education Loan up to ₹10L
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-slate-100 text-navy rounded-xs flex items-center justify-center flex-shrink-0 border border-slate-300">
                <Building2 className="w-5 h-5 text-gold-dark" />
              </div>
              <div>
                <span className="font-extrabold text-navy text-xs sm:text-sm block leading-tight">
                  4 Premier Colleges
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500">
                  Burnpur Riverside Road Campus
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =======================================================================
          3. FLAGSHIP 2-YEAR DIPLOMAS (With Perfectly Baseline-Aligned Buttons)
          ======================================================================= */}
      <section id="courses" className="py-14 sm:py-16 bg-ivory">
        <div className="academic-container space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-forest block">
              Flagship Programs • Asansol Institute of Allied Sciences
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
              Career-Oriented 2-Year Diploma Courses
            </h2>
            <div className="w-14 h-1 bg-gold mx-auto mt-2 mb-3" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Curricula delivered in formal collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS) at Diamond Harbour Women&apos;s University, featuring intensive diagnostic and farm practicums.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {aiasCourses.map((course) => (
              <div
                key={course.slug}
                className="bg-white rounded-xs border-2 border-slate-200 hover:border-navy shadow-xs flex flex-col h-full overflow-hidden transition duration-200 group"
              >
                {/* Course Header Banner */}
                <div className="relative h-44 sm:h-48 bg-navy-950 flex-shrink-0">
                  <Image
                    src={course.featuredImage}
                    alt={course.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-navy text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-xs border-l-2 border-gold">
                    {course.duration}
                  </span>
                </div>

                {/* Course Content Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {course.discipline}
                  </span>
                  <h3 className="font-heading font-black text-navy text-base sm:text-lg leading-snug group-hover:text-gold-dark transition">
                    {course.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">
                    {course.description}
                  </p>

                  <div className="text-xs border-y border-slate-100 py-3 space-y-1.5 text-slate-700 bg-slate-50/50 p-2.5 rounded-xs">
                    <div>
                      <strong className="text-navy">Eligibility:</strong> {course.eligibility}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] pt-1">
                      <span className="text-forest font-bold">✓ 100% Placement</span>
                      <span>•</span>
                      <span className="text-navy font-bold">✓ WBSCC Eligible</span>
                    </div>
                  </div>

                  {/* Button Action Footer (Anchored with mt-auto for perfect horizontal alignment) */}
                  <div className="mt-auto pt-3 grid grid-cols-2 gap-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="btn btn-outline-navy btn-sm justify-center w-full"
                    >
                      View Syllabus
                    </Link>
                    <a
                      href="#admissions"
                      className="btn btn-primary btn-sm justify-center w-full"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/courses"
              className="btn btn-outline-navy text-xs inline-flex items-center gap-1.5"
            >
              <span>Explore All 7 Degree &amp; Diploma Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =======================================================================
          4. THE 4 INSTITUTIONAL SHOWCASES (Aligned Buttons & Directory)
          ======================================================================= */}
      <section id="institutions" className="py-14 sm:py-16 bg-white border-t border-slate-200">
        <div className="academic-container space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
              Group Educational Network • Riverside Road, Burnpur
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
              Our 4 Premier Institutions
            </h2>
            <div className="w-14 h-1 bg-gold mx-auto mt-2 mb-3" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Preserving the exact institutional titles, affiliations, and degree durations from the official brochure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTITUTIONS_DATA.map((inst) => (
              <div
                key={inst.slug}
                className="bg-ivory border-2 border-slate-200 hover:border-navy rounded-xs p-5 sm:p-6 flex flex-col h-full justify-between transition group shadow-xs hover:shadow-sm"
              >
                {/* Header & Body */}
                <div className="space-y-3 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                    <div className="relative w-11 h-11 flex-shrink-0">
                      <Image
                        src={inst.logo}
                        alt={inst.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-navy text-xs sm:text-sm leading-tight group-hover:text-gold-dark transition">
                        {inst.name}
                      </h3>
                      <span className="text-[10px] text-forest font-bold uppercase tracking-wider block mt-0.5">
                        {inst.theme.badgeText}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">
                    {inst.shortDescription}
                  </p>

                  <div className="text-xs space-y-1 bg-white p-3 rounded-xs border border-slate-200">
                    <strong className="block text-navy font-bold text-[11px] uppercase">
                      Affiliation / Recognition:
                    </strong>
                    <span className="text-[11px] text-slate-600 block line-clamp-2">
                      {inst.affiliation}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer (Pinned with mt-auto for perfect alignment) */}
                <div className="mt-auto pt-4 border-t border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-semibold">Toll-Free:</span>
                    <a
                      href={`tel:${inst.phone.replace(/\s+/g, "")}`}
                      className="font-mono font-bold text-navy hover:text-gold-dark transition"
                    >
                      {inst.phone}
                    </a>
                  </div>

                  <Link
                    href={`/institutions/${inst.slug}`}
                    className="btn btn-outline-navy btn-sm w-full justify-center"
                  >
                    <span>View Institution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/institutions"
              className="btn btn-primary text-xs inline-flex items-center gap-1.5"
            >
              <span>Explore Central Campus Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =======================================================================
          5. STUDENT CREDIT CARD & ALL TYPES OF SCHOLARSHIPS
          ======================================================================= */}
      <section id="student-credit-card" className="py-14 sm:py-16 bg-navy text-white border-t border-gold">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="space-y-5">
              <span className="text-xs font-black uppercase tracking-widest text-gold-light block">
                Financial Accessibility • Govt. of West Bengal
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
                West Bengal Student Credit Card &amp; All Scholarships
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                As detailed in the institutional brochure, students across all four colleges are eligible for comprehensive government financial assistance schemes to ensure zero financial barriers.
              </p>

              <div className="space-y-3 pt-1">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
                  <h4 className="text-gold-light font-black text-xs sm:text-sm mb-1 uppercase tracking-wider">
                    West Bengal Student Credit Card (WBSCC)
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Collateral-free education loans of up to <strong className="text-white">₹10 Lakhs</strong> at a simple nominal interest rate with 15-year repayment flexibility and 1-year moratorium post-course completion.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xs">
                  <h4 className="text-gold-light font-black text-xs sm:text-sm mb-1 uppercase tracking-wider">
                    All Types of Government &amp; Merit Scholarships
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    On-campus guidance for Swami Vivekananda Merit-cum-Means (SVMCM), Oasis Scholarship for SC/ST/OBC, Aikyashree for Minority Scholars, and Kanyashree Prakalpa.
                  </p>
                </div>
              </div>

              {/* Action Buttons Aligned */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/student-credit-card"
                  className="btn btn-gold text-xs h-11 px-5 justify-center"
                >
                  <span>WBSCC Loan Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/scholarships"
                  className="btn btn-outline-white text-xs h-11 px-5 justify-center"
                >
                  <span>Explore Scholarships</span>
                </Link>
              </div>
            </div>

            {/* Helpline Directory Card */}
            <div id="contact" className="bg-white text-navy p-6 sm:p-8 rounded-xs border-2 border-gold shadow-lg">
              <h3 className="font-heading font-black text-lg sm:text-xl text-navy mb-1">
                Toll-Free Admissions Desk Directory
              </h3>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Our central admissions and counseling office on Burnpur Riverside Road is open Monday through Saturday (9:30 AM – 5:30 PM).
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 block">
                      Allied Sciences (AIAS):
                    </span>
                    <span className="text-xs text-navy font-bold">
                      DMLT, Agriculture, Veterinary
                    </span>
                  </div>
                  <a
                    href="tel:1800897334"
                    className="font-mono text-sm font-black text-navy hover:text-gold-dark transition"
                  >
                    1800 897 334
                  </a>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 block">
                      Teacher Education (B.Ed / D.El.Ed):
                    </span>
                    <span className="text-xs text-navy font-bold">
                      Bijoy Pal B.Ed &amp; P.N. Das D.El.Ed
                    </span>
                  </div>
                  <a
                    href="tel:18008911734"
                    className="font-mono text-sm font-black text-navy hover:text-gold-dark transition"
                  >
                    1800 891 1734
                  </a>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 block">
                      Nursing Academy (PND):
                    </span>
                    <span className="text-xs text-navy font-bold">
                      G.N.M (3 Yrs) &amp; B.Sc Nursing (4 Yrs)
                    </span>
                  </div>
                  <a
                    href="tel:18008907334"
                    className="font-mono text-sm font-black text-navy hover:text-gold-dark transition"
                  >
                    1800 890 7334
                  </a>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Central Campus: Burnpur Riverside Road, Asansol, West Bengal</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
