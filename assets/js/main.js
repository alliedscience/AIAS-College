/**
 * Asansol Institute of Allied Sciences (AIAS)
 * Interactive Controller & Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initAdmissionsForm();
  initModals();
  initSmoothScroll();
});

// Toast notification helper
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// 1. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isOpen = navMenu.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// 2. FAQ Accordion Toggle
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        if (!isOpen) {
          item.classList.add('open');
        } else {
          item.classList.remove('open');
        }
      });
    }
  });
}

// 3. Admissions Inquiry Form Handling
function initAdmissionsForm() {
  const form = document.getElementById('admissionsInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="student_name"]').value.trim();
    const phone = form.querySelector('[name="student_phone"]').value.trim();
    const email = form.querySelector('[name="student_email"]').value.trim();
    const course = form.querySelector('[name="course_preference"]').value;
    const qualification = form.querySelector('[name="highest_qualification"]').value;
    const wbscc = form.querySelector('[name="wbscc_opt_in"]').checked;

    // Validation
    if (!name || !phone || !course) {
      showToast('Please fill in your name, contact phone, and preferred course.', 'error');
      return;
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    // Generate reference code
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `AIAS-2026-${randomSuffix}`;

    // Render Confirmation inside the card
    const formCardBody = form.closest('.admissions-form-card').querySelector('.form-body');
    formCardBody.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0.5rem;">
        <div style="width: 56px; height: 56px; background-color: #f0fdf4; color: #166534; border: 2px solid #22c55e; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--navy-primary); margin-bottom: 0.5rem;">Application Inquiry Received!</h3>
        <p style="font-size: 0.88rem; color: var(--slate-600); margin-bottom: 1rem;">
          Thank you, <strong>${name}</strong>. Your provisional admission inquiry for <strong>${course}</strong> has been registered.
        </p>
        <div style="background-color: var(--slate-100); border: 1.5px dashed var(--slate-300); padding: 0.8rem; border-radius: 4px; margin-bottom: 1.2rem;">
          <span style="font-size: 0.75rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700; display: block;">Application Reference Number</span>
          <strong style="font-size: 1.25rem; font-family: monospace; color: var(--navy-primary); letter-spacing: 1px;">${refCode}</strong>
        </div>
        <p style="font-size: 0.8rem; color: var(--slate-600); line-height: 1.5; margin-bottom: 1.5rem;">
          Our academic counselor will contact you at <strong>${phone}</strong> within 24 working hours to guide you through document verification and 
          ${wbscc ? '<strong>West Bengal Student Credit Card (WBSCC)</strong> documentation.' : 'scholarship verification.'}
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          <button type="button" class="btn btn-primary" onclick="downloadApplicationSlip('${refCode}', '${name}', '${course}', '${phone}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Acknowledgment Slip
          </button>
          <button type="button" class="btn btn-outline-navy" onclick="location.reload()">
            Submit Another Inquiry
          </button>
        </div>
      </div>
    `;

    showToast(`Inquiry Registered! Reference: ${refCode}`);
  });
}

// 4. Modal System (Syllabus & Course Details)
const courseDetailsData = {
  dmlt: {
    title: 'Diploma in Medical Laboratory Technology (DMLT)',
    duration: '2 Years (4 Semesters) | Full Time',
    collaborator: 'Marie Curie Centre for Interdisciplinary Sciences (MCCIS) • Diamond Harbour Women’s University',
    eligibility: '10+2 with Science (Physics, Chemistry, Biology/Mathematics) or equivalent from a recognized board.',
    overview: 'The DMLT program at AIAS equips students with comprehensive clinical, diagnostic, and laboratory skills required in modern healthcare systems. From automated hematology analyzers to microbiological cultures and clinical biochemistry assays, students undergo rigorous practical lab sessions combined with a mandatory clinical hospital internship.',
    curriculum: [
      {
        sem: 'Semester I: Foundations of Clinical Science',
        topics: ['Human Anatomy & Physiology', 'Clinical Biochemistry I (Carbohydrates, Lipids, Proteins)', 'Basic Hematology & Clinical Pathology', 'Laboratory Safety, Quality Control & Sterilization']
      },
      {
        sem: 'Semester II: Diagnostic Microbiology & Pathology',
        topics: ['Medical Microbiology & Parasitology', 'Clinical Biochemistry II (Enzymology, Liver & Renal Function)', 'Blood Banking, Transfusion Technology & Immunohematology', 'Clinical Diagnostic Practicum I']
      },
      {
        sem: 'Semester III: Advanced Diagnostic Techniques',
        topics: ['Systematic Bacteriology & Virology', 'Histotechnology & Cytopathology Slide Preparation', 'Immunology & Clinical Serology', 'Diagnostic Laboratory Automation & Instrumentation']
      },
      {
        sem: 'Semester IV: Clinical Practicum & Internship',
        topics: ['Molecular Diagnostics & PCR Essentials', 'Laboratory Administration & Medical Ethics', 'Hospital Diagnostic Laboratory Compulsory Internship', 'Comprehensive Project & Viva-Voce']
      }
    ],
    careers: [
      'Chief Medical Laboratory Technician',
      'Pathology & Diagnostic Center Technologist',
      'Hospital Blood Bank Officer',
      'Clinical Biochemistry Analyst',
      'Quality Control Assistant in Diagnostic Research'
    ]
  },
  agri: {
    title: 'Diploma in Agriculture',
    duration: '2 Years (4 Semesters) | Full Time',
    collaborator: 'Marie Curie Centre for Interdisciplinary Sciences (MCCIS) • Diamond Harbour Women’s University',
    eligibility: '10+2 in any stream / Science or Secondary Examination as per university admission criteria.',
    overview: 'The Diploma in Agriculture is a futuristic, career-oriented program focusing on high-efficiency crop production, modern agronomy, smart greenhouse technologies, hydroponics, soil health management, and organic farming. Students gain firsthand experience at the institute’s agricultural test-plots and modern agronomy field stations.',
    curriculum: [
      {
        sem: 'Semester I: Agronomy & Soil Foundations',
        topics: ['Fundamentals of Agronomy & Agro-meteorology', 'Soil Science, Soil Fertility & Fertilizer Chemistry', 'Agricultural Botany & Plant Physiology', 'Farm Machinery, Implements & Irrigation Methods']
      },
      {
        sem: 'Semester II: Crop Protection & Horticulture',
        topics: ['Principles of Horticulture & Olericulture', 'Plant Pathology & Fungal/Bacterial Crop Diseases', 'Agricultural Entomology & Integrated Pest Management (IPM)', 'Organic Farming Systems & Vermicomposting']
      },
      {
        sem: 'Semester III: Smart Agri-Tech & Seed Production',
        topics: ['Commercial Crop Production Technology', 'Seed Technology, Certification & Processing', 'Greenhouse Construction, Micro-irrigation & Hydroponics', 'Soil Health Testing & Nutrient Assay Lab']
      },
      {
        sem: 'Semester IV: Farm Management & Rural Fieldwork',
        topics: ['Agri-Business Management & Agricultural Economics', 'Post-Harvest Technology & Value Addition', 'Rural Agricultural Work Experience (RAWE)', 'Entrepreneurship Project in Commercial Farming']
      }
    ],
    careers: [
      'Agricultural Extension Officer (Private & Govt Projects)',
      'Smart Farm & Greenhouse Manager',
      'Soil Testing & Fertilizer Quality Technician',
      'Seed Production & Quality Control Supervisor',
      'Agro-input Distributor & Agripreneur'
    ]
  },
  vet: {
    title: 'Diploma in Veterinary Assistant',
    duration: '2 Years (4 Semesters) | Full Time',
    collaborator: 'Marie Curie Centre for Interdisciplinary Sciences (MCCIS) • Diamond Harbour Women’s University',
    eligibility: '10+2 / Higher Secondary or Secondary examination from any recognized board.',
    overview: 'The Diploma in Veterinary Assistant prepares dedicated healthcare assistants for veterinary hospitals, clinics, dairy conglomerates, poultry farms, and animal welfare centers. The course covers animal anatomy, disease prevention, pharmacology, surgical assisting, first aid, and clinical patient handling.',
    curriculum: [
      {
        sem: 'Semester I: Veterinary Anatomy & Animal Husbandry',
        topics: ['Introductory Veterinary Anatomy & Animal Physiology', 'Animal Nutrition, Feeds & Fodder Cultivation', 'Livestock Breeds & Farm Animal Management', 'Animal Handling, Restraint & Bio-security']
      },
      {
        sem: 'Semester II: Veterinary Clinical Fundamentals',
        topics: ['Veterinary Clinical Pharmacology & Therapeutics', 'Animal Hygiene, Sanitation & Preventive Care', 'General Veterinary Pathology & Parasitology', 'Veterinary First Aid & Emergency Triage']
      },
      {
        sem: 'Semester III: Livestock Health & Clinical Diagnostics',
        topics: ['Infectious Livestock Diseases & Immunization Protocols', 'Clinical Diagnostic Techniques & Specimen Collection', 'Companion Animal (Canine & Feline) Nursing & Care', 'Dairy & Poultry Healthcare Management']
      },
      {
        sem: 'Semester IV: Surgical Assisting & Clinical Internship',
        topics: ['Veterinary Surgical Assisting & Sterilization', 'Artificial Insemination (AI) Theory & Practicum', 'Clinical Veterinary Hospital Mandatory Internship', 'Animal Welfare Laws, Ethics & Final Project']
      }
    ],
    careers: [
      'Veterinary Hospital Clinical Assistant',
      'Livestock Development Assistant',
      'Dairy & Poultry Farm Health Supervisor',
      'Animal Welfare Shelter Caretaker',
      'Veterinary Diagnostic Lab Assistant'
    ]
  }
};

function initModals() {
  const modalBackdrop = document.getElementById('courseModalBackdrop');
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modalCourseTitle');
  const modalBody = document.getElementById('modalCourseBody');
  const applyBtn = document.getElementById('modalApplyBtn');

  // Trigger modal
  window.openCourseDetails = function(courseKey) {
    const data = courseDetailsData[courseKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    let semHtml = data.curriculum.map(c => `
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 1rem; margin-bottom: 0.8rem;">
        <h4 style="font-size: 0.92rem; font-weight: 800; color: #0b2545; margin-bottom: 0.4rem;">${c.sem}</h4>
        <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.84rem; color: #475569;">
          ${c.topics.map(t => `<li style="margin-bottom: 0.2rem;">${t}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    let careersHtml = data.careers.map(car => `
      <span style="display: inline-block; background-color: #f1f5f9; color: #0b2545; font-size: 0.78rem; font-weight: 700; padding: 0.35rem 0.65rem; border-radius: 2px; border: 1px solid #cbd5e1; margin-right: 0.4rem; margin-bottom: 0.4rem;">
        ✓ ${car}
      </span>
    `).join('');

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span style="background-color: #0b2545; color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.6rem; border-radius: 2px; text-transform: uppercase;">
            ${data.duration}
          </span>
          <span style="background-color: #fefce8; color: #854d0e; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.6rem; border-radius: 2px; border: 1px solid #fef08a;">
            University Certified
          </span>
        </div>
        <p style="font-size: 0.95rem; color: #334155; line-height: 1.6; margin-bottom: 1.2rem;">
          ${data.overview}
        </p>
        <div style="background-color: #f0fdf4; border-left: 3px solid #166534; padding: 0.8rem 1rem; border-radius: 2px; margin-bottom: 1.5rem;">
          <strong style="color: #14532d; font-size: 0.85rem; display: block; text-transform: uppercase; margin-bottom: 0.2rem;">Eligibility Criteria:</strong>
          <span style="font-size: 0.84rem; color: #1e3a8a;">${data.eligibility}</span>
        </div>
        
        <h4 style="font-size: 1.05rem; font-weight: 800; color: #0b2545; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em;">
          Course Curriculum &amp; Semester Modules
        </h4>
        ${semHtml}

        <h4 style="font-size: 1.05rem; font-weight: 800; color: #0b2545; margin-top: 1.5rem; margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em;">
          Career Opportunities &amp; Placements
        </h4>
        <div style="margin-bottom: 1rem;">
          ${careersHtml}
        </div>
      </div>
    `;

    applyBtn.onclick = () => {
      modalBackdrop.classList.remove('active');
      const select = document.querySelector('[name="course_preference"]');
      if (select) {
        if (courseKey === 'dmlt') select.value = 'Diploma in Medical Laboratory Technology';
        if (courseKey === 'agri') select.value = 'Diploma in Agriculture';
        if (courseKey === 'vet') select.value = 'Diploma in Veterinary Assistant';
      }
      document.getElementById('admissions-inquiry')?.scrollIntoView({ behavior: 'smooth' });
      showToast(`Selected ${data.title} in Admissions Form!`);
    };

    modalBackdrop.classList.add('active');
  };

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      modalBackdrop.classList.remove('active');
    }
  });
}

// 5. Download Application Acknowledgment Slip
window.downloadApplicationSlip = function(refCode, name, course, phone) {
  const content = `
===================================================================
      ASANSOL INSTITUTE OF ALLIED SCIENCES (AIAS)
      Estd: 2026 | Burnpur Riverside Road, Asansol, WB
      In Collaboration with The Marie Curie Centre for 
      Interdisciplinary Sciences (MCCIS) - DHWU
===================================================================
PROVISIONAL ADMISSION INQUIRY ACKNOWLEDGMENT SLIP (2026-2027)

Reference Number: ${refCode}
Date of Inquiry:  ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
Student Name:     ${name}
Contact Number:   ${phone}
Selected Course:  ${course}
Duration:         2 Years (Full-Time Diploma)

Next Steps for Candidate:
1. Keep this reference number handy for all counseling correspondence.
2. Our admissions officer will contact you within 24 hours.
3. Keep the following documents ready for verification:
   - 10th & 12th Marksheets & Admit Cards
   - Aadhaar Card / ID Proof
   - 4 Passport Size Photographs
   - WBSCC or Scholarship Application Acknowledgments (if applicable)

HELPLINE DIRECTORY:
- AIAS Admissions Desk: 1800 897 334 (Toll-Free)
- Campus Address: Burnpur Riverside Road, Asansol, West Bengal
===================================================================
  `.trim();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${refCode}_Acknowledgment.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Downloaded Admission Acknowledgment Slip!');
};

// 6. Smooth scrolling helper
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
