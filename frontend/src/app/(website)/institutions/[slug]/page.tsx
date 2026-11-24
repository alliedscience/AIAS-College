import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Award,
} from "lucide-react";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";
import { AdmissionEnquiryForm } from "@/components/website/AdmissionEnquiryForm";

export function generateStaticParams() {
  return INSTITUTIONS_DATA.map((inst) => ({
    slug: inst.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const inst = INSTITUTIONS_DATA.find((i) => i.slug === slug);
  if (!inst) return { title: "Institution Not Found" };

  return {
    title: `${inst.name} | Asansol Campus`,
    description: inst.shortDescription,
  };
}

export default async function InstitutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const institution = INSTITUTIONS_DATA.find((i) => i.slug === slug);

  if (!institution) {
    notFound();
  }

  const courses = COURSES_DATA.filter((c) => c.institutionSlug === institution.slug);

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-gold text-navy-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
                {institution.theme.badgeText}
              </span>
              <span className="text-slate-300 text-xs font-mono">
                Code: {institution.code}
              </span>
              {institution.establishedYear && (
                <span className="text-slate-300 text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Estd. {institution.establishedYear}
                </span>
              )}
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              {institution.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
              {institution.shortDescription}
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
          <Link href="/institutions" className="hover:text-navy font-semibold">
            Institutions
          </Link>
          <span>/</span>
          <span className="text-navy font-bold">{institution.shortName}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Comprehensive Institutional Profile */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Detailed Narrative */}
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-widest text-gold-dark block">
                  Institutional Profile &amp; Mission
                </span>
                <h2 className="font-heading font-black text-2xl text-navy">
                  Academic Focus &amp; Standards
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {institution.description}
                </p>
              </div>

              {/* Statutory Affiliations & Recognitions */}
              <div className="bg-ivory p-6 rounded-xs border-2 border-slate-300 space-y-4">
                <h3 className="font-heading font-black text-base text-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                  <span>Statutory Recognitions &amp; University Affiliation</span>
                </h3>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="bg-white p-3 rounded-xs border border-slate-200">
                    <strong className="text-navy block uppercase text-[11px] mb-0.5">
                      Affiliation / Collaboration:
                    </strong>
                    <span>{institution.affiliation}</span>
                  </div>

                  <div className="bg-white p-3 rounded-xs border border-slate-200">
                    <strong className="text-navy block uppercase text-[11px] mb-0.5">
                      Statutory Approvals &amp; Recognitions:
                    </strong>
                    <span>{institution.recognitions}</span>
                  </div>
                </div>
              </div>

              {/* Key Institutional Highlights */}
              <div className="space-y-3">
                <h3 className="font-heading font-black text-lg text-navy">
                  Key Institutional Distinctions
                </h3>
                <div className="space-y-2">
                  {institution.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-slate-50 p-3 rounded-xs border border-slate-200 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campus Infrastructure & Facilities */}
              <div className="space-y-3">
                <h3 className="font-heading font-black text-lg text-navy">
                  Laboratories &amp; Specialized Facilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {institution.facilities.map((fac, i) => (
                    <div
                      key={i}
                      className="bg-ivory p-3.5 rounded-xs border border-slate-300 text-xs font-semibold text-navy flex items-center gap-2"
                    >
                      <Building2 className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses Offered List */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-black text-xl text-navy">
                    Available Programmes ({courses.length})
                  </h3>
                  <span className="text-xs text-slate-500">2026 Academic Batch</span>
                </div>

                <div className="space-y-3">
                  {courses.map((course) => (
                    <div
                      key={course.slug}
                      className="bg-white p-5 rounded-xs border-2 border-slate-200 hover:border-navy transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-black text-base text-navy">
                            {course.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-xs">
                            {course.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>Eligibility:</strong> {course.eligibility}
                        </p>
                      </div>

                      <Link
                        href={`/courses/${course.slug}`}
                        className="btn btn-outline-navy text-xs whitespace-nowrap self-start sm:self-center"
                      >
                        <span>View Syllabus</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Contact Directory */}
              <div className="bg-slate-50 p-5 rounded-xs border border-slate-200 space-y-3 text-xs">
                <h4 className="font-heading font-bold text-navy uppercase tracking-wider text-xs">
                  Official Institutional Desk
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gold-dark flex-shrink-0" />
                    <span>
                      <strong>Helpline:</strong>{" "}
                      <a href={`tel:${institution.phone.replace(/\s+/g, "")}`} className="font-mono font-bold text-navy hover:underline">
                        {institution.phone}
                      </a>
                    </span>
                  </div>
                  {institution.altPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span>
                        <strong>Alt Line (Brochure variation):</strong>{" "}
                        <span className="font-mono">{institution.altPhone}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold-dark flex-shrink-0" />
                    <span>
                      <strong>Email:</strong> {institution.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
                    <span>{institution.address}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Embedded Admissions Form */}
            <div className="lg:col-span-5 sticky top-24">
              <AdmissionEnquiryForm defaultInstitution={institution.slug} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
