import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AmbientParticleField({ count = 300 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particlesPosition, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#10b981"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingCoreNodes() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.z += delta * 0.08;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0.5, -2]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Inner Glowing Core Octahedron */}
      <mesh>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#059669"
          emissiveIntensity={0.6}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

export function HeroAtmosphereCanvas() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
    }
  }, []);

  if (!mounted || reducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-background to-background" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none opacity-70">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
        <AmbientParticleField count={250} />
        <FloatingCoreNodes />
      </Canvas>
    </div>
  );
}
