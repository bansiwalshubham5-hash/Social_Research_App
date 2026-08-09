"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { KondoRingObject } from "./KondoRingObject";

interface Props {
  autoRotate: boolean;
  onInteractStart: () => void;
}

// The actual WebGL canvas — kept in its own module so the page that uses it
// can `next/dynamic(..., { ssr: false })` it without dragging react-three-fiber
// into the server bundle at all.
export default function KondoRingCanvas({ autoRotate, onInteractStart }: Props) {
  return (
    <Canvas camera={{ position: [0, 2.3, 4.4], fov: 42 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={0.7} />
      <KondoRingObject />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={2.6}
        maxDistance={7}
        autoRotate={autoRotate}
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.08}
        onStart={onInteractStart}
      />
    </Canvas>
  );
}
