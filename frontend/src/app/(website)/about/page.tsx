import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  ShieldCheck,
  Award,
  BookOpen,
  MapPin,
  Phone,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle2,
} from "lucide-react";
import { INSTITUTIONS_DATA } from "@/lib/data/portalData";

export const metadata = {
  title: "About Us | Asansol Institute of Allied Sciences & Partner Colleges",
  description:
    "Learn about the educational group, our mission, university collaborations, and institutional history across allied sciences, nursing, and teacher education in Asansol.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative overflow-hidden">
        <div className="academic-container relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Institutional Heritage &amp; Vision
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Pioneering Allied Sciences, Healthcare &amp; Teacher Education in Asansol
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Founded on the pillars of academic excellence, university collaborations, and career empowerment, our central campus on Burnpur Riverside Road brings four specialized institutions together under one umbrella.
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
          <span className="text-navy font-bold">About Us</span>
        </div>
      </div>

      {/* Main Narrative Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-gold-dark">
                Our Educational Foundation
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-navy">
                Empowering Bengal&apos;s Youth with Career-Ready Professional Qualifications
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  The Asansol educational ecosystem encompasses a distinguished tradition of professional education. From our establishment of <strong>Bijoy Pal Memorial B.Ed College in 2007</strong> to the launch of the <strong>Asansol Institute of Allied Sciences (AIAS)</strong> in 2026, our institutions have remained committed to providing high-quality, regulated education that aligns with regional and national workforce demands.
                </p>
                <p>
                  Today, the central campus houses four distinct institutions spanning <strong>Medical Laboratory Technology (DMLT), Agriculture, Veterinary Healthcare, Nursing (GNM &amp; B.Sc Nursing), and Teacher Education (B.Ed &amp; D.El.Ed)</strong>.
                </p>
                <p>
                  Crucially, our Allied Sciences programs are conducted in <strong>academic collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women&apos;s University</strong>, providing students with interdisciplinary academic exposure, recognized certifications, and high-standard laboratory training.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200">
                <div className="bg-ivory p-3.5 sm:p-4 rounded-xs border border-slate-200 text-center sm:text-left">
                  <div className="font-heading font-black text-xl sm:text-2xl text-navy">2007</div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Estd. B.Ed</div>
                </div>
                <div className="bg-ivory p-3.5 sm:p-4 rounded-xs border border-slate-200 text-center sm:text-left">
                  <div className="font-heading font-black text-xl sm:text-2xl text-forest">4</div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Colleges</div>
                </div>
                <div className="bg-ivory p-3.5 sm:p-4 rounded-xs border border-slate-200 text-center sm:text-left">
                  <div className="font-heading font-black text-xl sm:text-2xl text-gold-dark">100%</div>
                  <div className="text-[11px] text-slate-600 font-semibold mt-0.5">Placement</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-ivory p-6 sm:p-8 rounded-xs border-2 border-slate-300 shadow-xs space-y-6">
                <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <Image
                      src="/AIAS LOGO PNG.png"
                      alt="AIAS Seal"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-navy text-base sm:text-lg leading-tight">
                      Institutional Identity
                    </h3>
                    <p className="text-xs text-slate-500">Burnpur Riverside Road, Asansol</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy">Academic Collaboration:</strong> The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women&apos;s University.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy">Teacher Education Regulators:</strong> N.C.T.E., BSAEU (erstwhile WBUTTEPA) &amp; WBBPE.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy">Nursing Regulatory Bodies:</strong> Indian Nursing Council (INC), West Bengal Nursing Council (WBNC) &amp; WBUHS.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy">Student Credit Card:</strong> Registered and supported under the West Bengal Student Credit Card (WBSCC) scheme.
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <Link href="/admissions" className="btn btn-primary w-full text-xs justify-center">
                    <span>Apply for 2026 Admissions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Group Institutions Overview Grid */}
      <section className="py-12 sm:py-16 bg-ivory border-t border-b border-slate-200">
        <div className="academic-container space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-gold-dark">
              Campus Portfolio
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
              Four Institutions, One Shared Commitment to Quality
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each institution maintains rigorous statutory affiliations, modern laboratory infrastructure, and specialized faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {INSTITUTIONS_DATA.map((inst) => (
              <div
                key={inst.slug}
                className="bg-white p-5 sm:p-7 rounded-xs border-2 border-slate-200 hover:border-navy transition flex flex-col justify-between h-full shadow-xs"
              >
                <div className="space-y-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-forest bg-forest/10 px-2.5 py-0.5 rounded-xs">
                      {inst.theme.badgeText}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Code: {inst.code}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg sm:text-xl text-navy">
                    {inst.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">
                    {inst.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xs border border-slate-200">
                    <div>
                      <strong className="text-navy uppercase text-[11px] block">Affiliation:</strong>
                      <span>{inst.affiliation}</span>
                    </div>
                    <div>
                      <strong className="text-navy uppercase text-[11px] block">Recognition:</strong>
                      <span>{inst.recognitions}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer (Aligned with mt-auto) */}
                <div className="pt-4 mt-auto border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${inst.phone.replace(/\s+/g, "")}`}
                    className="btn btn-phone btn-sm text-xs justify-center w-full"
                  >
                    <Phone className="w-3.5 h-3.5 text-navy" />
                    <span>{inst.phone}</span>
                  </a>

                  <Link
                    href={`/institutions/${inst.slug}`}
                    className="btn btn-outline-navy btn-sm text-xs justify-center w-full"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Academic Collaboration Spotlight */}
      <section className="py-12 sm:py-16 bg-navy text-white border-b-4 border-gold">
        <div className="academic-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto lg:mx-0">
                <Image
                  src="/images/dhwu-mccis.svg"
                  alt="DHWU &amp; MCCIS Seal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="text-gold-light text-xs font-black uppercase tracking-widest">
                Academic Partnership
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl lg:text-3xl text-white">
                The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)
              </h2>
              <div className="text-xs sm:text-sm text-sky-200 font-semibold">
                ডায়মন্ড হারবার মহিলা বিশ্ববিদ্যালয় • Diamond Harbour Women&apos;s University
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                As detailed in the official institutional brochure, courses at Asansol Institute of Allied Sciences are conducted in formal collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women&apos;s University. This prestigious partnership ensures state-of-the-art curriculum delivery, research-backed training, and robust academic evaluation.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link href="/courses" className="btn btn-gold text-xs h-11 px-5 justify-center w-full sm:w-auto">
                  <span>Explore Partnered Diploma Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
