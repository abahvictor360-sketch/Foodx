"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";

const R = 1;
const TUBE = 0.42;

const SPRINKLE_COLORS = ["#ff5d8f", "#ffd23f", "#3bceac", "#5e60ce", "#ffffff", "#ff8c42", "#4cc9f0"];

/** Pseudo-random that is stable across renders */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function buildIcing() {
  const geo = new THREE.TorusGeometry(R, TUBE, 64, 160);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const c = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const u = Math.atan2(v.y, v.x);
    c.set(Math.cos(u) * R, Math.sin(u) * R, 0);
    const n = v.clone().sub(c).normalize();
    // Wavy, drippy boundary between icing and bare dough
    const edge = -0.05 + 0.16 * Math.sin(u * 9) + 0.1 * Math.sin(u * 23 + 1.3) + 0.06 * Math.sin(u * 41);
    const t = THREE.MathUtils.smoothstep(n.z, edge - 0.06, edge + 0.08);
    const radius = THREE.MathUtils.lerp(TUBE * 0.94, TUBE * 1.075, t);
    v.copy(c).addScaledVector(n, radius);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function buildSprinkles(count: number) {
  const out: { matrix: THREE.Matrix4; color: THREE.Color }[] = [];
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  let i = 0;
  let seed = 1;
  while (out.length < count && i < count * 20) {
    i++;
    const u = rand(seed++) * Math.PI * 2;
    const vAng = rand(seed++) * Math.PI * 2;
    const n = new THREE.Vector3(Math.cos(vAng) * Math.cos(u), Math.cos(vAng) * Math.sin(u), Math.sin(vAng));
    if (n.z < 0.25) continue;
    const c = new THREE.Vector3(Math.cos(u) * R, Math.sin(u) * R, 0);
    const p = c.addScaledVector(n, TUBE * 1.08);
    // Lay the sprinkle flat on the surface with a random spin
    const tangent = new THREE.Vector3(rand(seed++) - 0.5, rand(seed++) - 0.5, rand(seed++) - 0.5).cross(n).normalize();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
    const m = new THREE.Matrix4().compose(p, q, s);
    out.push({ matrix: m, color: new THREE.Color(SPRINKLE_COLORS[Math.floor(rand(seed++) * SPRINKLE_COLORS.length)]) });
  }
  return out;
}

export type DonutProps = ThreeElements["group"] & {
  icing?: string;
  sprinkles?: number;
  spin?: number;
};

export function Donut({ icing = "#f29ab8", sprinkles = 160, spin = 0.25, ...props }: DonutProps) {
  const group = useRef<THREE.Group>(null);
  const icingGeo = useMemo(buildIcing, []);
  const sprinkleData = useMemo(() => buildSprinkles(sprinkles), [sprinkles]);
  const icingMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const target = useMemo(() => new THREE.Color(icing), [icing]);

  const setInstances = (mesh: THREE.InstancedMesh | null) => {
    if (!mesh) return;
    sprinkleData.forEach((d, i) => {
      mesh.setMatrixAt(i, d.matrix);
      mesh.setColorAt(i, d.color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  };

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.z += dt * spin;
    // Ease the glaze colour when the flavour changes
    icingMat.current?.color.lerp(target, Math.min(1, dt * 4));
  });

  return (
    <group {...props}>
      <group ref={group}>
        <mesh castShadow>
          <torusGeometry args={[R, TUBE, 48, 128]} />
          <meshPhysicalMaterial color="#d48a45" roughness={0.75} sheen={1} sheenColor="#f3c27c" sheenRoughness={0.6} />
        </mesh>
        <mesh geometry={icingGeo} castShadow>
          <meshPhysicalMaterial ref={icingMat} color={icing} roughness={0.22} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
        <instancedMesh ref={setInstances} args={[undefined, undefined, sprinkleData.length]}>
          <capsuleGeometry args={[0.022, 0.09, 4, 8]} />
          <meshStandardMaterial roughness={0.4} />
        </instancedMesh>
      </group>
    </group>
  );
}
