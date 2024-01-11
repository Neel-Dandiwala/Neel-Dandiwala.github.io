import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Color, AdditiveBlending } from 'three'
import { CameraControls, useGLTF, useTexture, shaderMaterial, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";



type LowerPodiumType = GLTF & {
    nodes: {
      Cylinder: THREE.Mesh;
      PlantZZ001002: THREE.Mesh;
    };
    materials: {
      ["Material.002"]: THREE.MeshStandardMaterial;
      MyGold: THREE.MeshStandardMaterial;
    };
  };
  
const LowerPodium = (props: JSX.IntrinsicElements["group"]) => {
    const { nodes, materials } = useGLTF("models/trial4.glb") as LowerPodiumType;
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder.geometry}
          material={materials["Material.002"]}
          position={[0, 0.125, 0]}
          scale={0.669}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PlantZZ001002.geometry}
          material={materials.MyGold}
          rotation={[-0.478, -0.124, 0.588]}
          position={[-1, 0.75, -0.5]}
          scale={1.749}
        />
      </group>
    );
  }
  
  useGLTF.preload("models/trial4.glb");

const Floor = () => (
  <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[50, 50]} />
    <MeshReflectorMaterial
      blur={[300, 50]}
      resolution={1024}
      mixBlur={1}
      mixStrength={100}
      roughness={1}
      depthScale={1.2}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#202020"
      metalness={0.8} mirror={0}    />
  </mesh>
)

export const Fiber = () => {
    
    
    return (
      <Canvas
        camera={{ position: [10, 0, 15], fov: 45 }}
        style={{ height: "100%" }}
      >
        <color attach="background" args={['#050505']} />
        <hemisphereLight intensity={0.5} />
        <ambientLight />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <fog attach="fog" args={['#050505', 5, 100]} />
        <LowerPodium />
        <Floor />
        <CameraControls makeDefault />
      </Canvas>
    );
  };
  
  export default Fiber;