"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const H = 2.2;
const R_BOTTOM = 0.62;
const R_TOP = 0.8;
const radiusAt = (y: number) => R_BOTTOM + ((y + H / 2) / H) * (R_TOP - R_BOTTOM);

/** Conical helix the whipped cream is piped along */
class PipingCurve extends THREE.Curve<THREE.Vector3> {
  constructor(private turns = 3.2, private base = 0.66, private rise = 0.75) {
    super();
  }
  getPoint(t: number, target = new THREE.Vector3()) {
    const a = t * Math.PI * 2 * this.turns;
    const r = this.base * (1 - t * 0.92);
    return target.set(Math.cos(a) * r, t * this.rise, Math.sin(a) * r);
  }
}

function buildCream() {
  const tubular = 220;
  const radial = 16;
  const geo = new THREE.TubeGeometry(new PipingCurve(), tubular, 0.17, radial, false);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const nor = geo.attributes.normal as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i <= tubular; i++) {
    // Taper towards the tip so it ends in a point
    const taper = THREE.MathUtils.lerp(1, 0.25, Math.pow(i / tubular, 2));
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      v.fromBufferAttribute(pos, k);
      n.fromBufferAttribute(nor, k);
      // Star-nozzle ridges
      const ridge = 1 + 0.16 * Math.cos((j / radial) * Math.PI * 2 * 8);
      v.addScaledVector(n, -0.17 * (1 - taper * ridge));
      pos.setXYZ(k, v.x, v.y, v.z);
    }
  }
  geo.computeVertexNormals();
  return geo;
}

function buildDrizzle() {
  const pts: THREE.Vector3[] = [];
  const cream = new PipingCurve();
  for (let i = 0; i <= 120; i++) {
    const t = 0.05 + (i / 120) * 0.8;
    const p = cream.getPoint(t);
    const out = new THREE.Vector3(p.x, 0, p.z).normalize().multiplyScalar(0.14 * (1 - t * 0.6));
    p.add(out);
    p.y += 0.12 + Math.sin(i * 0.9) * 0.03;
    pts.push(p);
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 240, 0.028, 8, false);
}

/** Coffee with cream marbling down through it; vertex colour r holds the coffee→milk mix */
function buildLiquid() {
  const top = H / 2 - 0.22;
  const bottom = -H / 2 + 0.06;
  const h = top - bottom;
  const geo = new THREE.CylinderGeometry(radiusAt(top) - 0.035, radiusAt(bottom) - 0.035, h, 72, 48, false);
  geo.translate(0, bottom + h / 2, 0);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const colors = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const yn = (y - bottom) / h;
    const th = Math.atan2(z, x);
    const base = THREE.MathUtils.smoothstep(yn, 0.3, 0.85);
    const swirl = Math.sin(th * 3 + yn * 9 + Math.sin(th * 5) * 1.5) * 0.5 + Math.sin(th * 7 - yn * 14) * 0.25;
    const band = Math.exp(-Math.pow((yn - 0.55) / 0.28, 2));
    const m = THREE.MathUtils.clamp(base + swirl * 0.8 * band, 0, 1);
    colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = m;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return { geo, top };
}

function buildBean() {
  const geo = new THREE.SphereGeometry(1, 20, 16);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    let y = pos.getY(i);
    // The crease down the flat side of a roasted bean
    if (y > 0) y -= 0.45 * Math.exp(-Math.pow(x / 0.18, 2)) * y;
    pos.setXYZ(i, x * 0.75, y * 0.55, pos.getZ(i));
  }
  geo.computeVertexNormals();
  return geo;
}

export type Brew = { coffee: string; milk: string; drizzle: string };

