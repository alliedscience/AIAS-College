"use client";

import React, { useState } from "react";
import {
  Bell,
  Calendar,
  Plus,
  Save,
  CheckCircle2,
  Trash2,
  AlertCircle,
  X,
} from "lucide-react";
import { NOTICES_DATA, INSTITUTIONS_DATA } from "@/lib/data/portalData";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([...NOTICES_DATA]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("ADMISSION");
  const [newInst, setNewInst] = useState("all");
  const [newPriority, setNewPriority] = useState("MEDIUM");
  const [newContent, setNewContent] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const noticeObj = {
      id: `not-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      institutionSlug: newInst,
      date: new Date().toISOString().split("T")[0],
      priority: newPriority,
      summary: newTitle,
      content: newContent,
    };

    setNotices([noticeObj, ...notices]);
    setSuccessMsg("Notice published successfully to public portal!");
    setNewTitle("");
    setNewContent("");
    setTimeout(() => {
      setIsAdding(false);
      setSuccessMsg("");
    }, 1200);
  };

  const handleDelete = (id: string) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy">
            Institutional Notices &amp; Circulars
          </h1>
          <p className="text-xs text-slate-500">
            Publish and manage public announcements across all 4 institutions.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Add Notice Modal */}
      {isAdding && (
        <div className="fixed inset-0 bg-navy-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xs border-2 border-navy max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-black text-lg text-navy">
                Publish Official Notice
              </h3>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-slate-400 hover:text-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Notice Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Schedule of Counseling for 2026 Diploma Batches"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Category:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy"
                  >
                    <option value="ADMISSION">Admission</option>
                    <option value="ACADEMIC">Academic</option>
                    <option value="SCHOLARSHIP">Scholarship</option>
                    <option value="EXAMINATION">Examination</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Target Institution:
                  </label>
                  <select
                    value={newInst}
                    onChange={(e) => setNewInst(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy"
                  >
                    <option value="all">All Institutions</option>
                    {INSTITUTIONS_DATA.map((i) => (
                      <option key={i.slug} value={i.slug}>
                        {i.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Priority:
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy"
                  >
                    <option value="HIGH">High (Urgent)</option>
                    <option value="MEDIUM">Standard</option>
                    <option value="LOW">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Full Announcement Content:
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter detailed notice description, instructions, and dates..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="btn btn-outline-navy text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white p-5 rounded-xs border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-navy transition"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-gold text-navy-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                  {notice.category}
                </span>
                {notice.priority === "HIGH" && (
                  <span className="bg-red-700 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                    HIGH PRIORITY
                  </span>
                )}
                <span className="text-xs text-slate-400 font-mono">
                  {notice.date}
                </span>
              </div>

              <h3 className="font-heading font-black text-base text-navy">
                {notice.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {notice.content}
              </p>

              <div className="text-[11px] font-bold text-slate-400 uppercase">
                Target:{" "}
                {notice.institutionSlug === "all"
                  ? "All 4 Institutions"
                  : INSTITUTIONS_DATA.find((i) => i.slug === notice.institutionSlug)?.name}
              </div>
            </div>

            <button
              onClick={() => handleDelete(notice.id)}
              className="text-slate-400 hover:text-red-600 transition p-1.5 self-start sm:self-auto"
              title="Delete Notice"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
