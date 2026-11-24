"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Edit3,
  Save,
  X,
  CheckCircle2,
  CreditCard,
  Building2,
  ExternalLink,
  Plus,
} from "lucide-react";
import { COURSES_DATA, CourseData, INSTITUTIONS_DATA } from "@/lib/data/portalData";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseData[]>([...COURSES_DATA]);
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleEditClick = (course: CourseData) => {
    setEditingCourse({ ...course });
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    setCourses((prev) =>
      prev.map((c) => (c.id === editingCourse.id ? { ...editingCourse } : c))
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setEditingCourse(null);
      setSaveSuccess(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-navy">
            Academic Courses &amp; Diplomas
          </h1>
          <p className="text-xs text-slate-500">
            Manage course durations, eligibility requirements, syllabus modules, and financial aid flags.
          </p>
        </div>

        <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xs font-semibold text-slate-600">
          Total 7 Flagship Programmes
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xs border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Course Name &amp; Code</th>
                <th className="p-3.5">Institution</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Eligibility</th>
                <th className="p-3.5">Aid Flags</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {courses.map((course) => (
                <tr key={course.slug} className="hover:bg-slate-50 transition">
                  <td className="p-3.5">
                    <div className="font-heading font-bold text-navy text-sm">
                      {course.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Code: {course.code}
                    </div>
                  </td>

                  <td className="p-3.5 font-semibold text-slate-600">
                    {course.institutionName}
                  </td>

                  <td className="p-3.5 font-mono font-bold text-navy">
                    {course.duration}
                  </td>

                  <td className="p-3.5 max-w-xs text-slate-600 truncate" title={course.eligibility}>
                    {course.eligibility}
                  </td>

                  <td className="p-3.5 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {course.hasPlacementAssistance && (
                        <span className="text-[10px] text-forest font-bold">
                          ✓ 100% Placement
                        </span>
                      )}
                      {course.isCreditCardEligible && (
                        <span className="text-[10px] text-navy font-bold">
                          ✓ WBSCC Loan
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        target="_blank"
                        className="btn btn-outline-navy text-[11px] py-1 px-2.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => handleEditClick(course)}
                        className="btn btn-primary text-[11px] py-1 px-2.5 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-navy-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xs border-2 border-navy max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-black text-lg text-navy">
                Edit Course: {editingCourse.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="text-slate-400 hover:text-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Course details saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Course Name:
                </label>
                <input
                  type="text"
                  value={editingCourse.name}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Duration:
                  </label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        duration: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                    Course Code:
                  </label>
                  <input
                    type="text"
                    value={editingCourse.code}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        code: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Eligibility Criteria:
                </label>
                <textarea
                  rows={2}
                  value={editingCourse.eligibility}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      eligibility: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-navy mb-1">
                  Course Description:
                </label>
                <textarea
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-navy">
                  <input
                    type="checkbox"
                    checked={editingCourse.isCreditCardEligible}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        isCreditCardEligible: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded-xs text-navy"
                  />
                  <span>WBSCC Loan Eligible</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-navy">
                  <input
                    type="checkbox"
                    checked={editingCourse.hasPlacementAssistance}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        hasPlacementAssistance: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded-xs text-navy"
                  />
                  <span>100% Placement Assistance</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="btn btn-outline-navy text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-gold text-xs py-2 px-4 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Course Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
