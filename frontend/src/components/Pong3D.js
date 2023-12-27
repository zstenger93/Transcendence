import React, { useEffect } from "react";
import { Canvas } from "react-three-fiber";

const PongScene = () => {
  useEffect(() => {
    const handleResize = () => {
      // Handle resizing logic if needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      onCreated={({ gl }) => {
        // Setup additional scene logic if needed
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={0x00ff00} />
      </mesh>
    </Canvas>
  );
};

export default PongScene;
