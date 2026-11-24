"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Filter,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { NOTICES_DATA, INSTITUTIONS_DATA } from "@/lib/data/portalData";

export default function NewsNoticesPage() {
  const [selectedInst, setSelectedInst] = useState<string>("all");
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const filteredNotices = NOTICES_DATA.filter((n) => {
    if (selectedInst === "all") return true;
    return n.institutionSlug === selectedInst || n.institutionSlug === "all";
  });

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Official Institutional Circulars
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              News, Notices &amp; Announcements
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Official announcements regarding admissions schedules, counseling dates, examination circulars, and university collaboration updates.
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
          <span className="text-navy font-bold">News &amp; Notices</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="academic-container space-y-8">
          
          {/* Filter Bar */}
          <div className="bg-ivory p-4 rounded-xs border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-gold-dark" />
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Filter by Institution:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedInst("all")}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border transition ${
                  selectedInst === "all"
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy-800 border-slate-300 hover:bg-slate-100"
                }`}
              >
                All Notices
              </button>
              {INSTITUTIONS_DATA.map((i) => (
                <button
                  key={i.slug}
                  onClick={() => setSelectedInst(i.slug)}
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border transition ${
                    selectedInst === i.slug
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-navy-800 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {i.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Notices List */}
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-ivory p-6 rounded-xs border-2 border-slate-300 hover:border-navy transition space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-gold text-navy-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
                      {notice.category}
                    </span>
                    {notice.priority === "HIGH" && (
                      <span className="bg-red-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
                        Important
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{notice.date}</span>
                  </div>
                </div>

                <h3 className="font-heading font-black text-lg text-navy">
                  {notice.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {notice.content}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Target:{" "}
                    {notice.institutionSlug === "all"
                      ? "All Institutions"
                      : INSTITUTIONS_DATA.find((i) => i.slug === notice.institutionSlug)?.name}
                  </span>
                  <Link
                    href="/admissions"
                    className="btn btn-outline-navy btn-sm text-[11px] justify-center sm:w-auto w-full"
                  >
                    Contact Admissions
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
