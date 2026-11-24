"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Edit3,
  Save,
  X,
  ExternalLink,
} from "lucide-react";
import { INSTITUTIONS_DATA, InstitutionData, COURSES_DATA } from "@/lib/data/portalData";

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] = useState<InstitutionData[]>([...INSTITUTIONS_DATA]);
  const [editingInst, setEditingInst] = useState<InstitutionData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEditClick = (inst: InstitutionData) => {
    setEditingInst({ ...inst });
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInst) return;

    setInstitutions((prev) =>
      prev.map((i) => (i.id === editingInst.id ? { ...editingInst } : i))
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setEditingInst(null);
      setSaveSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy">
            The 4 Partner Institutions
          </h1>
          <p className="text-xs text-slate-500">
            Manage contact details, official affiliations, recognitions, and visual themes.
          </p>
        </div>

        <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xs font-semibold text-slate-600">
          Source: &ldquo;AIAS P1.pdf&rdquo; Institutional Brochure
        </div>
      </div>

      {/* Institutions Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {institutions.map((inst) => {
          const coursesCount = COURSES_DATA.filter((c) => c.institutionSlug === inst.slug).length;

          return (
            <div
              key={inst.id}
              className="bg-white rounded-xs border border-slate-200 shadow-xs p-6 space-y-4 hover:border-navy transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-navy text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
                    {inst.theme.badgeText}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    Code: {inst.code}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0 border border-slate-200 rounded-xs bg-slate-50 p-1">
                    <Image
                      src={inst.logo}
                      alt={inst.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-navy leading-tight">
                      {inst.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {inst.shortDescription}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xs border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div>
                    <strong className="text-navy text-[11px] uppercase block">Affiliation:</strong>
                    <span>{inst.affiliation}</span>
                  </div>
                  <div>
                    <strong className="text-navy text-[11px] uppercase block">Recognitions:</strong>
                    <span>{inst.recognitions}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-navy" />
                    <span className="font-mono font-bold">{inst.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-navy" />
                    <span>{inst.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-navy flex-shrink-0" />
                    <span className="truncate">{inst.address}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">
                  {coursesCount} Active Programmes
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/institutions/${inst.slug}`}
                    target="_blank"
                    className="btn btn-outline-navy text-[11px] py-1.5 px-3 flex items-center gap-1"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>

                  <button
                    onClick={() => handleEditClick(inst)}
                    className="btn btn-primary text-[11px] py-1.5 px-3 flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Institution Modal */}
      {editingInst && (
        <div className="fixed inset-0 bg-navy-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xs border-2 border-navy max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-black text-lg text-navy">
                Edit {editingInst.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingInst(null)}
                className="text-slate-400 hover:text-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Institution details saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Full Institution Name:
                </label>
                <input
                  type="text"
                  value={editingInst.name}
                  onChange={(e) =>
                    setEditingInst({ ...editingInst, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Primary Phone / Toll Free:
                  </label>
                  <input
                    type="text"
                    value={editingInst.phone}
                    onChange={(e) =>
                      setEditingInst({ ...editingInst, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Alt Phone / Brochure Variation:
                  </label>
                  <input
                    type="text"
                    value={editingInst.altPhone || ""}
                    onChange={(e) =>
                      setEditingInst({
                        ...editingInst,
                        altPhone: e.target.value || undefined,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Official Email:
                </label>
                <input
                  type="email"
                  value={editingInst.email}
                  onChange={(e) =>
                    setEditingInst({ ...editingInst, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Official Affiliation / Collaboration:
                </label>
                <input
                  type="text"
                  value={editingInst.affiliation}
                  onChange={(e) =>
                    setEditingInst({
                      ...editingInst,
                      affiliation: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Statutory Recognitions:
                </label>
                <input
                  type="text"
                  value={editingInst.recognitions}
                  onChange={(e) =>
                    setEditingInst({
                      ...editingInst,
                      recognitions: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Campus Address:
                </label>
                <input
                  type="text"
                  value={editingInst.address}
                  onChange={(e) =>
                    setEditingInst({ ...editingInst, address: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingInst(null)}
                  className="btn btn-outline-navy text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
