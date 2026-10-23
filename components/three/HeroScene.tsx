"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Donut } from "./Donut";
import { StudioLights } from "./Lights";

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  // Shrink the scene to fit narrow canvases (the donut is ~3.6 units wide with its bubbles)
  const fit = useThree((s) => Math.min(1, s.viewport.width / 4.2, s.viewport.height / 3.6));
  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, state.pointer.x * 0.35, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -state.pointer.y * 0.2, 3, dt);
  });
  return (
    <group ref={g} scale={fit}>
      {children}
    </group>
  );
}

function GlassBubble({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <Float speed={2} floatIntensity={1.4} rotationIntensity={0.6}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        {/* Faked glass: transmission renders black on some mobile GPUs over a transparent canvas */}
        <meshPhysicalMaterial
          color="#fff6ea"
          transparent
          opacity={0.18}
          roughness={0.02}
          metalness={0.1}
          clearcoat={1}
          iridescence={1}
          iridescenceIOR={1.3}
          envMapIntensity={2.5}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

function FallingSprinkles({ count = 70 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.random() - 0.5) * 9,
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 3 - 1,
        speed: 0.2 + Math.random() * 0.4,
        rot: Math.random() * Math.PI,
        color: ["#ff5d8f", "#ffd23f", "#3bceac", "#f6eecf", "#ff8c42"][i % 5],
      })),
    [count]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colored = useRef(false);

  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m) return;
    data.forEach((d, i) => {
      d.y -= d.speed * dt;
      d.rot += dt * d.speed * 2;
      if (d.y < -3.8) d.y = 3.8;
      dummy.position.set(d.x, d.y, d.z);
      dummy.rotation.set(d.rot, d.rot * 0.7, d.rot * 0.3);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      if (!colored.current) m.setColorAt(i, new THREE.Color(d.color));
    });
    colored.current = true;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.03, 0.12, 4, 8]} />
      <meshStandardMaterial roughness={0.5} />
    </instancedMesh>
  );
}

export default function HeroScene({ icing, active = true }: { icing: string; active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 35 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <StudioLights />
      <FallingSprinkles />
      <Rig>
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
          <Donut icing={icing} rotation={[-1.05, 0.25, 0]} scale={1.15} />
        </Float>
        <GlassBubble position={[1.5, 1.0, 0.6]} scale={0.32} />
        <GlassBubble position={[-1.5, -0.9, 0.8]} scale={0.22} />
      </Rig>
    </Canvas>
  );
}
