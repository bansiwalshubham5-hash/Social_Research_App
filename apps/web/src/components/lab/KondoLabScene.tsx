"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";

export type TransformMode = "none" | "P" | "T" | "PT";

export interface LabPhysicsSnapshot {
  n: number;
  alpha: number;
  ptOn: boolean;
  /** 0..1, null when PT symmetry is spontaneously broken (YSR window) — no defined screening state */
  normalizedEntropy: number | null;
  phaseColor: string;
  showLabels: boolean;
  transformMode: TransformMode;
  onSelect: (id: string | null) => void;
}

const MAGNET_R = 0.32;
const MAGNET_H = 1.15;
const GAIN_X = -3.4;
const LOSS_X = 3.4;

function fieldLoopPoints(azimuth: number, spread: number, segments = 48): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments; // 0..1 from north pole area to south pole area
    const theta = t * Math.PI; // 0..pi
    const r = Math.sin(theta) * spread;
    const y = Math.cos(theta) * (MAGNET_H * 0.62);
    pts.push(new THREE.Vector3(Math.cos(azimuth) * r, y, Math.sin(azimuth) * r));
  }
  return pts;
}

function Magnet({ phaseColor, showLabels, onSelect, broken }: { phaseColor: string; showLabels: boolean; onSelect: (id: string | null) => void; broken: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current && broken) {
      const t = state.clock.elapsedTime;
      groupRef.current.position.x = Math.sin(t * 26) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.position.x = 0;
    }
  });
  return (
    <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onSelect("magnet"); }}>
      <mesh position={[0, MAGNET_H * 0.25, 0]}>
        <cylinderGeometry args={[MAGNET_R, MAGNET_R, MAGNET_H * 0.5, 32]} />
        <meshStandardMaterial color="#e0524a" emissive="#e0524a" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -MAGNET_H * 0.25, 0]}>
        <cylinderGeometry args={[MAGNET_R, MAGNET_R, MAGNET_H * 0.5, 32]} />
        <meshStandardMaterial color="#2f6fdb" emissive="#2f6fdb" emissiveIntensity={0.5} />
      </mesh>
      <pointLight color={phaseColor} intensity={2.4} distance={3.5} />
      {showLabels && (
        <>
          <Html position={[0, MAGNET_H * 0.62, 0]} center distanceFactor={8} occlude={false}>
            <div style={{ color: "#ff9d8f", fontWeight: 800, fontSize: 15, fontFamily: "ui-monospace,monospace", textShadow: "0 0 6px rgba(0,0,0,0.8)" }}>N</div>
          </Html>
          <Html position={[0, -MAGNET_H * 0.62, 0]} center distanceFactor={8} occlude={false}>
            <div style={{ color: "#9fc1ff", fontWeight: 800, fontSize: 15, fontFamily: "ui-monospace,monospace", textShadow: "0 0 6px rgba(0,0,0,0.8)" }}>S</div>
          </Html>
          <Html position={[0, -MAGNET_H * 1.05, 0]} center distanceFactor={9} occlude={false}>
            <div style={{ color: "#e8e6f2", fontSize: 10, fontWeight: 700, letterSpacing: 1, fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap", textShadow: "0 0 6px rgba(0,0,0,0.9)" }}>
              MAGNETIC IMPURITY
            </div>
          </Html>
        </>
      )}
    </group>
  );
}

function FieldLines({ normalizedEntropy, transformMode }: { normalizedEntropy: number | null; transformMode: TransformMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const loops = useMemo(() => Array.from({ length: 10 }, (_, i) => fieldLoopPoints((i / 10) * Math.PI * 2, 0.9 + (i % 3) * 0.25)), []);
  const exposure = normalizedEntropy === null ? 0.5 : 0.18 + 0.42 * normalizedEntropy;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dir = transformMode === "T" || transformMode === "PT" ? -1 : 1;
    groupRef.current.rotation.y += delta * 0.12 * dir;
  });

  return (
    <group ref={groupRef}>
      {loops.map((pts, i) => (
        <Line key={i} points={pts} color="#5cc8ff" transparent opacity={exposure} lineWidth={1} />
      ))}
    </group>
  );
}

