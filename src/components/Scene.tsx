import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, useGLTF, useTexture } from "@react-three/drei";
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
          position={[0.08, -0.185, 0.018]}
          scale={0.669}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PlantZZ001002.geometry}
          material={materials.MyGold}
          position={[-1.042, 0.368, -0.528]}
          rotation={[-0.478, -0.124, 0.588]}
          scale={1.749}
        />
      </group>
    );
  }
  
  useGLTF.preload("models/trial4.glb");

export const Fiber = () => {
    
    
    return (
      <Canvas
        camera={{ position: [10, -20, 5], fov: 45 }}
        style={{ height: "100%" }}
      >
        <LowerPodium />
        <CameraControls makeDefault />
      </Canvas>
    );
  };
  
  export default Fiber;