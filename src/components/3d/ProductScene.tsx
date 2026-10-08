import { Canvas, type ThreeEvent, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

type Cake = { tone: string; accent: string; image: string };

function CakeInside({ cake, index, count, isOpen }: { cake: Cake; index: number; count: number; isOpen: boolean }) {
  const group = useRef<THREE.Group>(null);
  const imageTexture = useTexture(cake.image);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (0.16 + index * 0.02);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, isOpen ? 0.42 + index * 0.08 : -0.2, 0.07);
  });
  const angle = (index / count) * Math.PI * 2;
  return (
    <group ref={group} position={[Math.cos(angle) * 0.58, -0.2, Math.sin(angle) * 0.42]} scale={isOpen ? 1 : 0.01}>
      <mesh castShadow>
        <cylinderGeometry args={[0.28, 0.32, 0.18, 24]} />
        <meshStandardMaterial color={cake.tone} map={imageTexture} roughness={0.68} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.16, 0.035, 8, 18]} />
        <meshStandardMaterial color={cake.accent} roughness={0.48} />
      </mesh>
    </group>
  );
}

type BoxInteraction = {
  rotationY: number;
  tilt: number;
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void;
  onPointerUp: () => void;
};

function GiftBox({ progress, isOpen, cakes, interaction }: { progress: number; isOpen: boolean; cakes: Cake[]; interaction: BoxInteraction }) {
  const group = useRef<THREE.Group>(null);
  const hat = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    if (!interaction.rotationY && !isOpen) interaction.rotationY = group.current.rotation.y + delta * 0.08;
    group.current.rotation.y = interaction.rotationY;
    group.current.rotation.x = interaction.tilt + progress * 0.06;
    group.current.position.y = Math.sin(Date.now() * 0.001) * 0.035;
    if (hat.current) {
      const targetY = isOpen ? 0.78 : 0;
      const targetZ = isOpen ? -0.22 : 0;
      const targetRotationX = isOpen ? -0.72 : 0;
      hat.current.position.y = THREE.MathUtils.damp(hat.current.position.y, targetY, 5, delta);
      hat.current.position.z = THREE.MathUtils.damp(hat.current.position.z, targetZ, 5, delta);
      hat.current.rotation.x = THREE.MathUtils.damp(hat.current.rotation.x, targetRotationX, 5, delta);
    }
  });
  return (
    <group
      ref={group}
      scale={0.95 + progress * 0.18}
      rotation={[interaction.tilt, interaction.rotationY, 0]}
      onPointerDown={interaction.onPointerDown}
      onPointerMove={interaction.onPointerMove}
      onPointerUp={interaction.onPointerUp}
    >
      <RoundedBox castShadow receiveShadow args={[2.5, 0.55, 1.8]} radius={0.12} smoothness={4} position={[0, -0.18, 0]}>
        <meshStandardMaterial color="#536442" roughness={0.62} metalness={0.04} />
      </RoundedBox>
      <RoundedBox receiveShadow args={[2.22, 0.08, 1.54]} radius={0.06} smoothness={3} position={[0, 0.12, 0]}>
        <meshStandardMaterial color="#293a2d" roughness={0.82} />
      </RoundedBox>
      <group ref={hat} position={[0, 0.2, 0]}>
        <mesh castShadow receiveShadow position={[0, 0.48, 0]}>
          <coneGeometry args={[0.86, 0.7, 48]} />
          <meshStandardMaterial color="#d9c69b" roughness={0.86} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.67, 0.055, 10, 48]} />
          <meshStandardMaterial color="#b89b63" roughness={0.72} />
        </mesh>
        <mesh position={[0, 0.48, 0]}>
          <coneGeometry args={[0.865, 0.705, 16, 1, true]} />
          <meshBasicMaterial color="#a98b55" wireframe opacity={0.18} transparent />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.035, 24]} />
          <meshStandardMaterial color="#b98d56" roughness={0.5} />
        </mesh>
      </group>
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[0.12, 0.7, 1.83]} />
        <meshStandardMaterial color="#c39a63" roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[2.28, 0.045, 0.05]} />
        <meshStandardMaterial color="#c39a63" roughness={0.4} />
      </mesh>
      <RoundedBox castShadow position={[0, 0.06, 0]} args={[1.18, 0.32, 0.95]} radius={0.13} smoothness={4}>
        <meshStandardMaterial color="#a7aa74" roughness={0.64} />
      </RoundedBox>
      {cakes.map((cake, index) => <CakeInside key={index} cake={cake} index={index} count={cakes.length} isOpen={isOpen} />)}
    </group>
  );
}

function FloatingGrains({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const grains = Array.from({ length: 18 }, (_, i) => i);
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y -= delta * 0.08;
      group.current.children.forEach((child, i) => {
        child.position.y += Math.sin(Date.now() * 0.001 + i) * 0.0007;
      });
    }
  });
  return (
    <group ref={group} visible={progress > 0.33} scale={Math.min((progress - 0.3) * 3, 1)}>
      {grains.map((i) => (
        <mesh key={i} position={[Math.cos(i * 2.4) * (1.5 + (i % 3) * 0.3), Math.sin(i * 1.7) * 1.2, Math.sin(i * 2.4) * 0.9]}>
          <capsuleGeometry args={[0.045, 0.13, 4, 8]} />
          <meshStandardMaterial color={i % 2 ? '#d4b77d' : '#a9b47d'} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ progress, isOpen, cakes, interaction }: { progress: number; isOpen: boolean; cakes: Cake[]; interaction: BoxInteraction }) {
  return (
    <>
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 5, 4]} intensity={3} castShadow />
      <pointLight position={[-3, 2, 2]} color="#d8b37a" intensity={8} distance={8} />
      <GiftBox progress={progress} isOpen={isOpen} cakes={cakes} interaction={interaction} />
      <FloatingGrains progress={progress} />
    </>
  );
}

export function ProductScene({ progress, isOpen, cakes }: { progress: number; isOpen: boolean; cakes: Cake[] }) {
  const [rotationY, setRotationY] = useState(0);
  const [tilt, setTilt] = useState(0);
  const dragStart = useRef({ x: 0, y: 0, rotationY: 0, tilt: 0 });
  const dragging = useRef(false);
  const interaction: BoxInteraction = {
    rotationY,
    tilt,
    onPointerDown: (event) => {
      dragStart.current = { x: event.clientX, y: event.clientY, rotationY, tilt };
      dragging.current = true;
      const target = event.target as Element & { setPointerCapture?: (pointerId: number) => void };
      target.setPointerCapture?.(event.pointerId);
    },
    onPointerMove: (event) => {
      if (!dragging.current) return;
      const pointer = event as unknown as PointerEvent;
      setRotationY(dragStart.current.rotationY + ((pointer.clientX ?? 0) - dragStart.current.x) * 0.012);
      setTilt(THREE.MathUtils.clamp(dragStart.current.tilt + ((pointer.clientY ?? 0) - dragStart.current.y) * 0.006, -0.22, 0.22));
    },
    onPointerUp: () => { dragging.current = false; }
  };
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [3.2, 1.7, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-label="Mô hình hộp quà GÓI GHÉM"
    >
      <Scene progress={progress} isOpen={isOpen} cakes={cakes} interaction={interaction} />
    </Canvas>
  );
}
