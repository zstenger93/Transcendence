import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import world from "../../images/game/world.jpg";
import mercury from "../../images/game/mercury.png";
import venus from "../../images/game/venus.jpg";
import mars from "../../images/game/mars.jpg";
import jupiter from "../../images/game/jupiter.jpg";
import saturn from "../../images/game/saturn.png";
import uranus from "../../images/game/uranus.png";
import neptune from "../../images/game/neptun.png";
import sunTex from "../../images/game/sun.jpg";
import goggins from "../../images/game/stayhard.png";
import death from "../../images/game/deathstar.png";
import FullScreenButton from "../../components/buttons/FullScreen";
import BackButton from "../../components/buttons/BackButton";
import { useLocation } from "react-router-dom";
import backgroundImage from "../../images/pongbg.png";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";
import EndScreen from "../../components/game/EndScreen";

function Pong3D() {
  const location = useLocation();
  const textureLoader = new THREE.TextureLoader();
  const longGeometry = 50;
  const shortGeometry = 30;
  const asteroidMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: textureLoader.load(venus),
    reflectivity: 1,
  });
  const [gameOver, setGameOver] = React.useState(false);
  const [returnCounter, setBounceCounter] = useState(0);

  const asteroidGeometry = new THREE.SphereGeometry(1, 32, 32);
  const asteroids = [];
  const containerRef = useRef(null);
  let aspectRatio = getAspectRatio();
  const paddleHeight = 4;
  const paddleWidth = 0.7;
  const wallOffsetX = 23.5;
  const wallOffsetY = 15;
  const wallThickness = 3;
  let ballSpeed = 0.3;
  let leftPaddlePosition = 0;
  let bounceCounter = 0;
  let isCodeExecuted = false;
  let lifes = 7;

  class Asteroid {
    constructor(x, y, radius, currentWayPoint, scene) {
      this.offset = Math.random() * 6 - wallThickness / 2;
      this.speed =
        ((2 * longGeometry + 2 * shortGeometry + 10 * this.offset) /
          (2 * longGeometry + 2 * shortGeometry)) *
        0.1;
      this.scene = scene;
      this.radius = radius;
      this.currentWayPoint = currentWayPoint;
      this.asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
      this.asteroid.position.set(
        x + this.offset,
        y + this.offset,
        Math.random()
      );
      this.asteroid.scale.set(
        Math.random() / 3 + 0.1,
        Math.random() / 3 + 0.1,
        Math.random() / 3 + 0.1
      );
      this.scene.add(this.asteroid);
    }

    move() {
      this.asteroid.rotation.x += this.offset * 0.01;
      this.asteroid.rotation.y += this.offset * 0.01;
      this.asteroid.rotation.z += 0.01;
      switch (this.currentWayPoint) {
        case 0:
          this.asteroid.position.x += this.speed;
          if (this.asteroid.position.x - this.offset > longGeometry / 2)
            this.currentWayPoint = 1;
          break;
        case 1:
          this.asteroid.position.y += this.speed;
          if (this.asteroid.position.y - this.offset > shortGeometry / 2)
            this.currentWayPoint = 2;
          break;
        case 2:
          this.asteroid.position.x -= this.speed;
          if (this.asteroid.position.x + this.offset < -longGeometry / 2)
            this.currentWayPoint = 3;
          break;
        case 3:
          this.asteroid.position.y -= this.speed;
          if (this.asteroid.position.y + this.offset < -shortGeometry / 2)
            this.currentWayPoint = 0;
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    // var loader = new THREE.GLTFLoader();
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
    const sunTexture = textureLoader.load(sunTex);
    camera.position.set(-15, -15, 35);
    //camera.position.set(0, 0, 35);
    camera.rotation.set(0.3, -0.3, -0.3); // -0.3. -0.3 -0.3

    // Create canvas for rendering text
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "20px nosifer";
    context.fillStyle = "white";
    context.fillText("BLACKHOLE PONG", 4, 24);
    // canvas.rotation.set(-1, 0, 0);
    //Text
    const textureText = new THREE.CanvasTexture(canvas);
    const textMaterial = new THREE.MeshBasicMaterial({
      map: textureText,
      transparent: true,
    });
    const textGeometry = new THREE.PlaneGeometry(15, 15);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(
      0,
      -shortGeometry / 2 - wallThickness * 3,
      wallThickness / 2 + 0.1
    );
    scene.add(textMesh);
    const boucneCanvas = document.createElement("canvas");
    const bounceContext = boucneCanvas.getContext("2d");
    bounceContext.font = "20px nosifer";
    bounceContext.fillStyle = "white";
    bounceContext.fillText("BOUNCE COUNT: 0", 6, 24);
    const bounceMaterialTexture = new THREE.CanvasTexture(boucneCanvas);
    const bounceMaterial = new THREE.MeshBasicMaterial({
      map: bounceMaterialTexture,
      transparent: true,
    });
    const bounceMesh = new THREE.Mesh(textGeometry, bounceMaterial);
    bounceMesh.position.set(
      shortGeometry / 2 + wallThickness,
      shortGeometry / 2 + wallThickness,
      0
    );
    scene.add(bounceMesh);
    // Create stars
    const starGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sunMaterialLayer2 = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      map: sunTexture,
      rougness: 0.1,
      metalness: 1,
      opacity: 0.1,
      transparent: true,
    });

    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8800,
      map: sunTexture,
      rougness: 0.1,
      metalness: 1,
    });
    const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sunGeometryLayer2 = new THREE.SphereGeometry(12, 32, 32);
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -20);
    const sunLayer2 = new THREE.Mesh(sunGeometryLayer2, sunMaterialLayer2);
    scene.add(sun);
    sun.add(sunLayer2);

    const stars = [];
    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.x = Math.random() * longGeometry * 14 - longGeometry * 7;
      star.position.y = Math.random() * shortGeometry * 8 - shortGeometry * 4;
      star.position.z = (Math.random() + 1) * -40;
      scene.add(star);
      stars.push(star);
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
      transparent: true,
      opacity: 0,
    });

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
      paddleWidth
    );
    const paddleMaterialGeometry = new THREE.MeshLambertMaterial({
      map: textureLoader.load(death),
      color: 0xffffff,
    });
    const leftPaddle = new THREE.Mesh(paddleGeometry, paddleMaterialGeometry);
    leftPaddle.position.set(-21, 0, 0);
    scene.add(leftPaddle);
    const rightPaddle = new THREE.Mesh(paddleGeometry, paddleMaterialGeometry);
    rightPaddle.position.set(21, 0, 0);
    scene.add(rightPaddle);
    // Create
    const ballGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const ball = new THREE.Mesh(ballGeometry, planetMaterials[7]);
    ball.position.set(0, 0, 0.5);
    scene.add(ball);

    // Add lights
    const pointLight = new THREE.PointLight(0xff8800, 1200, 120, 2);
    pointLight.position.set(0, 0, -9);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(pointLight, ambientLight);

    // Loop to add asteroids
    let asteroidsLong = 70;
    let asteroidsShort = (asteroidsLong / 5) * 2;
    for (let i = 0; i < asteroidsShort; i++) {
      const newAsteroid = new Asteroid(
        longGeometry / 2,
        -shortGeometry / 2 + (shortGeometry / asteroidsShort) * i,
        1,
        1,
        scene
      );
      asteroids.push(newAsteroid);
    }
    for (let i = 0; i < asteroidsShort; i++) {
      const newAsteroid = new Asteroid(
        -longGeometry / 2,
        -shortGeometry / 2 + (shortGeometry / asteroidsShort) * i,
        1,
        3,
        scene
      );
      asteroids.push(newAsteroid);
    }

    for (let i = 0; i < asteroidsLong; i++) {
      const newAsteroid = new Asteroid(
        -longGeometry / 2 + (longGeometry / asteroidsLong) * i,
        -shortGeometry / 2,
        1,
        0,
        scene
      );
      asteroids.push(newAsteroid);
    }

    for (let i = 0; i < asteroidsLong; i++) {
      const newAsteroid = new Asteroid(
        -longGeometry / 2 + (longGeometry / asteroidsLong) * i,
        shortGeometry / 2,
        1,
        2,
        scene
      );
      asteroids.push(newAsteroid);
    }

    const david = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(goggins),
        transparent: true,
      })
    );
    david.position.set(0, 1.41, 0);
    ball.add(david);
    // Animation loop

    let ballDirection = new THREE.Vector3(1, 1, 0).normalize();
    function animate() {
      requestAnimationFrame(animate);
      for (let i = 0; i < stars.length; i++) {
        stars[i].position.x += 0.1;
        if (stars[i].position.x > longGeometry * 7)
          stars[i].position.x = -longGeometry * 7;
      }

      // Move the ball
      ball.position.add(ballDirection.clone().multiplyScalar(ballSpeed));
      ball.rotation.y += ballDirection.x * 0.06;
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

      // Move the asteroids
      asteroids.forEach((asteroid) => {
        asteroid.move();
      });

      sun.rotation.y += 0.01;
      sun.rotation.z += 0.01;
      // My Amazing AI
      leftPaddle.position.y = Math.max(
        -wallOffsetY + paddleHeight / 2 + wallThickness / 2,
        Math.min(
          leftPaddlePosition,
          wallOffsetY - paddleHeight / 2 - wallThickness / 2
        )
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      leftPaddlePosition = leftPaddle.position.y;
      rightPaddle.position.y = Math.max(
        -wallOffsetY + paddleHeight / 2 + wallThickness / 2,
        Math.min(
          ball.position.y,
          wallOffsetY - paddleHeight / 2 - wallThickness / 2
        )
      );
      const leftPaddleBoundingBox = new THREE.Box3().setFromObject(leftPaddle);
      const rightPaddleBoundingBox = new THREE.Box3().setFromObject(
        rightPaddle
      );
      const ballBoundingBox = new THREE.Box3().setFromObject(ball);
      if (
        leftPaddleBoundingBox.intersectsBox(ballBoundingBox) ||
        rightPaddleBoundingBox.intersectsBox(ballBoundingBox)
      ) {
        if (leftPaddleBoundingBox.intersectsBox(ballBoundingBox)) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (!isCodeExecuted) {
            bounceCounter = bounceCounter + 1;
            bounceContext.clearRect(
              0,
              0,
              boucneCanvas.width,
              boucneCanvas.height
            );
            bounceContext.fillText("BOUNCE COUNT: " + bounceCounter, 6, 24);
            bounceMaterialTexture.needsUpdate = true;
            isCodeExecuted = true;
          } else {
            isCodeExecuted = false;
          }
        }
        ballDirection.x *= -1;
        ball.position.x += ballDirection.x * ballSpeed * 6;
      }
      for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const wallBoundingBox = new THREE.Box3().setFromObject(wall);
        const ballBoundingBox = new THREE.Box3().setFromObject(ball);
        if (wallBoundingBox.intersectsBox(ballBoundingBox)) {
          if (i === 2 || i === 3) {
            ballDirection.x *= -1;
            ball.position.x = 0;
            ball.position.y = 0;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            lifes = orbits.length - 1;
            if (orbits.length === 0) {
              if (orbits.length === 0) {
                setGameOver(true);
                setBounceCounter(bounceCounter);
                ballSpeed = 0;
              }
            }
            if (orbits.length > 0) {
              scene.remove(orbits[orbits.length - 1]);
              orbits.pop();
              ball.material = planetMaterials[lifes];
              ball.material.needsUpdate = true;
            }
            pointLight.intensity += 50;
            pointLight.distance += 10;
          } else ballDirection.y *= -1;
        }
      }

      renderer.render(scene, camera);
      handleResize();
    }

    animate();

    function handleResize() {
      const newAspectRatio = getAspectRatio();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      aspectRatio = newAspectRatio;
      camera.aspect = newAspectRatio;
      camera.updateProjectionMatrix();
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

    let isDragging = false;

    const disableScroll = (event) => {
      event.preventDefault();
    };

    const enableScroll = () => {
      window.removeEventListener("wheel", disableScroll, { passive: false });
      window.removeEventListener("touchmove", disableScroll, {
        passive: false,
      });
    };

    let isWKeyPressed = false;
    let isSKeyPressed = false;

    function handleKeyDown(event) {
      event.preventDefault();

      if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        isWKeyPressed = true;
      }

      if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        isSKeyPressed = true;
      }
    }

    function handleKeyUp(event) {
      event.preventDefault();

      if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
        isWKeyPressed = false;
      }

      if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
        isSKeyPressed = false;
      }
    }

    function animatePaddle() {
      if (isWKeyPressed) {
        leftPaddlePosition += 0.5;
      }

      if (isSKeyPressed) {
        leftPaddlePosition -= 0.5;
      }

      leftPaddlePosition = Math.max(
        -wallOffsetY + paddleHeight / 2 + wallThickness / 2,
        Math.min(
          leftPaddlePosition,
          wallOffsetY - paddleHeight / 2 - wallThickness / 2
        )
      );
      requestAnimationFrame(animatePaddle);
    }

    animatePaddle();

    function handleTouchStart(event) {
      isDragging = true;
    }

    function handleTouchMove(event) {
      if (!isDragging) return;
      const touchY = event.touches[0].clientY;
      let temp =
        ((touchY / window.innerHeight) * shortGeometry - shortGeometry / 2) *
        -1;
      if (leftPaddlePosition < temp) leftPaddlePosition += 1;
      else if (leftPaddlePosition > temp) leftPaddlePosition -= 1;
    }

    function handleTouchEnd() {
      isDragging = false;
    }

    window.addEventListener("wheel", disableScroll, { passive: false });
    window.addEventListener("touchmove", disableScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      enableScroll();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div id="3P" className="flex justify-center items-center h-screen">
      <FullScreenButton location={location} page="3P" />
      {gameOver ? (
        <EndScreen
          Game={Pong3D}
          backgroundImage={backgroundImage}
          WelcomeButtonStyle={WelcomeButtonStyle}
          BackButton={BackButton}
          score={returnCounter}
        />
      ) : (
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
        </>
      )}
    </div>
  );
}

export default Pong3D;
