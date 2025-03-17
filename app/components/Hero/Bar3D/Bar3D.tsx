import { shaderMaterial, useGLTF } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { fragmentShader, vertexShader } from './shaders/index';

const LanternMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 1.0, 0.5),
  },
  // Vertex Shader
  vertexShader,
  // Fragment Shader
  fragmentShader
);

extend({ LanternMaterial });

declare type LanternMaterialImpl = {
  uTime: number;
  uColor: THREE.Color;
  transparent: boolean;
  side: THREE.Side;
  depthWrite: boolean;
  blending: THREE.Blending;
} & THREE.ShaderMaterial;

const Bar3D = () => {
  const baseMaterial = useMemo(
    () =>
      new LanternMaterial({
        uColor: new THREE.Color(0.0, 1.0, 0.2),
        uTime: 0,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const lanternModel = useGLTF('/models/bar.glb', true);
  const modelRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<LanternMaterialImpl[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useEffect(() => {
    if (lanternModel.scene) {
      const materials: LanternMaterialImpl[] = [];
      lanternModel.scene.traverse(child => {
        if (child instanceof THREE.Mesh) {
          const material = baseMaterial.clone();
          child.material = material;
          materials.push(material);
        }
      });
      materialsRef.current = materials;
    }
  }, [lanternModel, baseMaterial]);

  // Optimizar el useFrame
  useFrame(({ clock }) => {
    if (!modelRef.current) return;

    const elapsed = clock.getElapsedTime();
    const { x, y } = pointerRef.current;

    materialsRef.current.forEach(material => {
      material.uTime = elapsed;
    });

    modelRef.current.position.x = x * 0.2;
    modelRef.current.position.y = -1 + y * 0.2;
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, x * 0.2, 0.1);
  });

  return (
    <primitive ref={modelRef} object={lanternModel.scene} scale={3.2} position={[0, -1, -16]} rotation={[0, 0, 0]} />
  );
};

useGLTF.preload('/models/bar.glb', true);

export default Bar3D;
