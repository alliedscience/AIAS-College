import React from "react";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  BookOpen,
  Stethoscope,
  Sprout,
  GraduationCap,
  Microscope,
  Wifi,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Campus Infrastructure & Facilities | AIAS Asansol Group",
  description:
    "Explore the laboratories, central library, clinical simulation units, and smart classrooms at Burnpur Riverside Road campus in Asansol.",
};

export default function FacilitiesPage() {
  const facilitiesList = [
    {
      category: "Paramedical & Diagnostic Labs",
      title: "Clinical Pathology & Hematology Suite",
      desc: "Fully equipped with modern clinical analyzers, binocular microscopes, centrifuges, incubators, and sterile autoclaving infrastructure for real-world DMLT training.",
      features: [
        "Automated biochemistry & hematology testing units",
        "Clinical microbiology & culture incubation chambers",
        "Sterile blood sampling & phlebotomy work desks",
      ],
    },
    {
      category: "Agricultural Technologies",
      title: "Greenhouse & Soil Science Experimental Plot",
      desc: "Dedicated agricultural demonstration field and polyhouse on campus for hands-on agronomy, hydroponics, and soil nutrient profiling.",
      features: [
        "Soil chemistry testing kit & pH measurement stations",
        "Hydroponic & vertical farming prototype unit",
        "Horticulture nursery & crop protection research zone",
      ],
    },
    {
      category: "Nursing Healthcare Education",
      title: "Clinical Skills & Simulation Laboratories",
      desc: "Comprehensive pre-clinical nursing suites featuring adult, pediatric, and maternal anatomical simulators for bedside procedural mastery.",
      features: [
        "Advanced CPR and vital signs patient mannequins",
        "Maternal & child health delivery simulation room",
        "Sterile hospital ward mock-up with emergency crash cart",
      ],
    },
    {
      category: "Teacher Education Infrastructure",
      title: "Psychological Assessment & Pedagogy Labs",
      desc: "Specialized laboratories for Bijoy Pal Memorial B.Ed College and P.N. Das D.El.Ed College for cognitive testing and micro-teaching.",
      features: [
        "Standardized intelligence and personality battery tests",
        "Phonetics & language learning audio-visual console",
        "Instructional design & ICT learning resource room",
      ],
    },
    {
      category: "Academic & Campus Amenities",
      title: "Central Digital Library & Study Centers",
      desc: "Thousands of reference volumes, textbooks, national journals, and e-learning terminals connected to high-speed campus Wi-Fi.",
      features: [
        "Delnet & e-journal access for interdisciplinary research",
        "Quiet reading halls with air-conditioned study spaces",
        "Extensive collection across Allied Sciences & Education",
      ],
    },
    {
      category: "Student Life & Well-Being",
      title: "Campus Amenities & Security Infrastructure",
      desc: "Ensuring a safe, healthy, and supportive environment for all students and faculty at Burnpur Riverside Road, Asansol.",
      features: [
        "24/7 CCTV surveillance and security staff",
        "Separate hostel facilities for nursing and outstation candidates",
        "Hygienic cafeteria, seminar auditorium & medical first aid",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-navy text-white py-12 sm:py-14 border-b-4 border-gold relative">
        <div className="academic-container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-light text-[10px] sm:text-[11px] font-black uppercase px-3 py-1 rounded-xs tracking-wider border border-white/20">
              Campus Infrastructure
            </div>
            <h1 className="font-heading font-black text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              State-of-the-Art Laboratories &amp; Campus Facilities
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed">
              Designed to support rigorous technical instruction, clinical healthcare simulations, and pedagogical teacher training.
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
          <span className="text-navy font-bold">Facilities</span>
        </div>
      </div>

      {/* Facilities Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="academic-container space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-gold-dark">
              Burnpur Riverside Road Campus
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-navy">
              World-Class Academic Environments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our campus integrates modern scientific laboratories, spacious classrooms, and specialized practical demonstration wings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {facilitiesList.map((fac, i) => (
              <div
                key={i}
                className="bg-ivory p-6 rounded-xs border-2 border-slate-300 hover:border-navy transition flex flex-col justify-between h-full space-y-4 shadow-xs"
              >
                <div className="space-y-3 flex flex-col flex-grow">
                  <span className="text-[10px] font-black uppercase tracking-wider text-forest bg-forest/10 px-2 py-0.5 rounded-xs w-fit">
                    {fac.category}
                  </span>
                  <h3 className="font-heading font-black text-lg text-navy">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed flex-grow">
                    {fac.desc}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    {fac.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-200">
                  <Link
                    href="/admissions"
                    className="btn btn-outline-navy btn-sm w-full text-xs justify-center"
                  >
                    <span>Schedule Campus Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Campus Visit Callout */}
          <div className="bg-navy text-white p-6 sm:p-8 rounded-xs border-2 border-gold flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-gold-light text-xs font-bold uppercase tracking-wider">
                Experience the Campus Firsthand
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                Book an In-Person Campus &amp; Laboratory Tour
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                Parents and candidates are welcome to tour our diagnostic laboratories, lecture halls, and consult directly with faculty.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <Link href="/contact" className="btn btn-gold text-xs h-11 px-5 justify-center w-full sm:w-auto">
                <span>View Campus Location</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href="tel:1800897334" className="btn btn-outline-white text-xs h-11 px-5 justify-center w-full sm:w-auto">
                <span>Call Admissions: 1800 897 334</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
