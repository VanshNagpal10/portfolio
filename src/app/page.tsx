"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Ipod = dynamic(() => import("@/components/Ipod/Ipod"), { ssr: false });
const EarphonesOverlay = dynamic(
  () => import("@/components/earphones/EarphonesOverlay"),
  { ssr: false }
);

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Ipod />
      <EarphonesOverlay />
    </Suspense>
  );
}
