"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  CreditCard,
  Award,
  ArrowRight,
  Filter,
  GraduationCap,
} from "lucide-react";
import { COURSES_DATA, INSTITUTIONS_DATA } from "@/lib/data/portalData";

export default function CoursesIndexPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("ALL");
  const [selectedInstitution, setSelectedInstitution] = useState<string>("ALL");

  const disciplines = [
    "ALL",
    "Allied Sciences",
    "Nursing & Healthcare",
    "Teacher Education",
  ];

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (selectedDiscipline !== "ALL" && course.discipline !== selectedDiscipline) {
      return false;
    }
    if (
      selectedInstitution !== "ALL" &&
      course.institutionSlug !== selectedInstitution
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Academic Programmes Directory
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Explore Professional Diplomas &amp; Degrees
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Regulated qualifications in Paramedical Diagnostics, Agriculture, Veterinary Assistance, B.Ed, GNM, B.Sc Nursing, and D.El.Ed across our four Asansol institutions.
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
          <span className="text-navy font-bold">Courses &amp; Programmes</span>
        </div>
      </div>

      {/* Filter Strip & Course Discovery Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container space-y-8">
          
          {/* Responsive Filter Bar */}
          <div className="bg-ivory p-4 sm:p-5 rounded-xs border border-slate-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-gold-dark" />
                <span>Filter by Discipline:</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {disciplines.map((disc) => (
                  <button
                    key={disc}
                    onClick={() => setSelectedDiscipline(disc)}
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-xs transition border min-h-[38px] ${
                      selectedDiscipline === disc
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-navy-800 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {disc === "ALL" ? "All Disciplines" : disc}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 md:space-y-0 md:flex md:items-center md:gap-2 justify-end">
              <span className="text-xs font-bold text-navy block md:inline whitespace-nowrap">
                Institution:
              </span>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full md:w-auto text-xs px-3 py-2 bg-white border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy h-10"
              >
                <option value="ALL">All 4 Institutions</option>
                {INSTITUTIONS_DATA.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>Showing {filteredCourses.length} Academic Programmes</span>
            <span>Admissions Active for 2026 Session</span>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.slug}
                className="bg-white border-2 border-slate-200 hover:border-navy rounded-xs shadow-xs hover:shadow-sm transition flex flex-col justify-between overflow-hidden group h-full"
              >
                {/* Course Body */}
                <div className="p-5 sm:p-6 space-y-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-xs">
                      {course.discipline}
                    </span>
                    <span className="text-xs font-mono font-black text-navy bg-gold/20 px-2 py-0.5 rounded-xs flex-shrink-0">
                      {course.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-base sm:text-lg text-navy group-hover:text-gold-dark transition leading-snug">
                      {course.name}
                    </h3>
                    <div className="text-[11px] font-bold text-slate-500 mt-1">
                      {course.institutionName}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 flex-grow">
                    {course.description}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xs border border-slate-200 text-xs space-y-1">
                    <strong className="text-navy text-[11px] uppercase block">
                      Eligibility:
                    </strong>
                    <span className="text-slate-700 text-[11px] block line-clamp-2">
                      {course.eligibility}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {course.hasPlacementAssistance && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        100% Placement
                      </span>
                    )}
                    {course.isCreditCardEligible && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-navy bg-navy/10 px-2 py-0.5 rounded-xs">
                        <CreditCard className="w-3 h-3" />
                        WBSCC Eligible
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions Footer (Anchored to bottom with mt-auto, perfectly balanced 2-button grid) */}
                <div className="mt-auto p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn btn-outline-navy btn-sm justify-center w-full"
                  >
                    <span>Curriculum</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/admissions?course=${course.slug}`}
                    className="btn btn-primary btn-sm justify-center w-full"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
