import { shaderMaterial, useGLTF } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Definimos el shader personalizado
const LanternMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uColor: new THREE.Color(0.0, 1.0, 0.5),
  },
  // Vertex Shader
  `
  uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) +  sin(glitchTime * 8.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varyings
    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
  `,
  // Fragment Shader
  `
   uniform vec3 uColor;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    // Normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 0.2;

    // Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.5);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 0.1;
    fresnel = pow(fresnel, 2.0);

    // Falloff
    float falloff = smoothstep(0.8, 0.1, fresnel);

    // Holographic
    float holographic = stripes * fresnel;
    holographic += fresnel * 8.25;
    holographic *= falloff * 4.5;

    // Final color
    gl_FragColor = vec4(uColor, holographic * 1.5);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
  `
);

// Extendemos los materiales disponibles
extend({ LanternMaterial });

// Declaramos el tipo para el material
declare type LanternMaterialImpl = {
  uTime: number;
  uColor: THREE.Color;
  transparent: boolean;
  side: THREE.Side;
  depthWrite: boolean;
  blending: THREE.Blending;
} & THREE.ShaderMaterial;

const Bar3D = () => {
  const lanternModel = useGLTF('/models/bar.glb');
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
          const material = new LanternMaterial({
            uColor: new THREE.Color(0.0, 1.0, 0.2),
            uTime: 0,
          });
          material.transparent = true;
          material.side = THREE.DoubleSide;
          material.depthWrite = false;
          material.blending = THREE.AdditiveBlending;
          child.material = material;
          materials.push(material);
        }
      });
      materialsRef.current = materials;
    }
  }, [lanternModel]);

  useFrame(({ clock }) => {
    if (!modelRef.current) {
      return;
    }

    materialsRef.current.forEach(material => {
      material.uTime = clock.getElapsedTime();
    });

    modelRef.current.position.x = pointerRef.current.x * 0.2;
    modelRef.current.position.y = -1 + pointerRef.current.y * 0.2;

    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, pointerRef.current.x * 0.2, 0.1);
  });

  return (
    <primitive ref={modelRef} object={lanternModel.scene} scale={3.2} position={[0, -1, -16]} rotation={[0, 0, 0]} />
  );
};

useGLTF.preload('/models/bar.glb');

export default Bar3D;
