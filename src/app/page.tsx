"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Ipod = dynamic(() => import("@/components/Ipod/Ipod"), { ssr: false });

export default function Home() {
  return (
    <Suspense>
      <Ipod />
    </Suspense>
  );
}