function ScreeningCloud({ normalizedEntropy }: { normalizedEntropy: number | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const screened = normalizedEntropy === null ? 0 : 1 - normalizedEntropy;
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + 0.03 * Math.sin(t * 1.4);
    const scale = (0.62 + screened * 0.5) * pulse;
    meshRef.current.scale.setScalar(scale);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.opacity = 0.05 + screened * 0.22;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.35, 32, 32]} />
      <meshStandardMaterial color="#8f83ff" emissive="#8f83ff" emissiveIntensity={0.4} transparent opacity={0.1} depthWrite={false} />
    </mesh>
  );
}

interface Electron {
  angle: number;
  radiusOffset: number;
  spin: 1 | -1;
  flipCooldown: number;
}

const ELECTRON_INDICES = [0, 1, 2];

function Channel({
  index,
  n,
  normalizedEntropy,
  transformMode,
  showLabels,
  onSelect,
}: {
  index: number;
  n: number;
  normalizedEntropy: number | null;
  transformMode: TransformMode;
  showLabels: boolean;
  onSelect: (id: string | null) => void;
}) {
  const azimuth = (index / n) * Math.PI * 2 + 0.4;
  const farPoint = useMemo(() => new THREE.Vector3(Math.cos(azimuth) * 3.6, 0, Math.sin(azimuth) * 3.6), [azimuth]);
  const nearPoint = useMemo(() => new THREE.Vector3(Math.cos(azimuth) * 1.5, 0, Math.sin(azimuth) * 1.5), [azimuth]);
  const linePts = useMemo(() => [farPoint, nearPoint], [farPoint, nearPoint]);

  const electronsRef = useRef<Electron[]>(
    Array.from({ length: 3 }, (_, i) => ({ angle: 0, radiusOffset: i / 3, spin: i % 2 === 0 ? 1 : -1, flipCooldown: 0 }))
  );
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const arrowRefs = useRef<(THREE.Group | null)[]>([]);
  const hue = (index / n) * 0.6 + 0.55;
  const color = useMemo(() => new THREE.Color().setHSL(hue % 1, 0.65, 0.62), [hue]);

  const disorder = normalizedEntropy === null ? 0.9 : normalizedEntropy;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const dir = transformMode === "T" || transformMode === "PT" ? -1 : 1;
    const flipRate = 0.15 + disorder * 2.2;
    electronsRef.current.forEach((e, i) => {
      const speed = (0.22 + disorder * 0.35) * dir;
      const phaseT = (((t * speed + e.radiusOffset) % 1) + 1) % 1;
      const r = THREE.MathUtils.lerp(3.6, 1.55, phaseT);
      const wob = Math.sin(t * 2 + i) * 0.06 * disorder;
      const mesh = meshRefs.current[i];
      if (mesh) mesh.position.set(Math.cos(azimuth) * r, wob, Math.sin(azimuth) * r);

      e.flipCooldown -= delta;
      if (e.flipCooldown <= 0) {
        if (Math.random() < flipRate * 0.15) e.spin = e.spin === 1 ? -1 : 1;
        e.flipCooldown = 0.12;
      }
      const arrow = arrowRefs.current[i];
      if (arrow) {
        arrow.position.copy(mesh ? mesh.position : arrow.position);
        arrow.position.y += 0.001;
        const targetRot = e.spin === 1 ? 0 : Math.PI;
        arrow.rotation.z = THREE.MathUtils.lerp(arrow.rotation.z, targetRot, 0.25);
      }
    });
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(`channel-${index}`); }}>
      <Line points={linePts} color={color} transparent opacity={0.28} lineWidth={1} dashed dashSize={0.12} gapSize={0.1} />
      {ELECTRON_INDICES.map((i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
          </mesh>
          <group
            ref={(el) => {
              arrowRefs.current[i] = el;
            }}
          >
            <mesh position={[0, 0.1, 0]}>
              <coneGeometry args={[0.03, 0.1, 6]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
            </mesh>
          </group>
        </group>
      ))}
      {showLabels && (
        <Html position={[farPoint.x, farPoint.y - 0.35, farPoint.z]} center distanceFactor={10} occlude={false}>
          <div style={{ color: "#cfd0e6", fontSize: 9, fontWeight: 700, fontFamily: "ui-monospace,monospace", whiteSpace: "nowrap", textShadow: "0 0 6px rgba(0,0,0,0.9)" }}>
            CHANNEL {index + 1}
          </div>
        </Html>
      )}
    </group>
  );
}

