import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  BookOpen,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
} from "lucide-react";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

export const metadata = {
  title: "Our 4 Educational Institutions | AIAS Asansol Group",
  description:
    "Explore the 4 institutions on Burnpur Riverside Road, Asansol: AIAS (Allied Sciences), Bijoy Pal Memorial B.Ed, Pramoth Nath Das Nursing, and P.N. Das D.El.Ed College.",
};

export default function InstitutionsIndexPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Central Campus Directory
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Our Four Distinct Educational Institutions
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              One central campus located on Burnpur Riverside Road in Asansol, offering specialized professional diplomas and degrees in Allied Sciences, Nursing, and Teacher Education.
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
          <span className="text-navy font-bold">Institutions</span>
        </div>
      </div>

      {/* Institutions Detailed Cards Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container space-y-8 sm:space-y-12">
          {INSTITUTIONS_DATA.map((inst) => {
            const instCourses = COURSES_DATA.filter((c) => c.institutionSlug === inst.slug);

            return (
              <div
                key={inst.slug}
                id={inst.slug}
                className="bg-ivory border-2 border-slate-300 rounded-xs shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch p-5 sm:p-8"
              >
                {/* Left Overview Column */}
                <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="bg-navy text-white text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
                        {inst.theme.badgeText}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        Code: {inst.code}
                      </span>
                      {inst.establishedYear && (
                        <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                          Estd. {inst.establishedYear}
                        </span>
                      )}
                    </div>

                    <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-navy">
                      {inst.name}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {inst.description}
                    </p>

                    {/* Accreditations box */}
                    <div className="bg-white p-3.5 sm:p-4 rounded-xs border border-slate-300 space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-navy uppercase text-[11px] block">
                          Affiliation &amp; Collaboration:
                        </span>
                        <span className="text-slate-700">{inst.affiliation}</span>
                      </div>
                      <div>
                        <span className="font-bold text-navy uppercase text-[11px] block">
                          Statutory Recognitions:
                        </span>
                        <span className="text-slate-700">{inst.recognitions}</span>
                      </div>
                    </div>

                    {/* Highlights list */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-black uppercase tracking-wider text-navy block">
                        Key Highlights:
                      </span>
                      {inst.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Courses & Actions Column */}
                <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-xs border border-slate-300 flex flex-col justify-between space-y-4 h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-navy">
                        Programmes Offered ({instCourses.length})
                      </span>
                      <span className="text-[10px] font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-xs uppercase">
                        2026 Batch Open
                      </span>
                    </div>

                    <div className="space-y-2">
                      {instCourses.map((course) => (
                        <Link
                          key={course.slug}
                          href={`/courses/${course.slug}`}
                          className="block p-3 rounded-xs border border-slate-200 hover:border-navy hover:bg-ivory transition group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-navy group-hover:text-gold-dark truncate">
                              {course.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-xs flex-shrink-0">
                              {course.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                            {course.eligibility}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-semibold">Admissions Line:</span>
                      <a
                        href={`tel:${inst.phone.replace(/\s+/g, "")}`}
                        className="font-mono font-bold text-navy hover:text-gold-dark"
                      >
                        {inst.phone}
                      </a>
                    </div>
                    <Link
                      href={`/institutions/${inst.slug}`}
                      className="btn btn-primary w-full text-xs justify-center"
                    >
                      <span>Explore {inst.shortName} Full Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
