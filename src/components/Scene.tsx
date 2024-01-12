import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Color, AdditiveBlending } from 'three'
import { CameraControls, useGLTF, useTexture, shaderMaterial, MeshReflectorMaterial, SpotLight } from "@react-three/drei";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { EffectComposer, GodRays, Bloom } from "@react-three/postprocessing"



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

const LowerFloor = () => (
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
      color="#050505"
      metalness={0.5} mirror={0}    />
  </mesh>
)

const UpperFloor = () => (
  <mesh position={[0, 6.125, 0]} receiveShadow rotation={[Math.PI / 2, 0, 0]}>
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
      color="#050505"
      metalness={0.5} mirror={0}    />
  </mesh>
)
const LowerEmitter = forwardRef((props, forwardedRef) => {
  return (
    <mesh ref={forwardedRef} position={[0, 0.125, 0]} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <circleGeometry args={[3, 32]} />
      <meshBasicMaterial color="white" side={THREE.DoubleSide}  />
      
    </mesh>
  );
});

const LowerLight = () => {
  const [material, set] = useState()
  return (
    <>
      <LowerEmitter ref={set} />
      {material && (
        <EffectComposer disableNormalPass multisampling={2}>
          <GodRays sun={material} exposure={0.14} decay={0.8} blur />
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={0.125} />
        </EffectComposer>
      )}
    </>
  )
}

const UpperEmitter = forwardRef((props, forwardedRef) => {
  return (
    <mesh ref={forwardedRef} position={[0, 6, 0]} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <circleGeometry args={[1.9, 32]} />
      <meshBasicMaterial color="white" side={THREE.DoubleSide}  />
      
    </mesh>
  );
});

const UpperLight = () => {
  const [light, setLight] = useState();
  return (
    <>
      <UpperEmitter ref={setLight} />
      {light && (
        <EffectComposer disableNormalPass multisampling={2}>
          <GodRays sun={light} exposure={0.14} decay={0.8} blur />
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={0.5} />
        </EffectComposer>
      )}
    </>
  )
}

type FaceType = GLTF & {
  nodes: {
    FBHead: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

const Face = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("models/face2.glb") as FaceType;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FBHead.geometry}
        material={materials["Material.002"]}
        position={[0, 3.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("models/face2.glb");

type UpperPodiumType = GLTF & {
  nodes: {
    Cylinder001: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

const UpperPodium = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("models/upper_podium.glb") as UpperPodiumType;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["Material.001"]}
        position={[0.08, 6, 0.018]}
        scale={0.669}
      />
    </group>
  );
}

useGLTF.preload("models/upper_podium.glb");

export const Fiber = () => {
    
    
    return (
      <Canvas
        camera={{ position: [10, 5, 15], fov: 45 }}
        style={{ height: "100%" }}
      >
        <color attach="background" args={['#050505']} />
        <hemisphereLight intensity={0.5} />
        <ambientLight />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        {/* <fog attach="fog" args={['#050505', 5, 100]} /> */}
        <SpotLight
      position={[0, 10, 0]}
      angle={Math.PI / 1.25}
      penumbra={1}
      decay={5}
      distance={100}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-near={1}
      shadow-camera-far={100}
    
    />
        <UpperFloor />
        <UpperPodium />
        <UpperLight />
        <Face />
        <LowerPodium />
        <LowerLight />
        <LowerFloor />
        <CameraControls makeDefault />
      </Canvas>
    );
  };
  
  export default Fiber;