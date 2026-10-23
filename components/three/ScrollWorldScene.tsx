"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Donut } from "./Donut";
import { StudioLights } from "./Lights";

/** Treats placed along the camera's flight path. z is the depth where it lives. */
const PLACEMENTS: { url: string; pos: [number, number, number]; h: number; spin?: number }[] = [
  { url: "/images/donut-pink.webp", pos: [-2.2, 0.9, 2], h: 1.6 },
  { url: "/images/donut-drip.webp", pos: [2.4, -0.6, 0], h: 2.4 },
  { url: "/images/cinnamon-rolls.webp", pos: [-2.6, -1.2, -4], h: 1.8 },
  { url: "/images/donut-choco.webp", pos: [2.2, 1.2, -6], h: 1.8 },
  { url: "/images/cupcake-lollipop.webp", pos: [-2.4, 0.6, -12], h: 2.6 },
  { url: "/images/cupcake-vanilla.webp", pos: [2.6, -0.8, -14], h: 2.4 },
  { url: "/images/cupcake-strawberry.webp", pos: [-1.6, -1.6, -17], h: 2 },
  { url: "/images/shortcake.webp", pos: [1.8, 1.5, -10], h: 1.8 },
  { url: "/images/cupcake-berry.webp", pos: [0.6, -1.8, -15.5], h: 1.6 },
  { url: "/images/cream-horns.webp", pos: [-2.3, 1.6, -7.5], h: 1.4 },
  { url: "/images/iced-coffee.webp", pos: [2.4, 0.4, -23], h: 2.8 },
  { url: "/images/boba-frappe.webp", pos: [-2.6, 0.2, -25], h: 2.6 },
  { url: "/images/shake-strawberry.webp", pos: [2.2, -0.4, -28], h: 3 },
  { url: "/images/coffee-beans.webp", pos: [-1.4, 1.8, -29], h: 1.4 },
];

const CAMERA_START = 7;
const CAMERA_END = -34;
const FINALE_Z = -40;

const BG_STOPS = ["#6b5550", "#921c1f", "#4a3a36", "#6b5550"].map((c) => new THREE.Color(c));

function Treat({ url, pos, h }: { url: string; pos: [number, number, number]; h: number }) {
  const tex = useTexture(url);
  tex.colorSpace = THREE.SRGBColorSpace;
  const img = tex.image as HTMLImageElement;
  const w = (h * img.width) / img.height;
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={pos} rotation={[0, pos[0] > 0 ? -0.35 : 0.35, 0]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.02} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function Crumbs({ count = 400 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = CAMERA_START - Math.random() * (CAMERA_START - FINALE_Z + 6);
    }
    return arr;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#f6eecf" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Flight({ progress }: { progress: MutableRefObject<number> }) {
  const { camera, scene } = useThree();
  const bg = useMemo(() => new THREE.Color(BG_STOPS[0]), []);
  const finale = useRef<THREE.Group>(null);

  useMemo(() => {
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 6, 22);
  }, [scene, bg]);

  useFrame((state, dt) => {
    const p = progress.current;
    const z = THREE.MathUtils.lerp(CAMERA_START, CAMERA_END, p);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 4, dt);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, state.pointer.x * 0.6, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, state.pointer.y * 0.4, 2, dt);
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 10);

    // Blend the sky between chapter colours
    const seg = p * (BG_STOPS.length - 1);
    const i = Math.min(BG_STOPS.length - 2, Math.floor(seg));
    bg.copy(BG_STOPS[i]).lerp(BG_STOPS[i + 1], seg - i);
    (scene.fog as THREE.Fog).color.copy(bg);

    if (finale.current) {
      const s = THREE.MathUtils.smoothstep(p, 0.75, 1);
      finale.current.scale.setScalar(0.55 + s * 0.6);
      finale.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15 + 0.3;
    }
  });

  return (
    <>
      <Crumbs />
      {PLACEMENTS.map((p) => (
        <Treat key={p.url} {...p} />
      ))}
      <Float speed={1.2} floatIntensity={0.6}>
        <Donut icing="#f29ab8" position={[0, -0.2, -9]} rotation={[-1.1, 0, 0]} scale={0.8} spin={0.5} />
      </Float>
      <Float speed={1.2} floatIntensity={0.6}>
        <Donut icing="#4a2414" position={[0.4, 0.2, -20]} rotation={[-0.9, 0.4, 0]} scale={0.8} spin={-0.4} />
      </Float>
      <group ref={finale} position={[0, 0, FINALE_Z]}>
        <Donut icing="#f6eecf" rotation={[-1.2, 0, 0]} sprinkles={220} spin={0.35} />
      </group>
    </>
  );
}

export default function ScrollWorldScene({ progress }: { progress: MutableRefObject<number> }) {
  return (
    // Wider lens on phones so the treats on the edges stay in frame
    <Canvas camera={{ position: [0, 0, CAMERA_START], fov: window.innerWidth < 768 ? 72 : 50, near: 0.1, far: 60 }} dpr={[1, 1.5]}>
      <StudioLights />
      <Suspense fallback={null}>
        <Flight progress={progress} />
      </Suspense>
    </Canvas>
  );
}
