import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  CreditCard,
  Award,
  Building2,
  Briefcase,
  ShieldCheck,
  Phone,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { COURSES_DATA, INSTITUTIONS_DATA } from "@/lib/data/portalData";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export function generateStaticParams() {
  return COURSES_DATA.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.name} (${course.duration}) | AIAS Admissions`,
    description: course.description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const institution = INSTITUTIONS_DATA.find(
    (i) => i.slug === course.institutionSlug
  );

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gold text-navy-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
                {course.discipline}
              </span>
              <span className="bg-white/10 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-xs border border-white/20">
                Duration: {course.duration}
              </span>
              <span className="text-slate-300 text-xs font-mono">
                Code: {course.code}
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {course.name}
            </h1>

            <div className="flex items-center gap-2 text-sm text-gold-light font-bold">
              <Building2 className="w-4 h-4" />
              <span>Conducted at {course.institutionName}</span>
            </div>
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
          <Link href="/courses" className="hover:text-navy font-semibold">
            Courses
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">{course.shortName}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Overview */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Programme Overview
                </span>
                <h2 className="font-heading font-black text-2xl text-navy">
                  Curriculum Objectives &amp; Technical Foundation
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Eligibility Box */}
              <div className="bg-ivory p-6 rounded-xs border-2 border-slate-300 space-y-3">
                <h3 className="font-heading font-black text-base text-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                  <span>Admission Eligibility Criteria</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-white p-4 rounded-xs border border-slate-200">
                  {course.eligibility}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold text-forest">
                    <CheckCircle2 className="w-4 h-4" />
                    Direct Counseling Support
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-navy">
                    <CreditCard className="w-4 h-4" />
                    WBSCC Loan Eligible
                  </span>
                </div>
              </div>

              {/* Verified Curriculum Modules */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-xl text-navy flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold-dark" />
                  <span>Syllabus &amp; Key Study Modules</span>
                </h3>
                <div className="space-y-2.5">
                  {course.curriculum.map((module, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 p-3.5 rounded-xs border border-slate-200 text-xs text-slate-800 flex items-start gap-3"
                    >
                      <span className="font-mono font-bold text-navy bg-white px-2 py-0.5 rounded-xs border border-slate-200 flex-shrink-0">
                        Module {i + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{module}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Opportunities */}
              <div className="space-y-4">
                <h3 className="font-heading font-black text-xl text-navy flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-forest" />
                  <span>Career Pathways &amp; Direct Employment Roles</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.careerProspects.map((career, i) => (
                    <div
                      key={i}
                      className="bg-ivory p-3.5 rounded-xs border border-slate-300 text-xs text-slate-800 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                      <span className="font-semibold leading-snug">{career}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional Affiliation Badge */}
              {institution && (
                <div className="bg-slate-50 p-5 rounded-xs border border-slate-200 space-y-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Conducted by
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-black text-base text-navy">
                        {institution.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {institution.affiliation}
                      </p>
                    </div>
                    <Link
                      href={`/institutions/${institution.slug}`}
                      className="btn btn-outline-navy text-xs"
                    >
                      <span>Institution Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Embedded Admissions Form pre-selected with this course */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm
                defaultInstitution={course.institutionSlug}
                defaultCourse={course.slug}
              />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
