import { Canvas } from '@react-three/fiber';
import { memo } from 'react';

const CanvasWrapper = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
      }}>
      {children}
    </Canvas>
  );
});

export default CanvasWrapper;
