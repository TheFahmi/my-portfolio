"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, Trail, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function TechIcon3D({ position, text, color }: { position: [number, number, number]; text: string; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          scale={hovered ? 1.2 : 1}
        >
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
            wireframe
          />
        </mesh>
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {text}
        </Text>
      </group>
    </Float>
  );
}

function MainShape() {
  const meshRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  const mainColor = isDark ? "#d4c5a5" : "#4a3b2a"; // Retro cream/sepia
  const secondaryColor = isDark ? "#c2a370" : "#8b7355"; // Muted Gold/Brown

  return (
    <group ref={meshRef}>
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={mainColor}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      
      <mesh scale={0.5}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={secondaryColor}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color={mainColor} emissive={mainColor} emissiveIntensity={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color={secondaryColor} emissive={secondaryColor} emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#d4c5a5" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b7355" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <MainShape />
      </Float>

      <TechIcon3D position={[-2, 1.5, 0]} text="React" color="#8b7355" />
      <TechIcon3D position={[2, 1.5, -1]} text="Next.js" color="#4a3b2a" />
      <TechIcon3D position={[-2, -1.5, 1]} text="TypeScript" color="#c2a370" />
      <TechIcon3D position={[2, -1.5, 0]} text="Node.js" color="#6b8e23" />
      
      <Trail width={2} length={4} color={new THREE.Color("#c2a370")} attenuation={(t) => t * t}>
        <mesh position={[0, 0, 0]}>
           <sphereGeometry args={[0.1]} />
           <meshBasicMaterial color="white" transparent opacity={0} />
        </mesh>
      </Trail>
    </>
  );
}

export const Hero3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene />
      </Canvas>
      
      <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero3D;
