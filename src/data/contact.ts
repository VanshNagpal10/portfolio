export interface ContactLink {
  id: string;
  name: string;
  label: string;
  value: string;
  url: string;
  iconName: string;
  category: "Primary" | "Social" | "Code";
  actionText: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    id: "email",
    name: "Email Address",
    label: "Direct Email",
    value: "vanshnagpal21@gmail.com",
    url: "mailto:vanshnagpal21@gmail.com",
    iconName: "mail",
    category: "Primary",
    actionText: "Copy Email",
  },
  {
    id: "phone",
    name: "Phone / WhatsApp",
    label: "Direct Contact",
    value: "+91 9540599296",
    url: "tel:+919540599296",
    iconName: "phone",
    category: "Primary",
    actionText: "Call / WhatsApp",
  },
  {
    id: "github",
    name: "GitHub",
    label: "github.com/VanshNagpal10",
    value: "VanshNagpal10",
    url: "https://github.com/VanshNagpal10",
    iconName: "github",
    category: "Code",
    actionText: "View GitHub Profile",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    label: "linkedin.com/in/vanshnagpal27",
    value: "vanshnagpal27",
    url: "https://www.linkedin.com/in/vanshnagpal27/",
    iconName: "linkedin",
    category: "Social",
    actionText: "Connect on LinkedIn",
  },
  {
    id: "x",
    name: "X (Twitter)",
    label: "x.com/VanshNagpal_27",
    value: "@VanshNagpal_27",
    url: "https://x.com/VanshNagpal_27",
    iconName: "twitter",
    category: "Social",
    actionText: "Follow on X",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    label: "leetcode.com/u/Vansh_Nagpal",
    value: "Vansh_Nagpal",
    url: "https://leetcode.com/u/Vansh_Nagpal",
    iconName: "code",
    category: "Code",
    actionText: "View Problem Solving",
  },
];

export const RESUME_INFO = {
  filename: "Vansh_Nagpal_SDE_Resume.pdf",
  downloadUrl: "/Vansh-SDE.pdf",
  lastUpdated: "Nov 2026",
  filesize: "128 KB",
  headline: "Full-Stack & iOS Software Engineer",
};

export const CHASSIS_ENGRAVINGS = {
  line1: "Designed by Vansh Nagpal in Delhi, India",
  line2: "Assembled with Next.js 16, React 19 & Web Audio",
  line3: "Rated 3.3V DC · 128GB Storage · Model A1238 / VN-2026",
  serial: "Serial No. VN-APPLE-SSC-2026",
};
