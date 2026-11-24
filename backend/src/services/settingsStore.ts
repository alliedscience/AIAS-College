export interface WebsiteSettings {
  portalName: string;
  admissionsSession: string;
  admissionsActive: boolean;
  wbsccActive: boolean;
  wbsccLimit: string;
  wbsccInterestRate: string;
  centralAddress: string;
  centralTollFree: string;
  supportEmail: string;
  collaborationCenter: string;
  collaborationUniversity: string;
  helplineHours: string;
  institutions: Array<{
    slug: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    affiliations: string[];
  }>;
}

let liveSettings: WebsiteSettings = {
  portalName: "AIAS Education Portal",
  admissionsSession: "2026-2027",
  admissionsActive: true,
  wbsccActive: true,
  wbsccLimit: "₹10 Lakhs",
  wbsccInterestRate: "4% Simple Interest",
  centralAddress: "Burnpur Riverside Road, Asansol, West Bengal, PIN - 713325",
  centralTollFree: "1800 897 334",
  supportEmail: "admissions@aias.edu.in",
  collaborationCenter:
    "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)",
  collaborationUniversity:
    "Diamond Harbour Women's University (ডায়মন্ড হারবার মহিলা বিশ্ববিদ্যালয়)",
  helplineHours: "Monday to Saturday (9:30 AM – 5:30 PM)",
  institutions: [
    {
      slug: "aias",
      name: "Asansol Institute of Allied Sciences (AIAS)",
      phone: "1800 897 334",
      email: "info@aias.edu.in",
      address: "Burnpur Riverside Road, Asansol, WB",
      affiliations: [
        "The Marie Curie Centre for Interdisciplinary Sciences (MCCIS)",
        "Diamond Harbour Women's University",
      ],
    },
    {
      slug: "bijoy-pal-memorial",
      name: "Bijoy Pal Memorial B.Ed College",
      phone: "1800 891 1734",
      email: "contact@bijoypalbed.org",
      address: "Burnpur Riverside Road, Asansol, WB",
      affiliations: [
        "National Council for Teacher Education (N.C.T.E.)",
        "Baba Saheb Ambedkar Education University (B.S.A.E.U. / erstwhile WBUTTEPA)",
      ],
    },
    {
      slug: "pramoth-nath-das",
      name: "Pramoth Nath Das Academy of Nursing",
      phone: "1800 890 7334",
      email: "nursing@pndasacademy.org",
      address: "Burnpur Riverside Road, Asansol, WB",
      affiliations: [
        "Indian Nursing Council (INC)",
        "West Bengal Nursing Council (WBNC)",
        "West Bengal University of Health Sciences (WBUHS)",
      ],
    },
    {
      slug: "pn-das-academy",
      name: "P.N. Das Academy (D.El.Ed College)",
      phone: "1800 891 1734",
      email: "deled@pndasacademy.org",
      address: "Burnpur Riverside Road, Asansol, WB",
      affiliations: [
        "National Council for Teacher Education (N.C.T.E.)",
        "West Bengal Board of Primary Education (WBBPE)",
      ],
    },
  ],
};

export class SettingsRepository {
  static getSettings(): WebsiteSettings {
    return { ...liveSettings };
  }

  static updateSettings(partial: Partial<WebsiteSettings>): WebsiteSettings {
    liveSettings = {
      ...liveSettings,
      ...partial,
      institutions: partial.institutions || liveSettings.institutions,
    };
    return { ...liveSettings };
  }
}
