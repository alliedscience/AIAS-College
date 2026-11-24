"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Filter,
  Search,
  Download,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  RefreshCw,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";
import { StoredEnquiry } from "@/types";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [instFilter, setInstFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(
    null
  );
  const [updateStatus, setUpdateStatus] = useState<StoredEnquiry["status"]>("NEW");
  const [statusNote, setStatusNote] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");

  const loadEnquiries = async () => {
    const res = await fetch("/api/enquiries");
    return res.json();
  };

  const fetchEnquiries = async () => {
    try {
      const data = await loadEnquiries();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
        if (data.enquiries.length > 0 && !selectedEnquiry) {
          setSelectedEnquiry(data.enquiries[0]);
          setUpdateStatus(data.enquiries[0].status);
        }
      }
    } catch (e) {
      console.error("Failed to load enquiries:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    loadEnquiries()
      .then((data) => {
        if (!active) return;
        if (data.success && data.enquiries) {
          setEnquiries(data.enquiries);
          if (data.enquiries.length > 0) {
            setSelectedEnquiry(data.enquiries[0]);
            setUpdateStatus(data.enquiries[0].status);
          }
        }
      })
      .catch((e) => {
        console.error("Failed to load enquiries:", e);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSelectEnquiry = (enq: StoredEnquiry) => {
    setSelectedEnquiry(enq);
    setUpdateStatus(enq.status);
    setStatusNote("");
    setActionSuccess("");
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    setSavingStatus(true);
    setActionSuccess("");
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: updateStatus,
          note: statusNote || undefined,
        }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setActionSuccess(`Status updated to ${updateStatus}`);
        setStatusNote("");
        fetchEnquiries();
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setSavingStatus(false);
    }
  };

  // Export filtered enquiries to CSV
  const handleExportCSV = () => {
    const headers = [
      "Enquiry Number",
      "Date",
      "Candidate Name",
      "Phone",
      "Email",
      "Institution",
      "Course",
      "City",
      "State",
      "Status",
      "Notes",
    ];

    const rows = filteredEnquiries.map((e) => [
      e.enquiryNumber,
      new Date(e.createdAt).toLocaleDateString(),
      `"${e.candidateName.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ""}"`,
      `"${e.institutionName.replace(/"/g, '""')}"`,
      `"${e.courseName.replace(/"/g, '""')}"`,
      `"${e.city || ""}"`,
      `"${e.state || ""}"`,
      e.status,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `AIAS_Enquiries_Export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    if (statusFilter !== "ALL" && e.status !== statusFilter) return false;
    if (instFilter !== "ALL" && e.institutionSlug !== instFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.candidateName.toLowerCase().includes(q) ||
        e.enquiryNumber.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getStatusBadge = (status: StoredEnquiry["status"]) => {
    switch (status) {
      case "NEW":
        return (
          <span className="bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
            NEW
          </span>
        );
      case "CONTACTED":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
            CONTACTED
          </span>
        );
      case "IN_REVIEW":
        return (
          <span className="bg-purple-100 text-purple-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
            IN REVIEW
          </span>
        );
      case "ADMITTED":
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
            ADMITTED
          </span>
        );
      case "CLOSED":
        return (
          <span className="bg-slate-100 text-slate-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
            CLOSED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy">
            Admissions Enquiries CRM
          </h1>
          <p className="text-xs text-slate-500">
            Real-time candidate enquiries from homepage, course pages, and admissions forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEnquiries}
            className="btn btn-outline-navy text-xs py-2 px-3 flex items-center gap-1.5"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="btn btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({filteredEnquiries.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search candidate name, phone, ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New Enquiries</option>
              <option value="CONTACTED">Contacted</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="ADMITTED">Admitted</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Institution:</span>
            <select
              value={instFilter}
              onChange={(e) => setInstFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xs text-navy font-semibold focus:outline-none focus:border-navy"
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
      </div>

      {/* Main CRM Grid: List + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Enquiries Table / List */}
        <div className="lg:col-span-7 bg-white rounded-xs border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Enquiry Records ({filteredEnquiries.length})</span>
            <span className="text-[11px] font-mono text-slate-400">Click row to view &amp; update</span>
          </div>

          {filteredEnquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No admission enquiries match the selected filters.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[650px] overflow-y-auto">
              {filteredEnquiries.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                return (
                  <div
                    key={enq.id}
                    onClick={() => handleSelectEnquiry(enq)}
                    className={`p-3.5 cursor-pointer transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-slate-100 border-l-4 border-navy"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-navy">
                          {enq.candidateName}
                        </span>
                        {getStatusBadge(enq.status)}
                      </div>

                      <div className="text-xs text-slate-600 font-medium">
                        {enq.courseName}
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span className="font-mono text-slate-500 font-bold">
                          {enq.phone}
                        </span>
                        <span>•</span>
                        <span>{enq.city}, {enq.state}</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-xs">
                        {enq.enquiryNumber}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Selected Enquiry Detail & Status Action Console */}
        <div className="lg:col-span-5 bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-6 sticky top-20">
          {selectedEnquiry ? (
            <>
              {/* Header */}
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-xs">
                    {selectedEnquiry.enquiryNumber}
                  </span>
                  <h3 className="font-heading font-black text-lg text-navy mt-1">
                    {selectedEnquiry.candidateName}
                  </h3>
                </div>
                <div>{getStatusBadge(selectedEnquiry.status)}</div>
              </div>

              {/* Action Success Alert */}
              {actionSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-2.5 rounded-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{actionSuccess}</span>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xs border border-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-navy" />
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-mono font-bold text-navy hover:underline"
                  >
                    +91 {selectedEnquiry.phone}
                  </a>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-navy" />
                    <span>{selectedEnquiry.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-navy" />
                  <span>{selectedEnquiry.city}, {selectedEnquiry.state}</span>
                </div>
              </div>

              {/* Academic Program Selected */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Academic Program Applied:
                </span>
                <div className="font-heading font-bold text-navy text-sm">
                  {selectedEnquiry.courseName}
                </div>
                <div className="text-slate-500 font-semibold text-[11px]">
                  {selectedEnquiry.institutionName}
                </div>
                <div className="text-slate-600 pt-1">
                  <strong>Qualification:</strong> {selectedEnquiry.qualification}
                </div>
              </div>

              {/* Candidate Notes */}
              {selectedEnquiry.notes && (
                <div className="space-y-1 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Candidate Inquiry / Notes:
                  </span>
                  <div className="bg-ivory p-3 rounded-xs border border-slate-200 text-slate-700 italic">
                    &ldquo;{selectedEnquiry.notes}&rdquo;
                  </div>
                </div>
              )}

              {/* Status Update Console */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <span className="text-xs font-black uppercase tracking-wider text-navy block">
                  Update Candidate CRM Status:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {(["NEW", "CONTACTED", "IN_REVIEW", "ADMITTED", "CLOSED"] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setUpdateStatus(st)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-xs border transition text-center ${
                          updateStatus === st
                            ? "bg-navy text-white border-navy"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Add Counselor Note:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Called student, confirmed 10+2 marksheet verified..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={savingStatus}
                  className="btn btn-gold w-full text-xs py-2 justify-center shadow-xs"
                >
                  {savingStatus ? "Saving Status..." : "Save Status & Activity Note"}
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              Select an enquiry from the left to view candidate details and update status.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
