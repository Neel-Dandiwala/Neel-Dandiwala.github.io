import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: { 
        Cylinder: THREE.Mesh;
    };
    materials: {
        ["Material.002"]: THREE.MeshStandardMaterial;
    };
};

const Model = (props: JSX.IntrinsicElements["group"]) => {
    const { controls } = useThree();
  const meshRef = useRef();

  const margin = 0.2;
  useEffect(() => {
    if (controls) {
      controls.fitToBox(meshRef.current, true, {
        paddingTop: margin,
        paddingLeft: margin,
        paddingBottom: margin,
        paddingRight: margin,
      });
      controls.rotateTo(Math.PI / -0.4, Math.PI / 2.5, true);
    }
  }, [controls]);
    const { nodes, materials } = useGLTF("models/lower_podium.glb") as GLTFResult;
    
    return (
        <group {...props} dispose={null}>
            <mesh ref={meshRef}
                castShadow
                receiveShadow
                geometry={nodes.Cylinder.geometry}
                material={materials["Material.002"]}
            />
            <CameraControls makeDefault />
        </group>
    );
}

useGLTF.preload("models/lower_podium.glb");

export const Fiber = () => {
    return (
      <Canvas
        camera={{ position: [10, -20, 5], fov: 45 }}
        style={{ height: "100%" }}
      >
        <Model />
      </Canvas>
    );
  };
  
  export default Fiber;