"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import {
  RigidBody,
  BallCollider,
  useRopeJoint,
  useSphericalJoint,
  RapierRigidBody,
} from "@react-three/rapier";
import AudioPlug35mm from "./AudioPlug35mm";
import EarPodsMesh from "./EarPodsMesh";
import { useAudio } from "@/context/AudioContext";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SEG_LEN = 0.55; // rope segment rest length
const CABLE_RADIUS = 0.032;
const CABLE_TUBE_SEGS = 48;
const CABLE_RADIAL_SEGS = 8;

// Main chain: anchor -> j1 -> j2(mic) -> j3 -> j4 -> j5 -> j6 -> plug
const MAIN_CHAIN_COUNT = 6;

// EarPod branch: 2 joints per side from anchor
const EAR_BRANCH_COUNT = 2;

// Anchor position (top-left viewport edge)
const ANCHOR_POS: [number, number, number] = [-3.8, 4.6, 0];

// Damping for real rubber-cable feel
const LINEAR_DAMP = 2.4;
const ANGULAR_DAMP = 3.2;

// Drag smoothing
const LERP_MIN_SPEED = 12;
const LERP_MAX_SPEED = 55;

// Snap-in thresholds
const NEAR_JACK_DIST = 1.1;
const SNAP_DIST = 0.55;
const MAGNETIC_DIST = 0.35;

// Max cable stretch factor
const MAX_STRETCH = 0.96;
const TOTAL_ROPE_LEN = SEG_LEN * (MAIN_CHAIN_COUNT + 1);

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

/** Convert Three.js Vector3 to plain object for Rapier */
function v3(v: THREE.Vector3) {
  return { x: v.x, y: v.y, z: v.z };
}

/** Raycast pointer onto z=0 plane */
function pointerToWorld(
  pointer: THREE.Vector2,
  camera: THREE.Camera,
  target: THREE.Vector3,
): THREE.Vector3 {
  const ray = new THREE.Raycaster();
  ray.setFromCamera(pointer, camera);
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  ray.ray.intersectPlane(plane, target);
  return target;
}

/* ------------------------------------------------------------------ */
/*  Rope joint wrapper components                                     */
/* ------------------------------------------------------------------ */

function RopeJoint({
  a,
  b,
  len,
}: {
  a: React.RefObject<RapierRigidBody | null>;
  b: React.RefObject<RapierRigidBody | null>;
  len: number;
}) {
  useRopeJoint(
    a as unknown as React.RefObject<RapierRigidBody>,
    b as unknown as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], len],
  );
  return null;
}

function SphJoint({
  a,
  b,
  anchorA,
  anchorB,
}: {
  a: React.RefObject<RapierRigidBody | null>;
  b: React.RefObject<RapierRigidBody | null>;
  anchorA: [number, number, number];
  anchorB: [number, number, number];
}) {
  useSphericalJoint(
    a as unknown as React.RefObject<RapierRigidBody>,
    b as unknown as React.RefObject<RapierRigidBody>,
    [anchorA, anchorB],
  );
  return null;
}

/* ------------------------------------------------------------------ */
/*  Cable tube geometry updater (zero-GC per frame)                   */
/* ------------------------------------------------------------------ */

function CableTube({
  controlPointsRef,
}: {
  controlPointsRef: React.RefObject<THREE.Vector3[] | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Pre-allocate curve and geometry
  const curve = useMemo(() => new THREE.CatmullRomCurve3([], false, "chordal", 0.5), []);

  useFrame(() => {
    const pts = controlPointsRef.current;
    if (!pts || pts.length < 2 || !meshRef.current) return;

    curve.points = pts;
    const tubeGeo = new THREE.TubeGeometry(
      curve,
      CABLE_TUBE_SEGS,
      CABLE_RADIUS,
      CABLE_RADIAL_SEGS,
      false,
    );
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = tubeGeo;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, -1, 0),
        ]),
        CABLE_TUBE_SEGS,
        CABLE_RADIUS,
        CABLE_RADIAL_SEGS,
        false,
      ]} />
      <meshPhysicalMaterial
        color="#F2F3F6"
        roughness={0.34}
        metalness={0.02}
        clearcoat={0.28}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Ear branch cable tube                                             */
/* ------------------------------------------------------------------ */

