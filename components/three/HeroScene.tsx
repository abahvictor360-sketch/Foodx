"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { BeansAndIce, CoffeeCup, type Brew } from "./CoffeeCup";
import { StudioLights } from "./Lights";

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  // Shrink the scene to fit narrow or short canvases (cup + cream + straw is ~3.8 units tall)
  const fit = useThree((s) => Math.min(1, s.viewport.width / 3.6, s.viewport.height / 4));
  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, state.pointer.x * 0.5, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -state.pointer.y * 0.15, 3, dt);
  });
  return (
    <group ref={g} scale={fit}>
      {children}
    </group>
  );
}

function SlowSpin({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.25;
  });
  return <group ref={g}>{children}</group>;
}

export default function HeroScene({ brew, active = true }: { brew: Brew; active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 7], fov: 35 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <StudioLights />
      <Rig>
        <BeansAndIce />
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
          <group rotation={[0.18, 0, -0.06]} position={[0, -0.35, 0]}>
            <SlowSpin>
              <CoffeeCup brew={brew} />
            </SlowSpin>
          </group>
        </Float>
      </Rig>
    </Canvas>
  );
}
