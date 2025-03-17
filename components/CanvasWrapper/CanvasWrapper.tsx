import { Canvas } from '@react-three/fiber';

const CanvasWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
      }}>
      {children}
    </Canvas>
  );
};

export default CanvasWrapper;
