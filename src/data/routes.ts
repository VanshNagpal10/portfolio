export interface RouteItem {
  id: string;
  path: string;
  trackNumber: string;
  title: string;
  subtitle: string;
  shortLabel: string;
}

export const ROUTES: RouteItem[] = [
  {
    id: "projects",
    path: "/projects",
    trackNumber: "02",
    title: "Projects",
    subtitle: "6 Interactive Discs",
    shortLabel: "Projects",
  },
  {
    id: "experience",
    path: "/experience",
    trackNumber: "03",
    title: "Experience & Education",
    subtitle: "KhwaaishAI, DDITLAB & Academia",
    shortLabel: "Experience",
  },
  {
    id: "honors",
    path: "/honors",
    trackNumber: "04",
    title: "Honors & Achievements",
    subtitle: "Apple SSC '26, Reliance & 9× Hackathons",
    shortLabel: "Honors",
  },
  {
    id: "about",
    path: "/about",
    trackNumber: "05",
    title: "About & Leadership",
    subtitle: "Tech Spec, Design & Campus Roles",
    shortLabel: "About",
  },
  {
    id: "contact",
    path: "/contact",
    trackNumber: "06",
    title: "Contact & Resume",
    subtitle: "Backplate, Links & PDF Download",
    shortLabel: "Contact",
  },
];

export function getRouteByPath(path: string): RouteItem | undefined {
  return ROUTES.find((r) => r.path === path);
}

export function getAdjacentRoutes(currentPath: string) {
  const currentIndex = ROUTES.findIndex((r) => r.path === currentPath);
  if (currentIndex === -1) {
    return {
      prev: ROUTES[ROUTES.length - 1],
      current: ROUTES[0],
      next: ROUTES[1],
      index: 1,
      total: ROUTES.length,
    };
  }

  const prevIndex = (currentIndex - 1 + ROUTES.length) % ROUTES.length;
  const nextIndex = (currentIndex + 1) % ROUTES.length;

  return {
    prev: ROUTES[prevIndex],
    current: ROUTES[currentIndex],
    next: ROUTES[nextIndex],
    index: currentIndex + 2, // 02..06 relative to 01 Home
    total: 6,
  };
}
