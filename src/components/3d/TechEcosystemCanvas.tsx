import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

export interface TechNode {
  id: string;
  name: string;
  category: "Commerce" | "AI & Data" | "Frontend & Stack" | "Infrastructure";
  description: string;
  position: [number, number, number];
  color: string;
}

const TECH_NODES: TechNode[] = [
  {
    id: "shopify",
    name: "Shopify Plus",
    category: "Commerce",
    description: "Enterprise Liquid themes, checkout extensions & headless architecture.",
    position: [-2.8, 1.4, 0],
    color: "#96bf48",
  },
  {
    id: "hydrogen",
    name: "Hydrogen & Remix",
    category: "Commerce",
    description: "Decoupled SSR storefronts built for sub-second global execution.",
    position: [-1.6, 2.2, 0.5],
    color: "#008060",
  },
  {
    id: "react",
    name: "React 19",
    category: "Frontend & Stack",
    description: "Concurrent rendering, server components & high-velocity UI architecture.",
    position: [0, 1.8, 1.2],
    color: "#61dafb",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend & Stack",
    description: "Strict end-to-end type contracts across client, API & database queries.",
    position: [1.8, 2.0, 0],
    color: "#3178c6",
  },
  {
    id: "tanstack",
    name: "TanStack Start",
    category: "Frontend & Stack",
    description: "Full-stack SSR framework with type-safe server functions & RPC.",
    position: [2.6, 0.8, -0.5],
    color: "#ff4154",
  },
  {
    id: "supabase",
    name: "Supabase & Postgres",
    category: "Infrastructure",
    description: "PostgreSQL database, Row-Level Security & SECURITY DEFINER predicates.",
    position: [2.2, -1.2, 0.5],
    color: "#3ecf8e",
  },
  {
    id: "n8n",
    name: "n8n AI Automations",
    category: "AI & Data",
    description: "Custom n8n workflow nodes, LLM reasoning pipelines & automated business routing.",
    position: [0.8, -2.2, 1.0],
    color: "#ff6d5a",
  },
  {
    id: "openai",
    name: "OpenAI & AI Agents",
    category: "AI & Data",
    description: "Automated document parsing, multi-step LLM agents & intelligent dispatch logic.",
    position: [-1.2, -2.0, 0.2],
    color: "#10a37f",
  },
  {
    id: "tailwind",
    name: "TailwindCSS v4",
    category: "Frontend & Stack",
    description: "Zero-runtime utility styling & responsive design token system.",
    position: [-2.6, -0.8, -0.6],
    color: "#38bdf8",
  },
  {
    id: "vercel",
    name: "Vercel Edge",
    category: "Infrastructure",
    description: "Global serverless edge deployment with instantaneous CI/CD routing.",
    position: [0, -0.2, -1.5],
    color: "#ffffff",
  },
];

function NodeObject({
  node,
  isSelected,
  onSelect,
}: {
  node: TechNode;
  isSelected: boolean;
  onSelect: (node: TechNode) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (hovered ? 1.5 : 0.4);
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8} position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        scale={isSelected ? 1.4 : hovered ? 1.25 : 1}
      >
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isSelected ? 0.9 : hovered ? 0.7 : 0.3}
          roughness={0.2}
          wireframe={!isSelected && !hovered}
        />
      </mesh>
      <Html distanceFactor={8} position={[0, -0.65, 0]} center pointerEvents="none">
        <div
          className={`rounded-md border px-2.5 py-1 text-center font-mono text-[10px] uppercase tracking-wider transition-all duration-300 backdrop-blur-md whitespace-nowrap ${
            isSelected
              ? "border-primary bg-primary/25 text-foreground shadow-lg shadow-primary/20 scale-110"
              : hovered
                ? "border-foreground/40 bg-surface/90 text-foreground"
                : "border-border/60 bg-background/80 text-muted-foreground"
          }`}
        >
          {node.name}
        </div>
      </Html>
    </Float>
  );
}

function ConnectingLines({ activeNode }: { activeNode: TechNode | null }) {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const center = new THREE.Vector3(0, -0.2, -1.5); // Vercel / Core
    TECH_NODES.forEach((node) => {
      points.push(center);
      points.push(new THREE.Vector3(...node.position));
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#10b981" transparent opacity={0.15} />
    </lineSegments>
  );
}

function Tech3DScene({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: TechNode | null;
  onSelectNode: (node: TechNode) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.8} color="#10b981" />
      <pointLight position={[-10, -10, -5]} intensity={1.0} color="#3b82f6" />
      <ConnectingLines activeNode={selectedNode} />
      {TECH_NODES.map((node) => (
        <NodeObject
          key={node.id}
          node={node}
          isSelected={selectedNode?.id === node.id}
          onSelect={onSelectNode}
        />
      ))}
    </>
  );
}

export function TechEcosystemCanvas() {
  const [selectedNode, setSelectedNode] = useState<TechNode>(TECH_NODES[0]!);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className="relative w-full rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-xl md:p-10">
      <div className="grid items-center gap-8 lg:grid-cols-12">
        {/* 3D WebGL Canvas Viewport / Mobile Fallback */}
        <div className="relative h-[380px] w-full overflow-hidden rounded-xl border border-border/80 bg-background/80 lg:col-span-8 md:h-[460px]">
          {mounted && !isMobile ? (
            <Canvas
              camera={{ position: [0, 0, 6.2], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
            >
              <Tech3DScene
                selectedNode={selectedNode}
                onSelectNode={(node) => setSelectedNode(node)}
              />
            </Canvas>
          ) : (
            <div className="grid h-full grid-cols-2 gap-2.5 overflow-y-auto p-4 sm:grid-cols-3">
              {TECH_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                    selectedNode.id === node.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-surface/40 text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {node.name}
                  </span>
                  <span className="mt-1 font-mono text-[10px] opacity-75">{node.category}</span>
                </button>
              ))}
            </div>
          )}
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-border bg-background/90 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
            {isMobile ? "Tap node to inspect details" : "Drag / Hover 3D Nodes to Inspect"}
          </div>
        </div>

        {/* Selected Technology Info Panel */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
          <div>
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
              {selectedNode.category}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {selectedNode.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {selectedNode.description}
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-background/60 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Architecture Standard:</span>
              <span className="font-mono text-foreground font-medium">Production Hardened</span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Security Baseline:</span>
              <span className="font-mono text-emerald-400 font-medium">Verified RLS & SSR</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {TECH_NODES.slice(0, 5).map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                  selectedNode.id === node.id
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-border bg-surface text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {node.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
