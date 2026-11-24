import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Inbox,
  Bell,
  Users,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-navy-950 text-white border-b border-navy-800 h-16 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/AIAS LOGO PNG.png"
                alt="AIAS Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-sm tracking-wide text-white block leading-tight">
                AIAS EDUCATION PORTAL
              </span>
              <span className="text-[10px] text-gold-light uppercase tracking-widest font-bold">
                Centralized Administration
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-sm border border-white/10 hover:border-white/20 transition"
          >
            <span>Live Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 text-xs font-medium">Super Admin</span>
          </div>
        </div>
      </header>

      {/* Admin Shell: Sidebar + Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 space-y-6 hidden md:block">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
              Core Management
            </span>
            <nav className="space-y-1">
              <Link
                href="/admin"
                className="flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xs text-navy bg-slate-100 border-l-2 border-navy"
              >
                <LayoutDashboard className="w-4 h-4 text-navy" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/admin/institutions"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>The 4 Institutions</span>
              </Link>

              <Link
                href="/admin/courses"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Academic Courses</span>
              </Link>

              <Link
                href="/admin/enquiries"
                className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4 text-slate-500" />
                  <span>Admission Inquiries</span>
                </div>
                <span className="bg-red-100 text-red-700 font-bold text-[10px] px-1.5 py-0.2 rounded-xs">
                  New
                </span>
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
              Content &amp; Media
            </span>
            <nav className="space-y-1">
              <Link
                href="/admin/notices"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Notices &amp; Circulars</span>
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-2">
              System &amp; Roles
            </span>
            <nav className="space-y-1">
              <Link
                href="/admin/users"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <Users className="w-4 h-4 text-slate-500" />
                <span>Admin Users &amp; RBAC</span>
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-xs text-slate-700 hover:bg-slate-50 hover:text-navy transition"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Portal Settings</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Dynamic Main Workspace */}
        <main className="flex-grow p-6 sm:p-8 max-w-7xl">{children}</main>
      </div>
    </div>
  );
}
