"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import EarphoneCablePhysics from "./EarphoneCablePhysics";

/* ------------------------------------------------------------------ */
/*  Internal 3D Scene                                                 */
/* ------------------------------------------------------------------ */

interface SceneProps {
  onNearJack: (near: boolean) => void;
  onPluggedChange: (plugged: boolean) => void;
  onInteractionChange: (active: boolean) => void;
}

function Scene({ onNearJack, onPluggedChange, onInteractionChange }: SceneProps) {
  const { camera, size } = useThree();
  const jackWorldPosRef = useRef<THREE.Vector3>(new THREE.Vector3(-1.3, 2.2, 0));

  // Compute exact 3D world coordinates from the DOM element #ipod-headphone-jack
  const updateJackPos = useCallback(() => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("ipod-headphone-jack");
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const ndcX = (cx / window.innerWidth) * 2 - 1;
    const ndcY = -(cy / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const target = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, target);

    if (target.lengthSq() > 0) {
      jackWorldPosRef.current.copy(target);
    }
  }, [camera]);

  // Recalculate on mount, size change, resize and scroll
  useEffect(() => {
    updateJackPos();
    window.addEventListener("resize", updateJackPos);
    window.addEventListener("scroll", updateJackPos, true);
    return () => {
      window.removeEventListener("resize", updateJackPos);
      window.removeEventListener("scroll", updateJackPos, true);
    };
  }, [updateJackPos, size]);

  // Also check periodically during animation in case the iPod scale/descend animation is running
  useFrame((state) => {
    if (state.clock.elapsedTime < 3.0) {
      updateJackPos();
    }
  });

  return (
    <>
      {/* Studio Lighting Rig for photorealistic glossy plastic & metallic chrome */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <directionalLight position={[-6, 4, 3]} intensity={0.6} color="#e0ecff" />
      <directionalLight position={[0, -5, 2]} intensity={0.3} color="#fff6e8" />

      {/* Procedural Lightformer Environment */}
      <Environment resolution={256}>
        {/* Overhead softbox strip */}
        <Lightformer
          form="rect"
          intensity={2.0}
          position={[0, 8, 2]}
          scale={[10, 3, 1]}
          target={[0, 0, 0]}
        />
        {/* Cool left rim light */}
        <Lightformer
          form="circle"
          intensity={1.5}
          color="#90b8f8"
          position={[-6, 2, 2]}
          scale={5}
        />
        {/* Warm right fill */}
        <Lightformer
          form="ring"
          intensity={0.8}
          color="#ffe4cc"
          position={[6, 0, 1]}
          scale={4}
        />
      </Environment>

      {/* Real Rapier Physics Engine */}
      <Physics gravity={[0, -28, 0]} interpolate timeStep={1 / 60}>
        <EarphoneCablePhysics
          jackWorldPos={jackWorldPosRef.current}
          onNearJack={onNearJack}
          onPluggedChange={onPluggedChange}
        />
      </Physics>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Exported Overlay Component                                   */
/* ------------------------------------------------------------------ */

interface EarphonesOverlayProps {
  onNearJackChange?: (near: boolean) => void;
  onPluggedChange?: (plugged: boolean) => void;
}

export default function EarphonesOverlay({
  onNearJackChange,
  onPluggedChange,
}: EarphonesOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [isNearJack, setIsNearJack] = useState(false);
  const [isPlugged, setIsPlugged] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNearJack = useCallback(
    (near: boolean) => {
      setIsNearJack(near);
      onNearJackChange?.(near);
    },
    [onNearJackChange],
  );

  const handlePlugged = useCallback(
    (plugged: boolean) => {
      setIsPlugged(plugged);
      onPluggedChange?.(plugged);
    },
    [onPluggedChange],
  );

  const handleInteraction = useCallback((active: boolean) => {
    setIsInteractive(active);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        pointerEvents: isInteractive ? "auto" : "none",
        userSelect: "none",
      }}
      onPointerEnter={() => setIsInteractive(true)}
      onPointerLeave={() => {
        // Only disable if document cursor isn't grabbing
        if (document.body.style.cursor !== "grabbing") {
          setIsInteractive(false);
        }
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{
          fov: 25,
          position: [0, 0, 14],
        }}
        eventSource={typeof window !== "undefined" ? document.body : undefined}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "auto",
        }}
      >
        <Scene
          onNearJack={handleNearJack}
          onPluggedChange={handlePlugged}
          onInteractionChange={handleInteraction}
        />
      </Canvas>

      {/* Proximity prompt near headphone jack */}
      {isNearJack && !isPlugged && (
        <div
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(10, 12, 18, 0.88)",
            border: "1px solid rgba(56, 142, 233, 0.7)",
            boxShadow: "0 0 20px rgba(56, 142, 233, 0.4)",
            borderRadius: 20,
            padding: "6px 14px",
            color: "#60a5fa",
            fontSize: 11,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontWeight: 700,
            letterSpacing: "0.08em",
            pointerEvents: "none",
            animation: "pulse 1.2s infinite ease-in-out",
            zIndex: 100,
          }}
        >
          ⚡ DROP TO PLUG IN 3.5mm JACK
        </div>
      )}
    </div>
  );
}
