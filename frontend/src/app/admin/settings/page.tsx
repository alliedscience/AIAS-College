"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Phone,
  Building2,
  Mail,
  MapPin,
  Clock,
  Loader2,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { BROCHURE_VERIFICATION_CHECKLIST } from "@/lib/data/portalData";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Live Settings State
  const [portalName, setPortalName] = useState("AIAS Education Portal");
  const [admissionsSession, setAdmissionsSession] = useState("2026-2027");
  const [admissionsActive, setAdmissionsActive] = useState(true);
  const [wbsccActive, setWbsccActive] = useState(true);
  const [wbsccLimit, setWbsccLimit] = useState("₹10 Lakhs");
  const [wbsccInterestRate, setWbsccInterestRate] = useState("4% Simple Interest");
  const [centralAddress, setCentralAddress] = useState(
    "Burnpur Riverside Road, Asansol, West Bengal, PIN - 713325"
  );
  const [centralTollFree, setCentralTollFree] = useState("1800 897 334");
  const [supportEmail, setSupportEmail] = useState("admissions@aias.edu.in");
  const [collaborationCenter, setCollaborationCenter] = useState(
    "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)"
  );
  const [collaborationUniversity, setCollaborationUniversity] = useState(
    "Diamond Harbour Women's University (ডায়মন্ড হারবার মহিলা বিশ্ববিদ্যালয়)"
  );
  const [helplineHours, setHelplineHours] = useState(
    "Monday to Saturday (9:30 AM – 5:30 PM)"
  );

  // Institution Phone Directory
  const [aiasPhone, setAiasPhone] = useState("1800 897 334");
  const [bedPhone, setBedPhone] = useState("1800 891 1734");
  const [nursingPhone, setNursingPhone] = useState("1800 890 7334");
  const [deledPhone, setDeledPhone] = useState("1800 891 1734");

  // Load existing settings from Backend API
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            const s = data.settings;
            setPortalName(s.portalName || "AIAS Education Portal");
            setAdmissionsSession(s.admissionsSession || "2026-2027");
            setAdmissionsActive(s.admissionsActive ?? true);
            setWbsccActive(s.wbsccActive ?? true);
            setWbsccLimit(s.wbsccLimit || "₹10 Lakhs");
            setWbsccInterestRate(s.wbsccInterestRate || "4% Simple Interest");
            setCentralAddress(s.centralAddress || "Burnpur Riverside Road, Asansol, WB");
            setCentralTollFree(s.centralTollFree || "1800 897 334");
            setSupportEmail(s.supportEmail || "admissions@aias.edu.in");
            setCollaborationCenter(
              s.collaborationCenter ||
                "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)"
            );
            setCollaborationUniversity(
              s.collaborationUniversity ||
                "Diamond Harbour Women's University"
            );
            setHelplineHours(s.helplineHours || "Monday to Saturday (9:30 AM – 5:30 PM)");

            if (Array.isArray(s.institutions)) {
              const aias = s.institutions.find((i: any) => i.slug === "aias");
              if (aias) setAiasPhone(aias.phone);
              const bed = s.institutions.find((i: any) => i.slug === "bijoy-pal-memorial");
              if (bed) setBedPhone(bed.phone);
              const nur = s.institutions.find((i: any) => i.slug === "pramoth-nath-das");
              if (nur) setNursingPhone(nur.phone);
              const del = s.institutions.find((i: any) => i.slug === "pn-das-academy");
              if (del) setDeledPhone(del.phone);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setErrorMsg("");

    const payload = {
      portalName,
      admissionsSession,
      admissionsActive,
      wbsccActive,
      wbsccLimit,
      wbsccInterestRate,
      centralAddress,
      centralTollFree,
      supportEmail,
      collaborationCenter,
      collaborationUniversity,
      helplineHours,
      institutions: [
        { slug: "aias", phone: aiasPhone },
        { slug: "bijoy-pal-memorial", phone: bedPhone },
        { slug: "pramoth-nath-das", phone: nursingPhone },
        { slug: "pn-das-academy", phone: deledPhone },
      ],
    };

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings on server.");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update portal settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy">
            Website Data &amp; Global System Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage institutional phone numbers, university collaboration details, WBSCC parameters, and brochure verification records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn btn-gold text-xs h-10 px-4 flex items-center gap-1.5 shadow-xs"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{saving ? "Publishing..." : "Save & Publish Changes"}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs p-4 rounded-xs flex items-center gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div>
            <strong className="block font-bold">Portal Settings Saved Successfully!</strong>
            <span className="text-emerald-700">All updated contact lines and academic session parameters are published to the live backend.</span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="bg-red-50 border border-red-300 text-red-900 text-xs p-4 rounded-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SECTION 1: GENERAL PORTAL & ADMISSION CONTROLS */}
        <div className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4">
          <h2 className="font-heading font-black text-sm text-navy border-b border-slate-200 pb-3 flex items-center gap-2">
            <Settings className="w-4 h-4 text-navy" />
            <span>General Portal &amp; Admission Session Parameters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Portal Brand Name:
              </label>
              <input
                type="text"
                value={portalName}
                onChange={(e) => setPortalName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Academic Session:
              </label>
              <input
                type="text"
                value={admissionsSession}
                onChange={(e) => setAdmissionsSession(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Helpline Working Hours:
              </label>
              <input
                type="text"
                value={helplineHours}
                onChange={(e) => setHelplineHours(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-navy select-none">
              <input
                type="checkbox"
                checked={admissionsActive}
                onChange={(e) => setAdmissionsActive(e.target.checked)}
                className="w-4 h-4 rounded-xs text-navy"
              />
              <span>Admissions Desk Active (Seats Open Badge Visible)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-navy select-none">
              <input
                type="checkbox"
                checked={wbsccActive}
                onChange={(e) => setWbsccActive(e.target.checked)}
                className="w-4 h-4 rounded-xs text-navy"
              />
              <span>WBSCC Student Credit Card Facilitation Cell Active</span>
            </label>
          </div>
        </div>

        {/* SECTION 2: CENTRAL CONTACT & TOLL-FREE HELPLINES */}
        <div className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4">
          <h2 className="font-heading font-black text-sm text-navy border-b border-slate-200 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-navy" />
            <span>Central Contact &amp; Campus Location Data</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Central Toll-Free Number:
              </label>
              <input
                type="text"
                value={centralTollFree}
                onChange={(e) => setCentralTollFree(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Central Support Email:
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Campus Location / Address:
              </label>
              <input
                type="text"
                value={centralAddress}
                onChange={(e) => setCentralAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
              />
            </div>
          </div>

          {/* 4 Partner Institutions Telephony Directory */}
          <div className="pt-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
              Individual Helplines Across the 4 Partner Institutions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  AIAS Allied Sciences:
                </span>
                <input
                  type="text"
                  value={aiasPhone}
                  onChange={(e) => setAiasPhone(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-xs text-navy font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Bijoy Pal B.Ed College:
                </span>
                <input
                  type="text"
                  value={bedPhone}
                  onChange={(e) => setBedPhone(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-xs text-navy font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Pramoth Nath Das Nursing:
                </span>
                <input
                  type="text"
                  value={nursingPhone}
                  onChange={(e) => setNursingPhone(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-xs text-navy font-mono font-bold"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  P.N. Das Academy (D.El.Ed):
                </span>
                <input
                  type="text"
                  value={deledPhone}
                  onChange={(e) => setDeledPhone(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-xs text-navy font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: UNIVERSITY COLLABORATION DATA */}
        <div className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4">
          <h2 className="font-heading font-black text-sm text-navy border-b border-slate-200 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-navy" />
            <span>Academic Collaboration Partners (Brochure Source: Page 1)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Collaborating Centre / Research Body:
              </label>
              <input
                type="text"
                value={collaborationCenter}
                onChange={(e) => setCollaborationCenter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Collaborating University (with Bengali Inscription):
              </label>
              <input
                type="text"
                value={collaborationUniversity}
                onChange={(e) => setCollaborationUniversity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: WBSCC EDUCATION LOAN PARAMETERS */}
        <div className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4">
          <h2 className="font-heading font-black text-sm text-navy border-b border-slate-200 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-navy" />
            <span>West Bengal Student Credit Card (WBSCC) Defaults</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Maximum Sanction Amount:
              </label>
              <input
                type="text"
                value={wbsccLimit}
                onChange={(e) => setWbsccLimit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-bold"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                Concessional Interest Rate:
              </label>
              <input
                type="text"
                value={wbsccInterestRate}
                onChange={(e) => setWbsccInterestRate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-gold text-xs py-3 px-6 flex items-center gap-2 shadow-md"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Publishing Updates..." : "Save & Publish Portal Data"}</span>
          </button>
        </div>

      </form>

      {/* SECTION 5: SOURCE BROCHURE VERIFICATION CHECKLIST TABLE */}
      <div className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="font-heading font-black text-base text-navy flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>Brochure Source-Data Verification Checklist</span>
            </h2>
            <p className="text-xs text-slate-500">
              Source document: &ldquo;AIAS P1.pdf&rdquo;. Preserves raw claims and telephone variations until client confirmation.
            </p>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xs overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Item / Claim</th>
                <th className="p-3">Brochure Finding</th>
                <th className="p-3">Status</th>
                <th className="p-3">Resolution Needed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {BROCHURE_VERIFICATION_CHECKLIST.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-bold text-navy whitespace-nowrap">
                    {item.item}
                  </td>
                  <td className="p-3 max-w-xs">{item.details}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600">{item.resolutionNeeded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