export function CoffeeCup({ brew, ...props }: { brew: Brew } & ThreeElements["group"]) {
  const cream = useMemo(buildCream, []);
  const drizzle = useMemo(buildDrizzle, []);
  const liquid = useMemo(buildLiquid, []);
  const uniforms = useMemo(
    () => ({ uCoffee: { value: new THREE.Color(brew.coffee) }, uMilk: { value: new THREE.Color(brew.milk) } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const drizzleMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const targets = useMemo(
    () => ({ coffee: new THREE.Color(brew.coffee), milk: new THREE.Color(brew.milk), drizzle: new THREE.Color(brew.drizzle) }),
    [brew]
  );

  const liquidMat = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: 0.18, clearcoat: 0.6 });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nuniform vec3 uCoffee;\nuniform vec3 uMilk;")
        .replace("#include <color_fragment>", "diffuseColor.rgb = mix(uCoffee, uMilk, vColor.r);");
    };
    return m;
  }, [uniforms]);

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 4);
    uniforms.uCoffee.value.lerp(targets.coffee, k);
    uniforms.uMilk.value.lerp(targets.milk, k);
    drizzleMat.current?.color.lerp(targets.drizzle, k);
  });

  return (
    <group {...props}>
      {/* Glass (faked: transmission renders black on some mobile GPUs) */}
      <mesh renderOrder={2}>
        <cylinderGeometry args={[R_TOP, R_BOTTOM, H, 72, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          roughness={0.03}
          clearcoat={1}
          envMapIntensity={3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, -H / 2 + 0.03, 0]}>
        <cylinderGeometry args={[R_BOTTOM, R_BOTTOM - 0.02, 0.06, 72]} />
        <meshPhysicalMaterial color="#f3ece4" transparent opacity={0.45} roughness={0.05} clearcoat={1} />
      </mesh>

      <mesh geometry={liquid.geo} material={liquidMat} />

      <group position={[0, liquid.top - 0.02, 0]}>
        <mesh geometry={cream}>
          <meshPhysicalMaterial color="#fffaf0" roughness={0.55} sheen={1} sheenColor="#ffffff" />
        </mesh>
        <mesh geometry={drizzle}>
          <meshPhysicalMaterial ref={drizzleMat} color={brew.drizzle} roughness={0.15} clearcoat={1} />
        </mesh>
      </group>

      {/* Straw */}
      <mesh position={[0.32, H / 2 + 0.1, 0.1]} rotation={[0.1, 0, -0.22]}>
        <cylinderGeometry args={[0.055, 0.055, 2.2, 20, 1, true]} />
        <meshStandardMaterial color="#921c1f" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/** Coffee beans and ice drifting around the cup */
export function BeansAndIce({ beans = 26 }) {
  const beanGeo = useMemo(buildBean, []);
  const beanMesh = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(
    () =>
      Array.from({ length: beans }, () => ({
        x: (Math.random() - 0.5) * 4.4,
        y: (Math.random() - 0.5) * 6,
        z: (Math.random() - 0.5) * 2.5 - 0.8,
        s: 0.08 + Math.random() * 0.07,
        speed: 0.15 + Math.random() * 0.3,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
      })),
    [beans]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const ice = useRef<THREE.Group>(null);

  useFrame((state, dt) => {
    const m = beanMesh.current;
    if (m) {
      data.forEach((d, i) => {
        d.y -= d.speed * dt;
        d.rx += dt * d.speed * 2;
        d.ry += dt * d.speed;
        if (d.y < -3.4) d.y = 3.4;
        dummy.position.set(d.x, d.y, d.z);
        dummy.rotation.set(d.rx, d.ry, 0);
        dummy.scale.setScalar(d.s);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
      });
      m.instanceMatrix.needsUpdate = true;
    }
    if (ice.current) {
      ice.current.children.forEach((c, i) => {
        c.rotation.x += dt * (0.2 + i * 0.07);
        c.rotation.y += dt * (0.15 + i * 0.05);
        c.position.y += Math.sin(state.clock.elapsedTime * 0.8 + i * 2) * dt * 0.15;
      });
    }
  });

  return (
    <>
      <instancedMesh ref={beanMesh} args={[beanGeo, undefined, beans]}>
        <meshPhysicalMaterial color="#4a2614" roughness={0.3} clearcoat={0.8} clearcoatRoughness={0.3} />
      </instancedMesh>
      <group ref={ice}>
        {[
          [1.25, 1.0, 0.5, 0.3],
          [-1.3, 0.5, 0.3, 0.25],
          [-1.05, -1.2, 0.7, 0.21],
          [1.15, -0.9, 0.6, 0.19],
        ].map(([x, y, z, s], i) => (
          <RoundedBox key={i} args={[1, 1, 1]} radius={0.16} smoothness={3} position={[x, y, z]} scale={s}>
            <meshPhysicalMaterial
              color="#f4fbff"
              emissive="#cfe6f5"
              emissiveIntensity={0.35}
              transparent
              opacity={0.55}
              roughness={0.06}
              clearcoat={1}
              envMapIntensity={3}
              depthWrite={false}
            />
          </RoundedBox>
        ))}
      </group>
    </>
  );
}
