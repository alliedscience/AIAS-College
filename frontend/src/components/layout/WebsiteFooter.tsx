import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

export function WebsiteFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t-4 border-gold pt-10 sm:pt-14 pb-8">
      <div className="academic-container">
        
        {/* Main 4-Column Grid — single col on mobile, 2-col on md, 4-col on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          
          {/* Column 1: Central Group Identity */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/AIAS LOGO PNG.png"
                  alt="AIAS Crest"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-brand font-bold text-white text-base leading-tight block">
                  ASANSOL INSTITUTE OF ALLIED SCIENCES
                </span>
                <span className="text-xs text-gold-light font-bold">ESTD: 2026</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Central educational portal representing Allied Health Sciences, Nursing, and Teacher Education institutions in Asansol, West Bengal. Dedicated to technical rigor, university collaborations, and comprehensive placement support.
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>Burnpur Riverside Road, Asansol, West Bengal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>admissions@aias.edu.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: The 4 Group Institutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light border-b border-white/10 pb-2">
              The 4 Institutions
            </h4>
            <ul className="text-xs space-y-2.5">
              <li>
                <Link href="/institutions/aias" className="hover:text-white transition block">
                  <strong className="text-white block font-semibold hover:text-gold-light">
                    Asansol Institute of Allied Sciences
                  </strong>
                  <span className="text-[11px] text-slate-400">
                    DMLT, Agriculture &amp; Veterinary Assistant (2 Yrs)
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/institutions/bijoy-pal-memorial" className="hover:text-white transition block">
                  <strong className="text-white block font-semibold hover:text-gold-light">
                    Bijoy Pal Memorial B.Ed College
                  </strong>
                  <span className="text-[11px] text-slate-400">
                    B.Ed (2 Yrs) • NCTE &amp; BSAEU (Estd: 2007)
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/institutions/pramoth-nath-das" className="hover:text-white transition block">
                  <strong className="text-white block font-semibold hover:text-gold-light">
                    Pramoth Nath Das Academy of Nursing
                  </strong>
                  <span className="text-[11px] text-slate-400">
                    GNM (3 Yrs) &amp; B.Sc Nursing (4 Yrs) • INC, WBNC &amp; WBUHS
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/institutions/pn-das-academy" className="hover:text-white transition block">
                  <strong className="text-white block font-semibold hover:text-gold-light">
                    P.N. Das Academy (D.El.Ed College)
                  </strong>
                  <span className="text-[11px] text-slate-400">
                    D.El.Ed (2 Yrs) • NCTE &amp; WBBPE Affiliated
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs & Student Aid */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light border-b border-white/10 pb-2">
              Programmes &amp; Portals
            </h4>
            <ul className="text-xs space-y-2">
              <li>
                <Link href="/courses/medical-laboratory-technology" className="hover:text-white transition">
                  Diploma in Medical Lab Technology (DMLT)
                </Link>
              </li>
              <li>
                <Link href="/courses/agriculture" className="hover:text-white transition">
                  Diploma in Agriculture (2 Yrs)
                </Link>
              </li>
              <li>
                <Link href="/courses/veterinary-assistant" className="hover:text-white transition">
                  Diploma in Veterinary Assistant (2 Yrs)
                </Link>
              </li>
              <li>
                <Link href="/courses/bed" className="hover:text-white transition">
                  Bachelor of Education (B.Ed - 12 Methods)
                </Link>
              </li>
              <li>
                <Link href="/courses/gnm" className="hover:text-white transition">
                  General Nursing &amp; Midwifery (G.N.M)
                </Link>
              </li>
              <li>
                <Link href="/courses/bsc-nursing" className="hover:text-white transition">
                  B.Sc Nursing (4 Yrs - WBUHS)
                </Link>
              </li>
              <li>
                <Link href="/courses/deled" className="hover:text-white transition">
                  Diploma in Elementary Education (D.El.Ed)
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10 flex items-center gap-3">
                <Link href="/student-credit-card" className="text-gold-light font-bold hover:underline">
                  WBSCC Loan Desk
                </Link>
                <span className="text-white/30">•</span>
                <Link href="/scholarships" className="text-gold-light font-bold hover:underline">
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional Helpline Directory (PDF Preserved Data) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-light border-b border-white/10 pb-2">
              Toll-Free Helplines Directory
            </h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="bg-white/5 p-2.5 rounded-xs border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">AIAS Admissions Desk:</div>
                <a
                  href="tel:1800897334"
                  className="font-mono font-bold text-sm text-gold-light hover:text-white block transition"
                >
                  1800 897 334
                </a>
                <div className="text-[10px] text-slate-400">PDF P1 variation: 1800897334</div>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xs border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">B.Ed &amp; D.El.Ed Colleges:</div>
                <a
                  href="tel:18008911734"
                  className="font-mono font-bold text-sm text-gold-light hover:text-white block transition"
                >
                  1800 891 1734
                </a>
              </div>

              <div className="bg-white/5 p-2.5 rounded-xs border border-white/10">
                <div className="text-[11px] text-slate-400 font-medium">P.N. Das Nursing Academy:</div>
                <a
                  href="tel:18008907334"
                  className="font-mono font-bold text-sm text-gold-light hover:text-white block transition"
                >
                  1800 890 7334
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Academic Collaboration Notice Bar */}
        <div className="border-t border-white/10 pt-6 pb-4">
          <div className="bg-white/5 border border-white/10 rounded-xs p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <strong className="text-white">Academic Collaboration Disclosure:</strong> Courses at Asansol Institute of Allied Sciences are conducted in formal academic collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women’s University (DHWU).
              </div>
            </div>
            <div className="text-slate-400 text-[11px] whitespace-nowrap">
              Burnpur Riverside Road, Asansol, WB
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col items-center sm:flex-row sm:justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Asansol Institute of Allied Sciences &amp; Group Institutions. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/admissions" className="hover:text-slate-200 transition">
              Admissions Policy
            </Link>
            <span>•</span>
            <Link href="/student-credit-card" className="hover:text-slate-200 transition">
              WBSCC Terms
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-200 transition">
              Campus Contact
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
