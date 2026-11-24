import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting AIAS Education Portal Database Seeding...");

  // ----------------------------------------------------------------------------
  // 1. Initial Super Administrator
  // ----------------------------------------------------------------------------
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || "admin@aias.edu.in";
  const rawPassword = process.env.INITIAL_ADMIN_PASSWORD || "ChangeMe_AIAS2026!Secure";
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  const superAdmin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, isActive: true },
    create: {
      name: "Portal Super Administrator",
      email: adminEmail,
      passwordHash,
      role: Role.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log(`✅ Super Admin created/verified: ${superAdmin.email}`);

  // ----------------------------------------------------------------------------
  // 2. The Four Institutions from Brochure ("AIAS P1.pdf")
  // ----------------------------------------------------------------------------

  // Institution A: Asansol Institute of Allied Sciences (AIAS)
  const aias = await prisma.institution.upsert({
    where: { slug: "aias" },
    update: {},
    create: {
      name: "Asansol Institute of Allied Sciences",
      shortName: "AIAS",
      slug: "aias",
      code: "AIAS",
      description:
        "Premier institute for technical and career-oriented allied sciences, offering modern diplomas in diagnostic pathology, climate-smart agriculture, and veterinary healthcare. All courses conducted in formal academic collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women's University.",
      shortDescription:
        "Allied Sciences, Paramedical Diagnostics & Agricultural Technologies in Asansol.",
      logo: "/images/logos/AIAS LOGO PNG.png",
      crest: "/images/logos/AIAS LOGO PNG.png",
      bannerImage: "/images/campus-hero.svg",
      address: "Burnpur Riverside Road, Asansol, West Bengal",
      phone: "1800 897 334",
      altPhone: "1800897334", // Preserved from brochure variation
      email: "admissions@aias.edu.in",
      affiliation:
        "In Collaboration with The Marie Curie Centre for Interdisciplinary Sciences (MCCIS), Diamond Harbour Women's University (DHWU)",
      recognitions: "University Collaboration • WBSCC Approved • 100% Placement Wing",
      establishedYear: 2026,
      theme: JSON.stringify({
        primaryColor: "#102D4F", // Deep Navy
        accentColor: "#14532D",  // Laurel Forest Green
        goldColor: "#B99A62",    // Muted Gold
        badgeText: "ESTD: 2026",
      }),
      published: true,
      displayOrder: 1,
    },
  });

  // Institution B: Bijoy Pal Memorial B.Ed College
  const bpmBed = await prisma.institution.upsert({
    where: { slug: "bijoy-pal-memorial" },
    update: {},
    create: {
      name: "Bijoy Pal Memorial B.Ed College",
      shortName: "B.P.M. B.Ed",
      slug: "bijoy-pal-memorial",
      code: "BPMBC",
      description:
        "Premier teacher education institution established in 2007 with the guiding motto 'विद्यया ददाति विनयम'. Fully recognised by N.C.T.E. and affiliated to Baba Saheb Ambedkar Education University (B.S.A.E.U., erstwhile W.B.U.T.T.E.P.A.). Offering 2-Year B.Ed across 12 method subject streams.",
      shortDescription:
        "NCTE Recognised & BSAEU Affiliated Bachelor of Education College in Asansol.",
      logo: "/images/bpm-bed-logo.svg",
      crest: "/images/bpm-bed-logo.svg",
      address: "Burnpur, Riverside Road, Asansol, WB",
      phone: "1800 891 1734",
      email: "info@bpmbedcollege.in",
      affiliation: "Affiliated to B.S.A.E.U. (Erstwhile W.B.U.T.T.E.P.A.)",
      recognitions: "Recognised by N.C.T.E. (National Council for Teacher Education)",
      establishedYear: 2007,
      theme: JSON.stringify({
        primaryColor: "#0B2545",
        accentColor: "#B99A62",
        badgeText: "ESTD: 2007 • NCTE",
      }),
      published: true,
      displayOrder: 2,
    },
  });

  // Institution C: Pramoth Nath Das Academy of Nursing
  const pndNursing = await prisma.institution.upsert({
    where: { slug: "pramoth-nath-das" },
    update: {},
    create: {
      name: "Pramoth Nath Das Academy of Nursing",
      shortName: "P.N.D. Nursing",
      slug: "pramoth-nath-das",
      code: "PNDAN",
      description:
        "Leading healthcare education institution recognised by the Indian Nursing Council (INC) and West Bengal Nursing Council (WBNC), and affiliated to the West Bengal University of Health Sciences (WBUHS). Delivering high-standard clinical nursing education through G.N.M and B.Sc Nursing programs.",
      shortDescription:
        "INC & WBNC Recognised Nursing Academy Affiliated to WBUHS.",
      logo: "/images/pnd-nursing-logo.svg",
      crest: "/images/pnd-nursing-logo.svg",
      address: "Burnpur, Riverside Road, Asansol, WB",
      phone: "1800 890 7334",
      email: "admissions@pndnursing.in",
      affiliation: "Affiliated to WBUHS (West Bengal University of Health Sciences)",
      recognitions: "Recognised by INC (Indian Nursing Council) & WBNC (West Bengal Nursing Council)",
      theme: JSON.stringify({
        primaryColor: "#044E54",
        accentColor: "#0A747C",
        badgeText: "INC • WBNC • WBUHS",
      }),
      published: true,
      displayOrder: 3,
    },
  });

  // Institution D: P.N. Das Academy (D.El.Ed College)
  const pnDasDeled = await prisma.institution.upsert({
    where: { slug: "pn-das-academy" },
    update: {},
    create: {
      name: "P.N. Das Academy (D.El.Ed College)",
      shortName: "P.N. Das D.El.Ed",
      slug: "pn-das-academy",
      code: "PNDA",
      description:
        "N.C.T.E. recognised and affiliated to the West Bengal Board of Primary Education (WBBPE). Equipping future primary and elementary educators with modern pedagogy, child psychology, instructional design, and classroom practicum.",
      shortDescription:
        "N.C.T.E. Recognised & WBBPE Affiliated Elementary Teacher Education.",
      logo: "/images/pn-das-deled-logo.svg",
      crest: "/images/pn-das-deled-logo.svg",
      address: "Burnpur, Riverside Road, Asansol, WB",
      phone: "1800 891 1734",
      email: "info@pndasacademy.in",
      affiliation: "Affiliated to West Bengal Board of Primary Education (WBBPE)",
      recognitions: "N.C.T.E. Recognised",
      theme: JSON.stringify({
        primaryColor: "#9A3412",
        accentColor: "#C2410C",
        badgeText: "NCTE • WBBPE",
      }),
      published: true,
      displayOrder: 4,
    },
  });

  console.log("✅ 4 Core Institutions seeded successfully.");

  // ----------------------------------------------------------------------------
  // 3. Flagship Career Courses from Brochure
  // ----------------------------------------------------------------------------

  // AIAS Courses (3 Diplomas, each 2 Years)
  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: aias.id,
        slug: "agriculture",
      },
    },
    update: {},
    create: {
      institutionId: aias.id,
      name: "Diploma in Agriculture",
      shortName: "Dip. Agri",
      slug: "agriculture",
      code: "AGRI-DIP-01",
      description:
        "2-year comprehensive diploma program covering modern agronomy, soil chemistry, greenhouse hydroponics, organic farming, crop protection, and sustainable agricultural management.",
      duration: "2 Years",
      durationYears: 2.0,
      eligibility: "10+2 / Secondary Examination from any recognized Board/Council.",
      curriculum: JSON.stringify([
        "Fundamentals of Agronomy & Soil Science",
        "Plant Pathology & Crop Protection",
        "Commercial Horticulture & Hydroponics",
        "Organic Farming Systems & Farm Business",
      ]),
      careerProspects: JSON.stringify([
        "Agricultural Extension Officer",
        "Smart Farm & Greenhouse Manager",
        "Soil Testing & Fertilizer Quality Supervisor",
        "Agripreneur / Commercial Farming Lead",
      ]),
      featuredImage: "/images/agriculture.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 1,
      published: true,
    },
  });

  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: aias.id,
        slug: "medical-laboratory-technology",
      },
    },
    update: {},
    create: {
      institutionId: aias.id,
      name: "Diploma in Medical Laboratory Technology (DMLT)",
      shortName: "DMLT",
      slug: "medical-laboratory-technology",
      code: "DMLT-01",
      description:
        "2-year career-oriented paramedical diploma equipping students with advanced clinical diagnostics, hematology analysis, medical microbiology, clinical biochemistry, and hospital pathology training.",
      duration: "2 Years",
      durationYears: 2.0,
      eligibility: "10+2 with Science (Physics, Chemistry, Biology/Mathematics) or equivalent.",
      curriculum: JSON.stringify([
        "Human Anatomy, Physiology & Lab Safety",
        "Clinical Biochemistry & Enzymology",
        "Medical Microbiology & Parasitology",
        "Hematology, Blood Banking & Hospital Internship",
      ]),
      careerProspects: JSON.stringify([
        "Chief Medical Laboratory Technologist",
        "Pathology Diagnostic Center In-charge",
        "Hospital Blood Bank Technical Officer",
        "Clinical Research Laboratory Assistant",
      ]),
      featuredImage: "/images/dmlt.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 2,
      published: true,
    },
  });

  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: aias.id,
        slug: "veterinary-assistant",
      },
    },
    update: {},
    create: {
      institutionId: aias.id,
      name: "Diploma in Veterinary Assistant",
      shortName: "Dip. Vet",
      slug: "veterinary-assistant",
      code: "VET-DIP-01",
      description:
        "2-year specialized diploma preparing professionals for animal hospitals, livestock management, surgical assistance, pet clinic healthcare, immunization, and dairy/poultry farm health administration.",
      duration: "2 Years",
      durationYears: 2.0,
      eligibility: "10+2 / Higher Secondary or Secondary examination from recognized board.",
      curriculum: JSON.stringify([
        "Veterinary Anatomy, Physiology & Restraint",
        "Clinical Pharmacology & Veterinary First Aid",
        "Livestock Disease Prevention & Immunization",
        "Surgical Assisting & Clinical Hospital Rotations",
      ]),
      careerProspects: JSON.stringify([
        "Veterinary Hospital Clinical Assistant",
        "Livestock Development Healthcare Assistant",
        "Dairy & Poultry Farm Health In-charge",
        "Animal Welfare Center & Shelter Supervisor",
      ]),
      featuredImage: "/images/veterinary.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 3,
      published: true,
    },
  });

  // Bijoy Pal Memorial B.Ed Course
  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: bpmBed.id,
        slug: "bed",
      },
    },
    update: {},
    create: {
      institutionId: bpmBed.id,
      name: "Bachelor of Education (B.Ed)",
      shortName: "B.Ed",
      slug: "bed",
      code: "B-ED-01",
      description:
        "2-year professional degree program approved by N.C.T.E. and affiliated to B.S.A.E.U. (erstwhile W.B.U.T.T.E.P.A.). Offers 12 pedagogy method subject streams for aspiring secondary and higher-secondary educators.",
      duration: "2 Years",
      durationYears: 2.0,
      eligibility:
        "Graduation or Post-Graduation with minimum 50% marks (45% for reserved categories) as per NCTE & BSAEU guidelines.",
      curriculum: JSON.stringify([
        "Method Subjects Offered (12): Bengali, English, Hindi, Sanskrit, Geography, History, Physical Science, Life Science, Mathematics, Political Science, Commerce, Computer Science",
        "Childhood and Growing Up",
        "Contemporary India and Education",
        "Learning and Teaching Pedagogy & School Internship",
      ]),
      careerProspects: JSON.stringify([
        "Secondary School Teacher (TGT/PGT)",
        "Educational Counselor & Curriculum Developer",
        "Academic Content Specialist",
      ]),
      featuredImage: "/images/bpm-bed-logo.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 1,
      published: true,
    },
  });

  // Pramoth Nath Das Academy of Nursing Courses
  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: pndNursing.id,
        slug: "gnm",
      },
    },
    update: {},
    create: {
      institutionId: pndNursing.id,
      name: "General Nursing and Midwifery (G.N.M)",
      shortName: "G.N.M",
      slug: "gnm",
      code: "GNM-01",
      description:
        "3-year diploma in nursing and healthcare practice recognised by INC and WBNC, focusing on bedside patient care, clinical rotations, community health, and midwifery.",
      duration: "3 Years",
      durationYears: 3.0,
      eligibility: "10+2 with English (min 40% aggregate) as per INC and WBNC norms.",
      curriculum: JSON.stringify([
        "Bio-Sciences, Anatomy, Physiology & Microbiology",
        "Behavioral Sciences & Psychology",
        "Nursing Foundations & First Aid",
        "Medical-Surgical Nursing, Child Health & Midwifery",
      ]),
      careerProspects: JSON.stringify([
        "Staff Nurse in Government & Private Multi-Specialty Hospitals",
        "Community Health Officer (CHO)",
        "Critical Care Unit Nursing Specialist",
      ]),
      featuredImage: "/images/pnd-nursing-logo.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 1,
      published: true,
    },
  });

  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: pndNursing.id,
        slug: "bsc-nursing",
      },
    },
    update: {},
    create: {
      institutionId: pndNursing.id,
      name: "Bachelor of Science in Nursing (B.Sc Nursing)",
      shortName: "B.Sc Nursing",
      slug: "bsc-nursing",
      code: "BSC-NUR-01",
      description:
        "4-year undergraduate degree program affiliated to West Bengal University of Health Sciences (WBUHS) and recognised by INC & WBNC. Trains clinical nursing leaders, researchers, and nursing administrators.",
      duration: "4 Years",
      durationYears: 4.0,
      eligibility:
        "10+2 with Science (PCB & English) with minimum 45% aggregate marks and WBJEE JENPAS-UG / relevant qualification.",
      curriculum: JSON.stringify([
        "Applied Anatomy, Physiology & Biochemistry",
        "Pharmacology, Pathology & Genetics",
        "Adult Health Nursing & Mental Health Nursing",
        "Nursing Research, Statistics & Hospital Administration",
      ]),
      careerProspects: JSON.stringify([
        "Clinical Nursing Officer",
        "Nursing Educator / Tutor in Nursing Colleges",
        "Hospital Nurse Administrator",
      ]),
      featuredImage: "/images/pnd-nursing-logo.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 2,
      published: true,
    },
  });

  // P.N. Das Academy D.El.Ed Course
  await prisma.course.upsert({
    where: {
      institutionId_slug: {
        institutionId: pnDasDeled.id,
        slug: "deled",
      },
    },
    update: {},
    create: {
      institutionId: pnDasDeled.id,
      name: "Diploma in Elementary Education (D.El.Ed)",
      shortName: "D.El.Ed",
      slug: "deled",
      code: "DELED-01",
      description:
        "2-year teacher education diploma recognized by N.C.T.E. and affiliated to the West Bengal Board of Primary Education (WBBPE). Focused on child development, primary pedagogical methods, and foundational literacy instruction.",
      duration: "2 Years",
      durationYears: 2.0,
      eligibility:
        "10+2 (Higher Secondary) with at least 50% marks (45% for SC/ST/OBC/PH) as per WBBPE guidelines.",
      curriculum: JSON.stringify([
        "Child Studies & Pedagogical Processes",
        "Teaching of Language & Environmental Science",
        "Foundational Mathematics Instruction",
        "School Internship & Action Research",
      ]),
      careerProspects: JSON.stringify([
        "Primary School Teacher (Primary Education Board)",
        "Elementary Educator in Private / Public Schools",
        "Early Childhood Educational Facilitator",
      ]),
      featuredImage: "/images/pn-das-deled-logo.svg",
      isCreditCardEligible: true,
      hasPlacementAssistance: true,
      displayOrder: 1,
      published: true,
    },
  });

  console.log("✅ All known courses from brochure seeded successfully.");

  // ----------------------------------------------------------------------------
  // 4. Initial Global Site Settings
  // ----------------------------------------------------------------------------
  await prisma.siteSettings.upsert({
    where: { key: "general_settings" },
    update: {},
    create: {
      key: "general_settings",
      value: JSON.stringify({
        siteName: "AIAS Education Portal",
        primaryAddress: "Burnpur Riverside Road, Asansol, West Bengal",
        admissionsSession: "2026-2027",
        admissionsStatus: "OPEN",
        wbsccEnabled: true,
        scholarshipsEnabled: true,
        sourceBrochureReference: "AIAS P1.pdf",
        contactVerificationChecklist: {
          aiasHelpline: "1800 897 334 / 1800897334 (Brochure P1)",
          bedHelpline: "1800 891 1734 (Brochure P2)",
          nursingHelpline: "1800 890 7334 (Brochure P2)",
          deledHelpline: "1800 891 1734 (Brochure P2)",
          status: "Preserved from source brochure; pending final client verification",
        },
      }),
      description: "Core institutional settings and brochure verification metadata",
    },
  });

  console.log("✅ Global site settings initialized.");
  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
