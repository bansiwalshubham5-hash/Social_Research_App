"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { KondoLabScene, type LabPhysicsSnapshot } from "./KondoLabScene";

interface Props extends LabPhysicsSnapshot {
  autoRotate: boolean;
  onInteractStart: () => void;
}

export default function KondoLabCanvas({ autoRotate, onInteractStart, ...snapshot }: Props) {
  return (
    <Canvas camera={{ position: [0, 1.8, 5.2], fov: 44 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <KondoLabScene {...snapshot} />
      <OrbitControls
        enablePan
        enableZoom
        minDistance={2.8}
        maxDistance={9}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
        onStart={onInteractStart}
      />
    </Canvas>
  );
}
