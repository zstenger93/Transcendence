import React, { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { useFrame } from "@react-three/fiber"; // Import useFrame if needed
import * as THREE from "three";

// ... (rest of the code)

const PongScene = () => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });

  const ball = useRef();
  const paddle1 = useRef();
  const paddle2 = useRef();

  return (
    <>
      <h3 id="scoreBoard">
        Player 1: {score.player1} Player 2: {score.player2}
      </h3>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        camera={{ position: [0, 100, 500], fov: 45, near: 0.1, far: 10000 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <mesh position={[0, -50, 0]}>
          <boxGeometry args={[1200, 5, 3000]} />
          <meshLambertMaterial color={0x003300} />
        </mesh>
        <mesh ref={paddle1} position={[0, 0, 1500]}>
          <boxGeometry args={[200, 30, 10]} />
          <meshLambertMaterial color={0xcccccc} />
        </mesh>
        <mesh ref={paddle2} position={[0, 0, -1500]}>
          <boxGeometry args={[200, 30, 10]} />
          <meshLambertMaterial color={0xcccccc} />
        </mesh>
        <mesh ref={ball} position={[0, 0, 0]}>
          <sphereGeometry args={[20, 16, 16]} />
          <meshLambertMaterial color={0xcc0000} />
        </mesh>

        {/* Camera Control */}
        <orbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.25}
          target={[0, 0, 0]}
        />
      </Canvas>
    </>
  );
};

export default PongScene;
