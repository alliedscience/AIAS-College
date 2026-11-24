"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LogIn,
  User,
} from "lucide-react";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

export function WebsiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [institutionsDropdown, setInstitutionsDropdown] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ fullName?: string; email?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aias_user");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      {/* 1. Top Institutional Utility Strip (Visible on tablet & desktop) */}
      <div className="bg-navy-950 text-slate-300 text-xs py-2 border-b border-white/10 hidden md:block">
        <div className="academic-container flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-red-700 text-white font-black px-2 py-0.5 rounded-xs text-[10px] uppercase tracking-wider flex-shrink-0">
              Admissions 2026-27
            </span>
            <span className="text-slate-300 text-xs truncate">
              Direct &amp; Counseling Enrollment Open for All 4 Institutions
            </span>
            <span className="text-white/20 hidden lg:inline">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-300 text-xs flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              Burnpur Riverside Road, Asansol, WB
            </span>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href="tel:1800897334"
              className="inline-flex items-center gap-1.5 text-gold-light hover:text-white transition font-mono font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>1800 897 334</span>
            </a>
            <span className="text-white/20">|</span>
            <Link
              href="/student-credit-card"
              className="text-slate-300 hover:text-gold transition font-medium"
            >
              WBSCC Desk
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="academic-container flex items-center justify-between h-14 sm:h-16 lg:h-20 gap-2 sm:gap-3">
          
          {/* Institutional Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0 min-w-0"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11 flex-shrink-0">
              <Image
                src="/AIAS LOGO PNG.png"
                alt="Asansol Institute of Allied Sciences Crest"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 32px, (max-width: 1024px) 36px, 44px"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              {/* Show short name on small phones, full name on sm+ */}
              <div className="font-brand font-bold text-navy leading-tight group-hover:text-navy-700 transition hidden sm:block text-xs lg:text-sm xl:text-base tracking-normal truncate max-w-[200px] lg:max-w-none">
                ASANSOL INSTITUTE OF ALLIED SCIENCES
              </div>
              <div className="font-brand font-bold text-navy leading-tight group-hover:text-navy-700 transition sm:hidden text-[10px] tracking-normal">
                AIAS
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold text-forest uppercase tracking-wider flex items-center gap-1 truncate">
                <span>ESTD: 2026</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 hidden xs:inline">Allied Sciences</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (xl and up) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 flex-shrink-0">
            <Link
              href="/about"
              className="text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition py-2"
            >
              About
            </Link>

            {/* Institutions Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setInstitutionsDropdown(true)}
              onMouseLeave={() => setInstitutionsDropdown(false)}
            >
              <Link
                href="/institutions"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition"
              >
                <span>Institutions</span>
                <ChevronDown className="w-3.5 h-3.5 transition group-hover:rotate-180" />
              </Link>

              {institutionsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 shadow-xl rounded-xs p-2 z-50">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    The 4 Partner Institutions
                  </div>
                  {INSTITUTIONS_DATA.map((inst) => (
                    <Link
                      key={inst.slug}
                      href={`/institutions/${inst.slug}`}
                      className="block p-2.5 hover:bg-ivory transition rounded-xs group/item"
                    >
                      <div className="text-xs font-bold text-navy group-hover/item:text-gold-dark">
                        {inst.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {inst.shortDescription}
                      </div>
                    </Link>
                  ))}
                  <div className="pt-1.5 mt-1 border-t border-slate-100 text-center">
                    <Link
                      href="/institutions"
                      className="text-[11px] font-bold text-navy hover:text-gold-dark"
                    >
                      View All 4 Institutions →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Courses Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setCoursesDropdown(true)}
              onMouseLeave={() => setCoursesDropdown(false)}
            >
              <Link
                href="/courses"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition"
              >
                <span>Courses</span>
                <ChevronDown className="w-3.5 h-3.5 transition group-hover:rotate-180" />
              </Link>

              {coursesDropdown && (
                <div className="absolute top-full left-0 w-96 bg-white border border-slate-200 shadow-xl rounded-xs p-2 z-50">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b border-slate-100">
                    Programs &amp; Diplomas
                  </div>
                  <div className="grid grid-cols-1 gap-1 max-h-80 overflow-y-auto p-1">
                    {COURSES_DATA.map((course) => (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        className="p-2 hover:bg-ivory transition rounded-xs group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-navy group-hover/item:text-gold-dark">
                            {course.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-xs">
                            {course.duration}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {course.institutionName}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 mt-1 border-t border-slate-100 text-center">
                    <Link
                      href="/courses"
                      className="text-[11px] font-bold text-navy hover:text-gold-dark"
                    >
                      Explore All Programmes &amp; Eligibility →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/admissions"
              className="text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition py-2"
            >
              Admissions
            </Link>

            <Link
              href="/student-credit-card"
              className="text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition py-2"
            >
              WBSCC &amp; Aid
            </Link>

            <Link
              href="/placement"
              className="text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition py-2"
            >
              Placements
            </Link>

            <Link
              href="/contact"
              className="text-xs font-bold uppercase tracking-wider text-navy-800 hover:text-gold-dark transition py-2"
            >
              Contact
            </Link>
          </nav>

          {/* Header Action CTA (Uniform height & alignment across desktop, tablet, and mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Student Login Button on Front */}
            {currentUser ? (
              <Link
                href="/portal"
                className="btn btn-outline-navy text-xs h-9 sm:h-10 px-2 sm:px-3.5 flex-shrink-0 whitespace-nowrap"
                title="Go to Student Portal"
              >
                <User className="w-3.5 h-3.5 text-navy" />
                <span className="hidden sm:inline">My Portal</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn btn-outline-navy text-xs h-9 sm:h-10 px-2 sm:px-3.5 flex-shrink-0 whitespace-nowrap"
                title="Student Login / Register"
              >
                <LogIn className="w-3.5 h-3.5 text-navy" />
                <span className="hidden xs:inline">Login</span>
              </Link>
            )}

            <Link
              href="/admissions"
              className="btn btn-primary text-[11px] sm:text-xs h-9 sm:h-10 px-2.5 sm:px-4 flex-shrink-0 whitespace-nowrap"
            >
              <span className="hidden xs:inline">Apply for 2026</span>
              <span className="xs:hidden">Apply</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </Link>

            {/* Mobile/Tablet Menu Toggle (Uniform height matching CTA button) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden h-9 w-9 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-xs border border-slate-300 text-navy hover:bg-slate-100 transition flex-shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b-2 border-slate-200 px-4 sm:px-6 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Quick Helpline Strip in Drawer */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xs flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Admissions Helpline:
              </span>
              <a
                href="tel:1800897334"
                className="font-mono font-bold text-navy text-xs inline-flex items-center gap-1.5 hover:text-gold-dark"
              >
                <Phone className="w-3.5 h-3.5 text-gold-dark" />
                <span>1800 897 334</span>
              </a>
            </div>

            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Home Overview</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-gold-dark py-2.5 border-b border-slate-100 flex items-center justify-between bg-gold/5 px-2 rounded-xs"
              >
                <span className="flex items-center gap-2">
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Student Login / Account Registration</span>
                </span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>About the Group</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/institutions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>The 4 Institutions</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              
              {/* Institution Sublinks */}
              <div className="pl-3 space-y-1 py-1.5 bg-slate-50 rounded-xs mb-1">
                {INSTITUTIONS_DATA.map((inst) => (
                  <Link
                    key={inst.slug}
                    href={`/institutions/${inst.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs text-slate-700 hover:text-navy font-semibold py-1.5"
                  >
                    • {inst.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Programmes &amp; Diplomas</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              
              {/* Courses Sublinks */}
              <div className="pl-3 space-y-1 py-1.5 bg-slate-50 rounded-xs mb-1">
                {COURSES_DATA.map((course) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs text-slate-700 hover:text-navy font-semibold py-1.5"
                  >
                    • {course.name} ({course.duration})
                  </Link>
                ))}
              </div>

              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Admissions 2026-27 Desk</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/student-credit-card"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>WBSCC Student Credit Card</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/scholarships"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Scholarships Desk</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/placement"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Placement Assistance Wing</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/facilities"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Campus &amp; Facilities</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-navy py-2.5 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Contact &amp; Helplines Directory</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>
            </nav>

            {/* Mobile Action Buttons (Full width with aligned height) */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <Link
                href={currentUser ? "/portal" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline-navy w-full text-xs h-11 justify-center"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{currentUser ? "My Portal" : "Login"}</span>
              </Link>
              <Link
                href="/admissions"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full text-xs h-11 justify-center"
              >
                <span>Apply for 2026</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="tel:1800897334"
                className="btn btn-phone w-full text-xs h-11 justify-center"
              >
                <Phone className="w-3.5 h-3.5 text-navy-800" />
                <span>1800 897 334</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. Official University Collaboration Banner (PDF Page 1 Source Material) */}
      <div id="collaboration" className="bg-navy-950 text-white border-b-2 border-gold py-1.5 px-3">
        <div className="academic-container flex flex-col xs:flex-row items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 text-center xs:text-left">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
            <Image
              src="/images/dhwu-mccis.svg"
              alt="Diamond Harbour Women's University &amp; MCCIS Seal"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-xs sm:text-sm leading-snug">
            <span className="text-gold-light font-black uppercase tracking-wider text-[10px] sm:text-[11px] block sm:inline mr-2">
              Academic Collaboration:
            </span>
            <span className="text-slate-100 text-xs sm:text-sm">
              Courses are conducted by AIAS in collaboration with{" "}
              <strong className="text-white font-black">
                THE MARIE CURIE CENTRE FOR INTERDISCIPLINARY SCIENCES (MCCIS)
              </strong>
            </span>
            <span className="hidden md:inline mx-2 text-gold">•</span>
            <span className="text-sky-300 font-semibold text-xs sm:text-sm block md:inline">
              ডায়মন্ড হারবার মহিলা বিশ্ববিদ্যালয় • Diamond Harbour Women’s University
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
