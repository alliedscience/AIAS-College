"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enquirySchema,
  type EnquiryFormInput,
  type EnquiryFormValues,
} from "@/lib/validations/enquiry";
import { CheckCircle2, Send, PhoneCall, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { INSTITUTIONS_DATA, COURSES_DATA } from "@/lib/data/portalData";

export function AdmissionEnquiryForm({
  defaultInstitution,
  defaultCourse,
}: {
  defaultInstitution?: string;
  defaultCourse?: string;
}) {
  const initialInst = defaultInstitution || "aias";
  const [selectedInst, setSelectedInst] = useState(initialInst);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const initialCourses = COURSES_DATA.filter((c) => c.institutionSlug === initialInst);
  const initialCourseSlug = defaultCourse || (initialCourses[0]?.slug ?? "medical-laboratory-technology");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormInput, unknown, EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      institutionId: initialInst,
      courseId: initialCourseSlug,
      wbsccInterest: true,
      consent: true,
    },
  });

  const availableCourses = COURSES_DATA.filter((c) => c.institutionSlug === selectedInst);

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInst = e.target.value;
    setSelectedInst(newInst);
    setValue("institutionId", newInst);
    const instCourses = COURSES_DATA.filter((c) => c.institutionSlug === newInst);
    if (instCourses.length > 0) {
      setValue("courseId", instCourses[0].slug);
    }
  };

  const onSubmit = async (data: EnquiryFormValues) => {
    setErrorMessage("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || "Failed to submit enquiry.");
      }

      setRefNumber(resData.enquiryNumber);
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to submit your enquiry. Please try again."
      );
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-sm border-2 border-navy shadow-card text-center">
        <div className="w-14 h-14 bg-forest-50 text-forest rounded-sm mx-auto flex items-center justify-center mb-4 border border-forest/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-heading font-black text-navy text-xl mb-1">
          Admission Enquiry Registered
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Your admission consultation docket has been prioritized for the 2026 academic batch.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xs mb-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Official Reference Number
          </span>
          <span className="font-mono font-black text-base text-navy tracking-wider">
            {refNumber}
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          An admissions officer will contact your registered phone number to guide you through eligibility, scholarship processing, and seat confirmation.
        </p>

        <div className="space-y-2">
          <a
            href="tel:1800897334"
            className="btn btn-outline-navy w-full text-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Admissions Desk: 1800 897 334</span>
          </a>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-slate-500 hover:text-navy underline block mx-auto pt-2"
          >
            Submit Another Admission Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm border-2 border-navy shadow-card overflow-hidden">
      {/* Form Header */}
      <div className="bg-navy p-5 text-white border-b-2 border-gold">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-gold-light uppercase tracking-wider">
            Admissions Desk 2026
          </span>
          <span className="bg-forest text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
            Seats Open
          </span>
        </div>
        <h3 className="font-heading font-black text-xl text-white mt-1">
          Direct Admission &amp; Counseling Enrollment
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          Apply online for Diploma, B.Ed, Nursing, and D.El.Ed programs across all 4 institutions.
        </p>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-6 space-y-4">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Candidate Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
            Full Name of Candidate <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Sourav Mukherjee"
            {...register("studentName")}
            className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
          />
          {errors.studentName && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">
              {errors.studentName.message}
            </p>
          )}
        </div>

        {/* Contact Numbers: Mobile & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              10-Digit Mobile <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 9832000000"
              maxLength={10}
              {...register("phone")}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-mono transition"
            />
            {errors.phone && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
            />
            {errors.email && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Institution & Course Selectors */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Select Institution <span className="text-red-600">*</span>
            </label>
            <select
              value={selectedInst}
              onChange={handleInstitutionChange}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold transition"
            >
              {INSTITUTIONS_DATA.map((inst) => (
                <option key={inst.slug} value={inst.slug}>
                  {inst.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Select Course / Programme <span className="text-red-600">*</span>
            </label>
            <select
              {...register("courseId")}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy font-semibold transition"
            >
              {availableCourses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.duration})
                </option>
              ))}
            </select>
            {errors.courseId && (
              <p className="text-[11px] text-red-600 font-semibold mt-1">
                {errors.courseId.message}
              </p>
            )}
          </div>
        </div>

        {/* Qualification & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Highest Qualification
            </label>
            <select
              {...register("highestQualification")}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
            >
              <option value="10th / Madhyamik Appearing/Passed">10th / Madhyamik</option>
              <option value="10+2 Higher Secondary Science">10+2 Science (PCB/PCM)</option>
              <option value="10+2 Higher Secondary Arts/Commerce">10+2 Arts / Commerce</option>
              <option value="Graduation (B.A / B.Sc / B.Com / B.Tech)">Graduation (B.A / B.Sc / B.Com)</option>
              <option value="Post-Graduation (M.A / M.Sc / M.Com)">Post-Graduation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1">
              Town / City
            </label>
            <input
              type="text"
              placeholder="e.g. Asansol / Raniganj"
              {...register("city")}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-xs focus:bg-white focus:outline-none focus:border-navy text-navy transition"
            />
          </div>
        </div>

        {/* WBSCC / Scholarship Checkbox */}
        <div className="bg-ivory border border-gold/30 p-3 rounded-xs space-y-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("wbsccInterest")}
              className="mt-0.5 w-4 h-4 rounded-xs text-navy border-slate-400 focus:ring-0"
            />
            <span className="text-xs text-navy font-semibold leading-tight">
              I am interested in West Bengal Student Credit Card (WBSCC) / Scholarship guidance up to ₹10 Lakhs.
            </span>
          </label>
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("consent")}
              className="mt-0.5 w-4 h-4 rounded-xs text-navy border-slate-400 focus:ring-0"
            />
            <span className="text-[11px] text-slate-500 leading-tight">
              I authorize the admissions desk of AIAS and associated institutions to contact me via Call/SMS/WhatsApp regarding course admissions and eligibility.
            </span>
          </label>
          {errors.consent && (
            <p className="text-[11px] text-red-600 font-semibold mt-1">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-gold w-full text-xs py-3 justify-center shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Registering Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Admission Enquiry for 2026</span>
            </>
          )}
        </button>

        {/* Security & Verification Marker */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest" />
          <span>Official Institutional Enrollment Portal • Free Counseling Support</span>
        </div>
      </form>
    </div>
  );
}
