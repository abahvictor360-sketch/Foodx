"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Studio lighting baked from lightformers so nothing has to be fetched at runtime. */
export function StudioLights({ warm = "#ffd9a8" }: { warm?: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color={warm} />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#ffb3c7" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 3, 1]} color="#fff3e0" />
        <Lightformer form="rect" intensity={1.5} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} color="#ffd1dc" />
        <Lightformer form="ring" intensity={2} position={[4, 2, -3]} scale={3} color="#ffe2b8" />
        <Lightformer form="rect" intensity={0.8} position={[0, -4, 1]} scale={[8, 2, 1]} color="#8a5a50" />
      </Environment>
    </>
  );
}
