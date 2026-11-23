"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural stylised Apple EarPod mesh.
 *
 * Origin sits at the stem base where the wire attaches.
 * The earbud body extends upward (+Y) from the origin.
 *
 * Parts:
 *   1. Thin cylindrical stem (wire entry)       y: 0 → 0.18
 *   2. Flared neck                              y: 0.18 → 0.28
 *   3. Main rounded body (sphere-like capsule)  y: 0.28 → 0.60
 *   4. Speaker grille accent (dark circle)      front face
 *
 * Props.mirror: flip X-axis for the right ear pod.
 */

interface EarPodsMeshProps {
  mirror?: boolean;
}

export default function EarPodsMesh({ mirror = false }: EarPodsMeshProps) {
  const parts = useMemo(() => {
    const segs = 20;

    // Stem – thin cylinder
    const stemGeo = new THREE.CylinderGeometry(0.028, 0.03, 0.18, segs);
    stemGeo.translate(0, 0.09, 0);

    // Flared neck
    const neckGeo = new THREE.CylinderGeometry(0.03, 0.095, 0.10, segs);
    neckGeo.translate(0, 0.23, 0);

    // Main body – flattened sphere capsule
    const bodyGeo = new THREE.SphereGeometry(0.14, segs, segs, 0, Math.PI * 2, 0, Math.PI);
    bodyGeo.scale(1, 1.3, 0.7);
    bodyGeo.translate(0, 0.44, 0);

    // Speaker grille – thin dark disc on front face
    const grilleGeo = new THREE.CircleGeometry(0.08, segs);
    grilleGeo.translate(0, 0.46, 0.098);

    return { stemGeo, neckGeo, bodyGeo, grilleGeo };
  }, []);

  return (
    <group scale={[mirror ? -1 : 1, 1, 1]}>
      {/* Stem */}
      <mesh geometry={parts.stemGeo}>
        <meshPhysicalMaterial
          color="#FAFAFC"
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Flared neck */}
      <mesh geometry={parts.neckGeo}>
        <meshPhysicalMaterial
          color="#FAFAFC"
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Main body */}
      <mesh geometry={parts.bodyGeo}>
        <meshPhysicalMaterial
          color="#FAFAFC"
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Dark speaker grille */}
      <mesh geometry={parts.grilleGeo}>
        <meshStandardMaterial
          color="#222428"
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
