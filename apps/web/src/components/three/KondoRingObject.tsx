"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { usePaperState } from "@/lib/paper-state";
import { classifyPhase, PHASE_COLOR } from "@/lib/tba";

// The real object the paper studies, rendered as an actual 3D scene rather
// than a flat perspective trick: a ring of conduction-electron channels
// (n of them, live-adjustable) carrying two impurities, S1 and S2, coupled
// by complex-conjugate strengths lambda/lambda*. Color and pulse balance
// both track the same alpha/n state used everywhere else on the site.
const R = 2;

export function KondoRingObject() {
  const { alpha, n } = usePaperState();
  const phase = classifyPhase(alpha, n);
  const phaseColor = PHASE_COLOR[phase];

  const channelAngles = useMemo(() => Array.from({ length: n }, (_, i) => (i / n) * Math.PI * 2 + 0.3), [n]);

  const imp1Angle = Math.PI * 0.82;
  const imp2Angle = -0.18 * Math.PI;
  const imp1Pos: [number, number, number] = [Math.cos(imp1Angle) * R, 0, Math.sin(imp1Angle) * R];
  const imp2Pos: [number, number, number] = [Math.cos(imp2Angle) * R, 0, Math.sin(imp2Angle) * R];

  const imp1Ref = useRef<THREE.Mesh>(null);
  const imp2Ref = useRef<THREE.Mesh>(null);
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (imp1Ref.current) imp1Ref.current.scale.setScalar(1 + 0.18 * Math.sin(t * 1.3));
    if (imp2Ref.current) imp2Ref.current.scale.setScalar(1 - 0.18 * Math.sin(t * 1.3));
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const a = channelAngles[i];
      const speed = 0.18;
      const phaseT = (((t * speed + i * 0.13) % 1) + 1) % 1;
      const rr = R + (R * 1.9 - R) * phaseT;
      mesh.position.set(Math.cos(a) * rr, 0, Math.sin(a) * rr);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.85 * Math.sin(phaseT * Math.PI);
    });
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R, 0.03, 16, 120]} />
        <meshStandardMaterial color={phaseColor} emissive={phaseColor} emissiveIntensity={0.7} transparent opacity={0.85} />
      </mesh>

      {channelAngles.map((a, i) => {
        const ex: [number, number, number] = [Math.cos(a) * R, 0, Math.sin(a) * R];
        const ox: [number, number, number] = [Math.cos(a) * R * 1.9, 0, Math.sin(a) * R * 1.9];
        return (
          <group key={i}>
            <Line points={[ex, ox]} color="#8f83ff" opacity={0.25} transparent lineWidth={1} dashed dashSize={0.06} gapSize={0.08} />
            <mesh
              ref={(el) => {
                particleRefs.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#8f83ff" emissive="#8f83ff" emissiveIntensity={1} transparent opacity={0.6} />
            </mesh>
          </group>
        );
      })}

      <mesh ref={imp1Ref} position={imp1Pos}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#6d5ef0" emissive="#6d5ef0" emissiveIntensity={1.1} />
      </mesh>
      <pointLight position={imp1Pos} color="#6d5ef0" intensity={3} distance={2.4} />

      <mesh ref={imp2Ref} position={imp2Pos}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#ff8a5c" emissive="#ff8a5c" emissiveIntensity={1.1} />
      </mesh>
      <pointLight position={imp2Pos} color="#ff8a5c" intensity={3} distance={2.4} />

      <QuadraticBezierLine start={imp1Pos} end={imp2Pos} mid={[0, 0.15, 0]} color="#a8a4bd" dashed dashSize={0.08} gapSize={0.06} lineWidth={1.2} transparent opacity={0.6} />
    </group>
  );
}
