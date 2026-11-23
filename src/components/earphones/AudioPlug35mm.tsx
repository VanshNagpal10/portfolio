"use client";

import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural photorealistic Apple 3.5mm TRRS headphone plug.
 *
 * Origin [0,0,0] sits at the collar/metal junction.
 * Wire attachment point: [0, 0.38, 0] (top of strain-relief boot).
 * Chrome TRS tip extends downward from origin.
 *
 * Parts (top → bottom):
 *   1. White tapered strain-relief boot (collar)   y: 0 → 0.38
 *   2. Brushed chrome sleeve                       y: 0 → -0.28
 *   3. Black TRRS insulator ring 1                 y: -0.28 → -0.32
 *   4. Chrome ring section                         y: -0.32 → -0.44
 *   5. Black TRRS insulator ring 2                 y: -0.44 → -0.48
 *   6. Conical chrome TRS tip                      y: -0.48 → -0.68
 */
export default function AudioPlug35mm() {
  const parts = useMemo(() => {
    const segs = 24;

    // 1. White strain-relief boot (tapered cylinder)
    const bootGeo = new THREE.CylinderGeometry(0.055, 0.042, 0.38, segs);
    bootGeo.translate(0, 0.19, 0);

    // 2. Chrome sleeve
    const sleeveGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.28, segs);
    sleeveGeo.translate(0, -0.14, 0);

    // 3. Black insulator ring 1
    const insul1Geo = new THREE.CylinderGeometry(0.034, 0.034, 0.04, segs);
    insul1Geo.translate(0, -0.30, 0);

    // 4. Chrome ring
    const ringGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.12, segs);
    ringGeo.translate(0, -0.38, 0);

    // 5. Black insulator ring 2
    const insul2Geo = new THREE.CylinderGeometry(0.034, 0.034, 0.04, segs);
    insul2Geo.translate(0, -0.46, 0);

    // 6. Conical tip
    const tipGeo = new THREE.CylinderGeometry(0.036, 0.008, 0.20, segs);
    tipGeo.translate(0, -0.58, 0);

    return { bootGeo, sleeveGeo, insul1Geo, ringGeo, insul2Geo, tipGeo };
  }, []);

  return (
    <group>
      {/* White TPE strain-relief boot */}
      <mesh geometry={parts.bootGeo}>
        <meshPhysicalMaterial
          color="#F2F3F6"
          roughness={0.34}
          metalness={0.02}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Chrome sleeve */}
      <mesh geometry={parts.sleeveGeo}>
        <meshPhysicalMaterial
          color="#D8D8D8"
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>

      {/* Black insulator ring 1 */}
      <mesh geometry={parts.insul1Geo}>
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>

      {/* Chrome ring */}
      <mesh geometry={parts.ringGeo}>
        <meshPhysicalMaterial
          color="#D8D8D8"
          roughness={0.12}
          metalness={0.96}
        />
      </mesh>

      {/* Black insulator ring 2 */}
      <mesh geometry={parts.insul2Geo}>
        <meshStandardMaterial color="#111111" roughness={0.5} />
      </mesh>

      {/* Conical chrome TRS tip */}
      <mesh geometry={parts.tipGeo}>
        <meshPhysicalMaterial
          color="#C4C4C4"
          roughness={0.1}
          metalness={0.98}
        />
      </mesh>
    </group>
  );
}