function EarBranchTube({
  controlPointsRef,
}: {
  controlPointsRef: React.RefObject<THREE.Vector3[] | null>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([], false, "chordal", 0.5), []);

  useFrame(() => {
    const pts = controlPointsRef.current;
    if (!pts || pts.length < 2 || !meshRef.current) return;
    curve.points = pts;
    const tubeGeo = new THREE.TubeGeometry(curve, 24, CABLE_RADIUS * 0.85, 6, false);
    meshRef.current.geometry.dispose();
    meshRef.current.geometry = tubeGeo;
  });

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[
        new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)]),
        24, CABLE_RADIUS * 0.85, 6, false,
      ]} />
      <meshPhysicalMaterial
        color="#F2F3F6"
        roughness={0.34}
        metalness={0.02}
        clearcoat={0.28}
        clearcoatRoughness={0.3}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline mic pill mesh                                              */
/* ------------------------------------------------------------------ */

function MicPill() {
  return (
    <group>
      <mesh>
        <capsuleGeometry args={[0.04, 0.16, 8, 16]} />
        <meshPhysicalMaterial
          color="#FAFAFC"
          roughness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Tiny dark mic hole */}
      <mesh position={[0, 0, 0.042]}>
        <circleGeometry args={[0.016, 12]} />
        <meshStandardMaterial color="#333" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Main physics component                                            */
/* ------------------------------------------------------------------ */

interface EarphoneCablePhysicsProps {
  jackWorldPos: THREE.Vector3;
  onNearJack: (near: boolean) => void;
  onPluggedChange: (plugged: boolean) => void;
}

export default function EarphoneCablePhysics({
  jackWorldPos,
  onNearJack,
  onPluggedChange,
}: EarphoneCablePhysicsProps) {
  const { camera } = useThree();
  const audio = useAudio();

  /* ---- Rigid body refs ---- */
  const anchorRef = useRef<RapierRigidBody>(null);
  const mainRefs = useRef<(React.RefObject<RapierRigidBody | null>)[]>([]);
  const plugRef = useRef<RapierRigidBody>(null);

  // EarPod branch refs
  const earLRefs = useRef<(React.RefObject<RapierRigidBody | null>)[]>([]);
  const earRRefs = useRef<(React.RefObject<RapierRigidBody | null>)[]>([]);
  const earPodLRef = useRef<RapierRigidBody>(null);
  const earPodRRef = useRef<RapierRigidBody>(null);

  // Lazy-init refs arrays
  if (mainRefs.current.length === 0) {
    for (let i = 0; i < MAIN_CHAIN_COUNT; i++) {
      mainRefs.current.push(React.createRef<RapierRigidBody>());
    }
  }
  if (earLRefs.current.length === 0) {
    for (let i = 0; i < EAR_BRANCH_COUNT; i++) {
      earLRefs.current.push(React.createRef<RapierRigidBody>());
    }
  }
  if (earRRefs.current.length === 0) {
    for (let i = 0; i < EAR_BRANCH_COUNT; i++) {
      earRRefs.current.push(React.createRef<RapierRigidBody>());
    }
  }

  /* ---- Smoothed control points ---- */
  const smoothedMainPts = useRef<THREE.Vector3[]>(
    Array.from({ length: MAIN_CHAIN_COUNT + 2 }, () => new THREE.Vector3()),
  );
  const mainCableControlPtsRef = useRef<THREE.Vector3[]>(smoothedMainPts.current);

  const smoothedEarL = useRef<THREE.Vector3[]>(
    Array.from({ length: EAR_BRANCH_COUNT + 2 }, () => new THREE.Vector3()),
  );
  const earLControlPtsRef = useRef<THREE.Vector3[]>(smoothedEarL.current);

  const smoothedEarR = useRef<THREE.Vector3[]>(
    Array.from({ length: EAR_BRANCH_COUNT + 2 }, () => new THREE.Vector3()),
  );
  const earRControlPtsRef = useRef<THREE.Vector3[]>(smoothedEarR.current);

  /* ---- Plug mesh visual ref ---- */
  const plugVisualRef = useRef<THREE.Group>(null);
  const earPodLVisualRef = useRef<THREE.Group>(null);
  const earPodRVisualRef = useRef<THREE.Group>(null);
  const micVisualRef = useRef<THREE.Group>(null);

  /* ---- Drag state ---- */
  const [isDragging, setIsDragging] = useState(false);
  const dragTarget = useRef<THREE.Vector3>(new THREE.Vector3());
  const dragVelocity = useRef<THREE.Vector3>(new THREE.Vector3());
  const prevDragPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const isPlugged = useRef(false);
  const isSnapping = useRef(false);
  const wasNear = useRef(false);

  /* ---- Plug mesh refs for interactivity ---- */
  const plugMeshRef = useRef<THREE.Group>(null);

  /* ---- Pointer handlers for drag ---- */
  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();

      if (isPlugged.current) {
        // Start unplug drag
        isPlugged.current = false;
        isSnapping.current = false;
        onPluggedChange(false);
        audio.unplug();
      }

      const body = plugRef.current;
      if (!body) return;

      body.setBodyType(2, true); // kinematicPosition
      setIsDragging(true);

      const pt = e.point;
      dragTarget.current.copy(pt);
      prevDragPos.current.copy(pt);
      dragVelocity.current.set(0, 0, 0);

      // Wake up all chain nodes
      mainRefs.current.forEach((r) => r.current?.wakeUp());

      // Set cursor style
      document.body.style.cursor = "grabbing";
    },
    [audio, onPluggedChange],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    const body = plugRef.current;
    if (!body) return;

    setIsDragging(false);
    document.body.style.cursor = "";

    // Check if near jack -> snap
    const plugPos = body.translation();
    const dist = new THREE.Vector3(plugPos.x, plugPos.y, plugPos.z).distanceTo(
      jackWorldPos,
    );

    if (dist < SNAP_DIST) {
      // Snap in!
      isPlugged.current = true;
      isSnapping.current = true;
      onPluggedChange(true);
      audio.plugIn();
      onNearJack(false);
      return;
    }

    // Release with velocity impulse
    body.setBodyType(0, true); // dynamic
    const vel = dragVelocity.current;
    const impulseScale = 0.5;
    body.applyImpulse(
      {
        x: clamp(vel.x * impulseScale, -4, 4),
        y: clamp(vel.y * impulseScale, -4, 4),
        z: 0,
      },
      true,
    );
  }, [isDragging, jackWorldPos, onPluggedChange, onNearJack, audio]);

  // Attach global pointer up handler
  useEffect(() => {
    const up = () => {
      if (isDragging) handlePointerUp();
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, [isDragging, handlePointerUp]);

  /* ---- useFrame: smoothing, dragging, snapping, wind nudge ---- */
  const _worldPt = useMemo(() => new THREE.Vector3(), []);
  const _pointerVec = useMemo(() => new THREE.Vector2(), []);

  useFrame((state, delta) => {
    const body = plugRef.current;
    if (!body) return;

    /* -- Drag update -- */
    if (isDragging) {
      _pointerVec.set(state.pointer.x, state.pointer.y);
      pointerToWorld(_pointerVec, camera, _worldPt);

      // Clamp to max rope length from anchor
      const anchorV = new THREE.Vector3(...ANCHOR_POS);
      const dist = _worldPt.distanceTo(anchorV);
      if (dist > TOTAL_ROPE_LEN * MAX_STRETCH) {
        _worldPt.sub(anchorV).normalize().multiplyScalar(TOTAL_ROPE_LEN * MAX_STRETCH).add(anchorV);
      }

      // Track velocity
      dragVelocity.current.copy(_worldPt).sub(prevDragPos.current).divideScalar(Math.max(delta, 0.001));
      prevDragPos.current.copy(_worldPt);

      body.setNextKinematicTranslation(v3(_worldPt));

      // Check proximity to jack
      const plugPos = body.translation();
      const jackDist = new THREE.Vector3(plugPos.x, plugPos.y, plugPos.z).distanceTo(jackWorldPos);
      const isNear = jackDist < NEAR_JACK_DIST;
      if (isNear !== wasNear.current) {
        wasNear.current = isNear;
        onNearJack(isNear);
      }

      // Auto-magnetic pull at very close range
      if (jackDist < MAGNETIC_DIST) {
        isPlugged.current = true;
        isSnapping.current = true;
        setIsDragging(false);
        document.body.style.cursor = "";
        onPluggedChange(true);
        audio.plugIn();
        onNearJack(false);
      }
    }

    /* -- Snap-in animation -- */
    if (isSnapping.current) {
      const plugPos = body.translation();
      const target = jackWorldPos.clone().add(new THREE.Vector3(0, -0.22, 0));
      const current = new THREE.Vector3(plugPos.x, plugPos.y, plugPos.z);
      current.lerp(target, delta * 12);
      body.setBodyType(2, true);
      body.setNextKinematicTranslation(v3(current));

      if (current.distanceTo(target) < 0.01) {
        isSnapping.current = false;
      }
    }

    /* -- Cursor wind nudge (when not dragging) -- */
    if (!isDragging && !isPlugged.current) {
      const speed = Math.sqrt(
        state.pointer.x * state.pointer.x + state.pointer.y * state.pointer.y,
      );
      if (speed > 0.01) {
        _pointerVec.set(state.pointer.x, state.pointer.y);
        pointerToWorld(_pointerVec, camera, _worldPt);

        for (let i = 1; i < MAIN_CHAIN_COUNT - 1; i++) {
          const ref = mainRefs.current[i]?.current;
          if (!ref) continue;
          const pos = ref.translation();
          const nodePos = new THREE.Vector3(pos.x, pos.y, pos.z);
          const d = nodePos.distanceTo(_worldPt);
          if (d < 1.2) {
            const force = _worldPt.clone().sub(nodePos).normalize().multiplyScalar(0.08 * (1.2 - d));
            ref.applyImpulse(v3(force), true);
          }
        }
      }
    }

    /* -- Smooth control points for main cable -- */
    const smPts = smoothedMainPts.current;
    // First point: anchor
    if (anchorRef.current) {
      const t = anchorRef.current.translation();
      smPts[0].set(t.x, t.y, t.z);
    }
    // Chain nodes
    for (let i = 0; i < MAIN_CHAIN_COUNT; i++) {
      const ref = mainRefs.current[i]?.current;
      if (!ref) continue;
      const raw = ref.translation();
      const rawV = new THREE.Vector3(raw.x, raw.y, raw.z);
      const sm = smPts[i + 1];
      const d = clamp(sm.distanceTo(rawV), 0.1, 1);
      const lerpSpeed = LERP_MIN_SPEED + d * (LERP_MAX_SPEED - LERP_MIN_SPEED);
      sm.lerp(rawV, Math.min(1, delta * lerpSpeed));
    }
    // Last point: plug
    {
      const t = body.translation();
      const rawV = new THREE.Vector3(t.x, t.y, t.z);
      const sm = smPts[MAIN_CHAIN_COUNT + 1];
      const d = clamp(sm.distanceTo(rawV), 0.1, 1);
      const lerpSpeed = LERP_MIN_SPEED + d * (LERP_MAX_SPEED - LERP_MIN_SPEED);
      sm.lerp(rawV, Math.min(1, delta * lerpSpeed));
    }
    mainCableControlPtsRef.current = smPts;

    /* -- Smooth ear branch L -- */
    {
      const smL = smoothedEarL.current;
      if (anchorRef.current) {
        const t = anchorRef.current.translation();
        smL[0].set(t.x, t.y, t.z);
      }
      for (let i = 0; i < EAR_BRANCH_COUNT; i++) {
        const ref = earLRefs.current[i]?.current;
        if (!ref) continue;
        const raw = ref.translation();
        const rawV = new THREE.Vector3(raw.x, raw.y, raw.z);
        smL[i + 1].lerp(rawV, Math.min(1, delta * 20));
      }
      if (earPodLRef.current) {
        const t = earPodLRef.current.translation();
        smL[EAR_BRANCH_COUNT + 1].lerp(new THREE.Vector3(t.x, t.y, t.z), Math.min(1, delta * 20));
      }
      earLControlPtsRef.current = smL;
    }

    /* -- Smooth ear branch R -- */
    {
      const smR = smoothedEarR.current;
      if (anchorRef.current) {
        const t = anchorRef.current.translation();
        smR[0].set(t.x, t.y, t.z);
      }
      for (let i = 0; i < EAR_BRANCH_COUNT; i++) {
        const ref = earRRefs.current[i]?.current;
        if (!ref) continue;
        const raw = ref.translation();
        const rawV = new THREE.Vector3(raw.x, raw.y, raw.z);
        smR[i + 1].lerp(rawV, Math.min(1, delta * 20));
      }
      if (earPodRRef.current) {
        const t = earPodRRef.current.translation();
        smR[EAR_BRANCH_COUNT + 1].lerp(new THREE.Vector3(t.x, t.y, t.z), Math.min(1, delta * 20));
      }
      earRControlPtsRef.current = smR;
    }

    /* -- Sync plug visual to plug body -- */
    if (plugVisualRef.current) {
      const t = body.translation();
      const r = body.rotation();
      plugVisualRef.current.position.set(t.x, t.y, t.z);
      plugVisualRef.current.quaternion.set(r.x, r.y, r.z, r.w);
    }

    /* -- Sync EarPod visuals -- */
    if (earPodLVisualRef.current && earPodLRef.current) {
      const t = earPodLRef.current.translation();
      const r = earPodLRef.current.rotation();
      earPodLVisualRef.current.position.set(t.x, t.y, t.z);
      earPodLVisualRef.current.quaternion.set(r.x, r.y, r.z, r.w);
    }
    if (earPodRVisualRef.current && earPodRRef.current) {
      const t = earPodRRef.current.translation();
      const r = earPodRRef.current.rotation();
      earPodRVisualRef.current.position.set(t.x, t.y, t.z);
      earPodRVisualRef.current.quaternion.set(r.x, r.y, r.z, r.w);
    }

    /* -- Sync mic visual to j2 -- */
    if (micVisualRef.current && mainRefs.current[1]?.current) {
      const ref = mainRefs.current[1].current;
      const t = ref.translation();
      const r = ref.rotation();
      micVisualRef.current.position.set(t.x, t.y, t.z);
      micVisualRef.current.quaternion.set(r.x, r.y, r.z, r.w);
    }
  });

  /* ---- Joint generation ---- */
  const joints = useMemo(() => {
    const result: React.ReactNode[] = [];

    // Anchor -> j1
    result.push(
      <RopeJoint key="a-j1" a={anchorRef} b={mainRefs.current[0]} len={SEG_LEN} />,
    );
    // j1 -> j2 -> ... -> j6
    for (let i = 0; i < MAIN_CHAIN_COUNT - 1; i++) {
      result.push(
        <RopeJoint
          key={`j${i}-j${i + 1}`}
          a={mainRefs.current[i]}
          b={mainRefs.current[i + 1]}
          len={SEG_LEN}
        />,
      );
    }
    // j6 -> plug (spherical with offset for collar top)
    result.push(
      <SphJoint
        key="j6-plug"
        a={mainRefs.current[MAIN_CHAIN_COUNT - 1]}
        b={plugRef}
        anchorA={[0, 0, 0]}
        anchorB={[0, 0.38, 0]}
      />,
    );

    // Ear branch L: anchor -> eL1 -> eL2 -> earPodL
    result.push(
      <RopeJoint key="a-eL1" a={anchorRef} b={earLRefs.current[0]} len={SEG_LEN * 0.5} />,
    );
    for (let i = 0; i < EAR_BRANCH_COUNT - 1; i++) {
      result.push(
        <RopeJoint key={`eL${i}-eL${i + 1}`} a={earLRefs.current[i]} b={earLRefs.current[i + 1]} len={SEG_LEN * 0.5} />,
      );
    }
    result.push(
      <SphJoint
        key="eL-pod"
        a={earLRefs.current[EAR_BRANCH_COUNT - 1]}
        b={earPodLRef}
        anchorA={[0, 0, 0]}
        anchorB={[0, -0.35, 0]}
      />,
    );

    // Ear branch R: anchor -> eR1 -> eR2 -> earPodR
    result.push(
      <RopeJoint key="a-eR1" a={anchorRef} b={earRRefs.current[0]} len={SEG_LEN * 0.5} />,
    );
    for (let i = 0; i < EAR_BRANCH_COUNT - 1; i++) {
      result.push(
        <RopeJoint key={`eR${i}-eR${i + 1}`} a={earRRefs.current[i]} b={earRRefs.current[i + 1]} len={SEG_LEN * 0.5} />,
      );
    }
    result.push(
      <SphJoint
        key="eR-pod"
        a={earRRefs.current[EAR_BRANCH_COUNT - 1]}
        b={earPodRRef}
        anchorA={[0, 0, 0]}
        anchorB={[0, -0.35, 0]}
      />,
    );

    return result;
  }, []);

  /* ---- Render ---- */
  return (
    <group>
      {/* Physics joints */}
      {joints}

      {/* Fixed anchor (invisible, top-left) */}
      <RigidBody ref={anchorRef} type="fixed" position={ANCHOR_POS} colliders={false}>
        <BallCollider args={[0.04]} />
      </RigidBody>

      {/* Main chain nodes j1..j6 */}
      {mainRefs.current.map((ref, i) => (
        <RigidBody
          key={`main-${i}`}
          ref={ref}
          position={[
            ANCHOR_POS[0],
            ANCHOR_POS[1] - (i + 1) * SEG_LEN,
            0,
          ]}
          colliders={false}
          linearDamping={LINEAR_DAMP}
          angularDamping={ANGULAR_DAMP}
          canSleep={false}
          mass={i === 1 ? 1.4 : 0.6} // j2 heavier for mic
        >
          <BallCollider args={[0.08]} />
        </RigidBody>
      ))}

      {/* Plug rigid body */}
      <RigidBody
        ref={plugRef}
        position={[
          ANCHOR_POS[0],
          ANCHOR_POS[1] - (MAIN_CHAIN_COUNT + 1) * SEG_LEN,
          0,
        ]}
        colliders={false}
        linearDamping={LINEAR_DAMP}
        angularDamping={ANGULAR_DAMP}
        canSleep={false}
        mass={0.8}
      >
        <BallCollider args={[0.12]} />
      </RigidBody>

      {/* Plug visual (follows plug body) */}
      <group
        ref={plugVisualRef}
        onPointerDown={handlePointerDown as unknown as React.PointerEventHandler<THREE.Object3D>}
        onPointerEnter={() => { if (!isDragging) document.body.style.cursor = "grab"; }}
        onPointerLeave={() => { if (!isDragging) document.body.style.cursor = ""; }}
      >
        <mesh>
          {/* Invisible hit area for easier grabbing */}
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <AudioPlug35mm />
      </group>

      {/* Ear branch L nodes */}
      {earLRefs.current.map((ref, i) => (
        <RigidBody
          key={`earL-${i}`}
          ref={ref}
          position={[
            ANCHOR_POS[0] - 0.3,
            ANCHOR_POS[1] + (i + 1) * SEG_LEN * 0.5,
            0,
          ]}
          colliders={false}
          linearDamping={LINEAR_DAMP}
          angularDamping={ANGULAR_DAMP}
          canSleep={false}
          mass={0.3}
        >
          <BallCollider args={[0.06]} />
        </RigidBody>
      ))}

      {/* Ear branch R nodes */}
      {earRRefs.current.map((ref, i) => (
        <RigidBody
          key={`earR-${i}`}
          ref={ref}
          position={[
            ANCHOR_POS[0] + 0.3,
            ANCHOR_POS[1] + (i + 1) * SEG_LEN * 0.5,
            0,
          ]}
          colliders={false}
          linearDamping={LINEAR_DAMP}
          angularDamping={ANGULAR_DAMP}
          canSleep={false}
          mass={0.3}
        >
          <BallCollider args={[0.06]} />
        </RigidBody>
      ))}

      {/* EarPod L rigid body */}
      <RigidBody
        ref={earPodLRef}
        position={[
          ANCHOR_POS[0] - 0.5,
          ANCHOR_POS[1] + (EAR_BRANCH_COUNT + 1) * SEG_LEN * 0.5,
          0,
        ]}
        colliders={false}
        linearDamping={LINEAR_DAMP}
        angularDamping={ANGULAR_DAMP}
        canSleep={false}
        mass={0.4}
      >
        <BallCollider args={[0.14]} />
      </RigidBody>

      {/* EarPod R rigid body */}
      <RigidBody
        ref={earPodRRef}
        position={[
          ANCHOR_POS[0] + 0.5,
          ANCHOR_POS[1] + (EAR_BRANCH_COUNT + 1) * SEG_LEN * 0.5,
          0,
        ]}
        colliders={false}
        linearDamping={LINEAR_DAMP}
        angularDamping={ANGULAR_DAMP}
        canSleep={false}
        mass={0.4}
      >
        <BallCollider args={[0.14]} />
      </RigidBody>

      {/* EarPod visual meshes */}
      <group ref={earPodLVisualRef}>
        <EarPodsMesh />
      </group>
      <group ref={earPodRVisualRef}>
        <EarPodsMesh mirror />
      </group>

      {/* Inline mic visual (follows j2) */}
      <group ref={micVisualRef}>
        <MicPill />
      </group>

      {/* Cable tube renderers */}
      <CableTube controlPointsRef={mainCableControlPtsRef} />
      <EarBranchTube controlPointsRef={earLControlPtsRef} />
      <EarBranchTube controlPointsRef={earRControlPtsRef} />
    </group>
  );
}
