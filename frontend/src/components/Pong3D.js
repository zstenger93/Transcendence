import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import coverImage from "../images/color.png";
import world from "../images/world.jpg";
import mercury from "../images/mercury.png";
import venus from "../images/venus.jpg";
import mars from "../images/mars.jpg";
import jupiter from "../images/jupiter.jpg";
import saturn from "../images/saturn.png";
import uranus from "../images/uranus.png";
import neptune from "../images/neptun.png";

// import { TextGeometry, MeshBasicMaterial, Mesh } from "three";

function Pong3D() {
  const containerRef = useRef(null);
  let removeShake = true;
  let aspectRatio = getAspectRatio();
  const paddleHeight = 6;
  const paddleWidth = 1;
  const wallOffsetX = 23.5;
  const wallOffsetY = 15;
  const wallThickness = 3;
  const longGeometry = 50;
  const shortGeometry = 30;
  const cylinderOffset = -1.5;
  const ballSpeed = 0.3;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    camera.position.z = 35;

    // Create canvas for rendering text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "24px Arial";
    context.fillStyle = "white";
    context.fillText("BLACKHOLE PONG", 44, 24);

    // Create texture from the canvas
    const textureText = new THREE.CanvasTexture(canvas);

    // Create material with text texture
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textureText,
      transparent: true,
    });

    // Apply the material to a plane
    const textGeometry = new THREE.PlaneGeometry(10, 10);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(
      0,
      -shortGeometry / 2 - wallThickness * 1.3,
      wallThickness / 2 + 0.1
    ); // Adjust position as needed
    scene.add(textMesh);

    // Create stars
    const starGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 100; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.x = Math.random() * longGeometry * 6 - longGeometry * 3;
      star.position.y = Math.random() * shortGeometry * 4 - shortGeometry * 2;
      star.position.z = -(Math.random() + 1) * 40;
      scene.add(star);
    }

    // Create walls
    const backgroundWall = new THREE.BoxGeometry(
      longGeometry,
      shortGeometry,
      1
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

    const planetTextures = [
      textureLoader.load(mercury),
      textureLoader.load(venus),
      textureLoader.load(world),
      textureLoader.load(mars),
      textureLoader.load(jupiter),
      textureLoader.load(saturn),
      textureLoader.load(uranus),
      textureLoader.load(neptune),
    ];

    const planetMaterials = [
      new THREE.MeshStandardMaterial({ map: planetTextures[0] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[1] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[2] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[3] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[4] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[5] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[6] }),
      new THREE.MeshStandardMaterial({ map: planetTextures[7] }),
    ];

    const texture = textureLoader.load(coverImage);
    const textureWorld = textureLoader.load(world);
    const cylinderMaterial = new THREE.MeshStandardMaterial({
      map: texture,
    });

    const ballMaterial = new THREE.MeshStandardMaterial({
      map: textureWorld,
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
      new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), planetMaterials[0]),
      new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), planetMaterials[1]),
      new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), planetMaterials[2]),
      new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), planetMaterials[3]),
      new THREE.Mesh(new THREE.SphereGeometry(30, 32, 32), planetMaterials[4]),
      new THREE.Mesh(new THREE.SphereGeometry(10, 32, 32), planetMaterials[5]),
      new THREE.Mesh(new THREE.SphereGeometry(5, 32, 32), planetMaterials[6]),
      new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), planetMaterials[7]),
    ];

    orbits[0].position.set(-19, wallOffsetY + wallThickness, 10);
    orbits[1].position.set(-12, wallOffsetY + wallThickness * 2, 15);
    orbits[2].position.set(-10, wallOffsetY + wallThickness * 3, -10);
    orbits[3].position.set(-3, wallOffsetY + wallThickness * 4, -15);
    orbits[4].position.set(-1, wallOffsetY + wallThickness * 5, 10);
    orbits[5].position.set(6, wallOffsetY + wallThickness * 6, 20);
    orbits[6].position.set(9, wallOffsetY + wallThickness * 8, 30);
    orbits[7].position.set(17, wallOffsetY + wallThickness * 2, 40);
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
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0, 0);
    scene.add(ball);

    // Add light to the ball
    const ballLight = new THREE.PointLight(0xffff00, 30, 30, 2);
    ballLight.position.set(0, 0, 0);
    ball.add(ballLight);

    // Add lights
    const pointLight = new THREE.PointLight(0xaaaa00, 600, 80, 2);
    pointLight.position.set(0, 0, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Animation loop
    let ballDirection = new THREE.Vector3(1, 1, 0).normalize();
    function animate() {
      requestAnimationFrame(animate);

      // Move the ball
      ball.position.add(ballDirection.clone().multiplyScalar(ballSpeed));
      ball.rotation.z += ballDirection.y * 0.1;

      // Animate Orbits position
      orbits.forEach((orbit, index) => {
        orbit.rotation.x += 0.01;
        orbit.rotation.z += 0.01;
        const radius = wallOffsetX + wallThickness * index * 10;
        const angle = orbit.rotation.x + index * 1;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(angle) * radius;
        orbit.position.set(x, y, z);
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
      if (removeShake === true) {
        camera.rotation.x += ballDirection.x * ballSpeed * 0.01;
        camera.rotation.y -= ballDirection.y * ballSpeed * 0.01;
        camera.rotation.z -= ballDirection.x * ballSpeed * 0.01;
        const cameraZOffset = 35 - Math.pow(Math.abs(ball.position.x), 0.8);
        camera.position.set(ball.position.x, ball.position.y, cameraZOffset);
      } else {
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
        const cameraZOffset = 35;
        camera.position.set(0, 0, cameraZOffset);
      }

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
          if (i === 2 || i === 3) ballDirection.x *= -1;
          else ballDirection.y *= -1;
        }
      }

      renderer.render(scene, camera);
      handleResize();
    }

    animate();

    function handleResize() {
      const newAspectRatio = getAspectRatio();
      aspectRatio = newAspectRatio;
      camera.aspect = newAspectRatio;
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef, aspectRatio]);

  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  useEffect(() => {
    function handleResize() {}
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          overflow: "hidden",
        }}
      ></div>
      <button
        className="absolute top-0 right-0 p-2 rounded"
        onClick={() => {
          removeShake = !removeShake;
        }}
      >
        <img
          src={world}
          alt="Image"
          class="w-16 h-16 object-cover rounded-full"
        />
      </button>
    </>
  );
}

export default Pong3D;
