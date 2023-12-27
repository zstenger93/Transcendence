import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import coverImage from "../images/color.png";
import world from "../images/world.jpg";

function Pong3D() {
  const containerRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(getAspectRatio());
  const paddleHeight = 6;
  const paddleWidth = 1;
  const wallOffsetX = 23.5;
  const wallOffsetY = 15;
  const wallThickness = 3;
  const longGeometry = 50;
  const shortGeometry = 30;
  const cylinderOffset = -1.5;
  const ballSpeed = 0.4;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 35;

    // Create walls
    const backgroundWall = new THREE.BoxGeometry(
      longGeometry,
      shortGeometry,
      1
    );
    const orbotGemetryLong = new THREE.BoxGeometry(
      longGeometry + 2 * wallThickness,
      wallThickness,
      wallThickness
    );
    const orbotGemetryShort = new THREE.BoxGeometry(
      wallThickness,
      shortGeometry + 2 * wallThickness,
      wallThickness
    );
    const wallGeometryLong = new THREE.BoxGeometry(
      longGeometry,
      wallThickness,
      wallThickness
    );
    const wallGeometryShort = new THREE.BoxGeometry(
      wallThickness,
      shortGeometry,
      wallThickness
    );
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff80,
      metalness: 1,
      roughness: 0.4,
    });

    const orbitMaterial = new THREE.MeshStandardMaterial({
      color: 0x00008b,
      roughness: 0.4,
      emissive: 0x00008b,
      emissiveIntensity: 800,
    });

    // Create cylinders
    const cylinderGeometryLong = new THREE.CylinderGeometry(
      0.5,
      0.5,
      longGeometry,
      32
    );
    const cylinderGeometryShort = new THREE.CylinderGeometry(
      0.5,
      0.5,
      shortGeometry,
      32
    );
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(coverImage);
    const textureWorld = textureLoader.load(world);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const cylinders = [
      new THREE.Mesh(cylinderGeometryShort, cylinderMaterial),
      new THREE.Mesh(cylinderGeometryShort, cylinderMaterial),
      new THREE.Mesh(cylinderGeometryLong, cylinderMaterial),
      new THREE.Mesh(cylinderGeometryLong, cylinderMaterial),
    ];
    cylinders[0].position.set(-wallOffsetX - cylinderOffset, 0, cylinderOffset);
    cylinders[1].position.set(wallOffsetX + cylinderOffset, 0, cylinderOffset);
    cylinders[2].position.set(0, -wallOffsetY - cylinderOffset, cylinderOffset);
    cylinders[3].position.set(0, wallOffsetY + cylinderOffset, cylinderOffset);
    cylinders[2].rotation.z = Math.PI / 2;
    cylinders[3].rotation.z = Math.PI / 2;
    cylinders.forEach((cylinder) => scene.add(cylinder));

    // Add light to the cylinders
    const cylinderLight = new THREE.PointLight(0x00ff00, 10, 30, 2);
    cylinders.forEach((cylinder) => cylinder.add(cylinderLight));

    const walls = [
      new THREE.Mesh(wallGeometryLong, wallMaterial), // Top wall
      new THREE.Mesh(wallGeometryLong, wallMaterial), // Bottom wall
      new THREE.Mesh(wallGeometryShort, wallMaterial), // Left wall
      new THREE.Mesh(wallGeometryShort, wallMaterial), // Right wall
      new THREE.Mesh(backgroundWall, wallMaterial), // Background
    ];

    walls[0].position.set(0, wallOffsetY, 0);
    walls[1].position.set(0, -wallOffsetY, 0);
    walls[2].position.set(-wallOffsetX, 0, 0);
    walls[3].position.set(wallOffsetX, 0, 0);
    walls[4].position.set(0, 0, -2);
    walls.forEach((wall) => scene.add(wall));

    const orbits = [
      new THREE.Mesh(orbotGemetryLong, orbitMaterial), // Top wall
      new THREE.Mesh(orbotGemetryLong, orbitMaterial), // Bottom wall
      new THREE.Mesh(orbotGemetryShort, orbitMaterial), // Left wall
      new THREE.Mesh(orbotGemetryShort, orbitMaterial), // Right wall
    ];

    orbits[0].position.set(0, wallOffsetY + wallThickness, 0);
    orbits[1].position.set(0, -wallOffsetY - wallThickness, 0);
    orbits[2].position.set(-wallOffsetX - wallThickness, 0, 0);
    orbits[3].position.set(wallOffsetX + wallThickness, 0, 0);
    orbits.forEach((orbit) => scene.add(orbit));

    const paddleGeometry = new THREE.BoxGeometry(
      paddleWidth,
      paddleHeight,
      wallThickness / 2
    );
    const paddleMaterialGeometry = new THREE.MeshBasicMaterial({
      color: 0xffff00,
    });
    const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterialGeometry);
    leftPaddle.position.set(-21, 0, 0);
    scene.add(leftPaddle);
    const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterialGeometry);
    rightPaddle.position.set(21, 0, 0);
    scene.add(rightPaddle);
    // Create
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      map: textureWorld,
    });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0, 0);
    scene.add(ball);

    // Add light to the ball
    const ballLight = new THREE.PointLight(0xffff00, 30, 30, 2);
    ballLight.position.set(0, 0, 0);
    ball.add(ballLight);

    // Add lights
    const pointLight = new THREE.PointLight(0xff0000, 600, 80, 2);
    pointLight.position.set(0, 0, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Animation loop
    let ballDirection = new THREE.Vector3(1, 1, 0).normalize();
    function animate() {
      requestAnimationFrame(animate);

      // Move the ball
      ball.rotation.z += ballDirection.y * 0.1;
      ball.position.add(ballDirection.clone().multiplyScalar(ballSpeed));

      // Animate Orbits position
      orbits.forEach((orbit, index) => {
        orbit.rotation.x += 0.01;
        if (index === 0) {
          const radius = -wallOffsetX + wallThickness * 2;
          const angle = orbit.rotation.x;
          const y = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          orbit.position.set(0, y, z);
        }
        if (index === 1) {
          const radius = wallOffsetX - wallThickness * 2;
          const angle = orbit.rotation.x;
          const y = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          orbit.position.set(0, y, z);
        }
      });
      // My Amazing AI
      leftPaddle.position.y = Math.max(
        -wallOffsetY + paddleHeight / 2 + wallThickness / 2,
        Math.min(
          ball.position.y,
          wallOffsetY - paddleHeight / 2 - wallThickness / 2
        )
      );
      rightPaddle.position.y = Math.max(
        -wallOffsetY + paddleHeight / 2 + wallThickness / 2,
        Math.min(
          ball.position.y,
          wallOffsetY - paddleHeight / 2 - wallThickness / 2
        )
      );
      // Move Camera
      camera.rotation.x += ballDirection.x * ballSpeed * 0.01;
      camera.rotation.y -= ballDirection.y * ballSpeed * 0.01;
      camera.rotation.z -= ballDirection.x * ballSpeed * 0.01;

      const cameraZOffset = 35 - Math.pow(Math.abs(ball.position.x), 0.8);
      camera.position.set(ball.position.x, ball.position.y, cameraZOffset);

      const leftPaddleBoundingBox = new THREE.Box3().setFromObject(leftPaddle);
      const rightPaddleBoundingBox = new THREE.Box3().setFromObject(
        rightPaddle
      );
      const ballBoundingBox = new THREE.Box3().setFromObject(ball);
      if (
        leftPaddleBoundingBox.intersectsBox(ballBoundingBox) ||
        rightPaddleBoundingBox.intersectsBox(ballBoundingBox)
      ) {
        ballDirection.x *= -1;
      }
      for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const wallBoundingBox = new THREE.Box3().setFromObject(wall);
        const ballBoundingBox = new THREE.Box3().setFromObject(ball);
        if (wallBoundingBox.intersectsBox(ballBoundingBox)) {
          if (i == 2 || i == 3) ballDirection.x *= -1;
          else ballDirection.y *= -1;
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      setAspectRatio(getAspectRatio());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef, aspectRatio]);

  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  useEffect(() => {
    function handleResize() {
      setAspectRatio(getAspectRatio());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={containerRef}></div>;
}

export default Pong3D;
