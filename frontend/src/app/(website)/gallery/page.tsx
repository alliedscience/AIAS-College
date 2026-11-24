import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Camera, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Campus & Laboratories Gallery | AIAS Asansol Group",
  description:
    "Photo gallery of campus infrastructure, diagnostic pathology laboratories, agricultural greenhouse units, and nursing facilities at AIAS Asansol.",
};

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "Clinical Pathology & Hematology Suite",
      category: "Paramedical Diagnostic Labs",
      caption: "High-precision laboratory analyzers and microscope stations for DMLT students.",
      image: "/images/dmlt.svg",
    },
    {
      title: "Greenhouse & Experimental Farming Plot",
      category: "Agricultural Technologies",
      caption: "Demonstration plots for soil health, hydroponics, and crop protection studies.",
      image: "/images/agriculture.svg",
    },
    {
      title: "Animal Healthcare Demonstration Unit",
      category: "Veterinary Sciences",
      caption: "Dedicated simulation space for small animal examination and clinical assistance.",
      image: "/images/veterinary.svg",
    },
    {
      title: "Central Academic Block & Campus Grounds",
      category: "Campus Infrastructure",
      caption: "Burnpur Riverside Road, Asansol central institutional building.",
      image: "/images/campus-hero.svg",
    },
    {
      title: "Teacher Training & Micro-Teaching Hall",
      category: "Teacher Education",
      caption: "Pedagogical demonstration and classroom simulation at Bijoy Pal Memorial B.Ed College.",
      image: "/images/bpm-bed-logo.svg",
    },
    {
      title: "Clinical Nursing Simulation Laboratory",
      category: "Nursing Academy",
      caption: "Pre-clinical anatomical simulation and bedside patient care practice units.",
      image: "/images/pnd-nursing-logo.svg",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[11px] font-extrabold uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Visual Campus Tour
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Campus, Laboratories &amp; Facilities Gallery
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Explore the educational infrastructure, modern diagnostic laboratories, and academic facilities across our four institutions in Asansol.
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
          <span className="text-navy font-bold">Gallery</span>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="academic-container space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-ivory border-2 border-slate-300 rounded-xs overflow-hidden flex flex-col justify-between hover:border-navy transition group"
              >
                <div className="relative h-56 bg-slate-100 flex items-center justify-center p-6 border-b border-slate-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-navy text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-xs tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-heading font-black text-base text-navy group-hover:text-gold-dark transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Verification note */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xs text-xs text-slate-600 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-gold-dark flex-shrink-0" />
            <span>
              <strong>Note on Institutional Assets:</strong> Original authentic high-resolution on-site photographs will be uploaded via the Central Admin Media Manager upon final client photographic review.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