function Reservoir({ side, active, showLabels, onSelect }: { side: "gain" | "loss"; active: boolean; showLabels: boolean; onSelect: (id: string | null) => void }) {
  const x = side === "gain" ? GAIN_X : LOSS_X;
  const color = side === "gain" ? "#4ade80" : "#f97066";
  const label = side === "gain" ? "GAIN" : "LOSS";
  const groupRef = useRef<THREE.Group>(null);
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const count = 6;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!active) {
      particleRefs.current.forEach((p) => { if (p) p.visible = false; });
      return;
    }
    particleRefs.current.forEach((p, i) => {
      if (!p) return;
      p.visible = true;
      const phaseT = (((t * 0.35 + i / count) % 1) + 1) % 1;
      const start = side === "gain" ? x : 0;
      const end = side === "gain" ? 0 : x;
      const px = THREE.MathUtils.lerp(start, end, phaseT);
      p.position.set(px, Math.sin(phaseT * Math.PI * 2 + i) * 0.15, Math.cos(i * 1.7) * 0.15);
      const mat = p.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.sin(phaseT * Math.PI);
    });
  });

  return (
    <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onSelect(side); }}>
      <mesh position={[x, 0, 0]}>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.35} />
      </mesh>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.8} />
        </mesh>
      ))}
      {showLabels && (
        <Html position={[x, 0.45, 0]} center distanceFactor={9} occlude={false}>
          <div style={{ color, fontSize: 11, fontWeight: 800, fontFamily: "ui-monospace,monospace", letterSpacing: 1, textShadow: "0 0 6px rgba(0,0,0,0.9)" }}>{label}</div>
        </Html>
      )}
    </group>
  );
}

export function KondoLabScene({ n, alpha, ptOn, normalizedEntropy, phaseColor, showLabels, transformMode, onSelect }: LabPhysicsSnapshot) {
  const [, setHoverId] = useState<string | null>(null);
  void alpha;
  const broken = normalizedEntropy === null;
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!sceneGroupRef.current) return;
    const mirrored = transformMode === "P" || transformMode === "PT";
    const targetScaleX = mirrored ? -1 : 1;
    sceneGroupRef.current.scale.x = THREE.MathUtils.lerp(sceneGroupRef.current.scale.x, targetScaleX, 0.08);
  });

  return (
    <group
      ref={sceneGroupRef}
      onPointerMissed={() => onSelect(null)}
      onPointerOut={() => setHoverId(null)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={0.6} />
      <Magnet phaseColor={phaseColor} showLabels={showLabels} onSelect={onSelect} broken={broken} />
      <FieldLines normalizedEntropy={normalizedEntropy} transformMode={transformMode} />
      <ScreeningCloud normalizedEntropy={normalizedEntropy} />
      {Array.from({ length: n }, (_, i) => (
        <Channel
          key={i}
          index={i}
          n={n}
          normalizedEntropy={normalizedEntropy}
          transformMode={transformMode}
          showLabels={showLabels && i < 3}
          onSelect={onSelect}
        />
      ))}
      <Reservoir side="gain" active={ptOn} showLabels={showLabels} onSelect={onSelect} />
      <Reservoir side="loss" active={ptOn} showLabels={showLabels} onSelect={onSelect} />
    </group>
  );
}
