import React, { useEffect, useRef, useState } from 'react';

const OriginalPong = () => {
	const [gameState, setGameState] = useState('start');

	const canvasRef = useRef(null);
	// default parameters
	const defaultSpeedX = 640;
	const defaultSpeedY = 20;
	const winningScore = 5;
	let paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
	let paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
	let leftPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
	let rightPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
	let ballX = canvasRef.current ? canvasRef.current.width / 2 : 400;
	let ballY = canvasRef.current ? canvasRef.current.height / 2 : 400;
	let ballSpeedX = defaultSpeedX;
	let ballSpeedY = defaultSpeedY;
	let canvasDefaultWidth = 1920;
	let scoreLeft = 0;
	let scoreRight = 0;
	let sizeSpeedRatio = canvasRef.current ? canvasRef.current.width / canvasDefaultWidth : 1;
	let lastFrame = performance.now();
	let dt = 0;

	const startGame = () => {
		setGameState('playing');
		scoreLeft = 0;
		scoreRight = 0;

		paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
		paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
		leftPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
		rightPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
		ballX = canvasRef.current.width / 2;
		ballY = canvasRef.current.height / 2;
		ballSpeedX = defaultSpeedX;
		ballSpeedY = defaultSpeedY;
		sizeSpeedRatio = canvasRef.current ? canvasRef.current.width / canvasDefaultWidth : 1;
		lastFrame = performance.now();
	};

	// This Function Adds A White Stripe in The middle of the map
	const drawWhiteStripe = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		const stripeWidth = 8;
		const stripeHeight = canvas.height;
		const x = canvas.width / 2 - stripeWidth / 2;
		const y = 0;
		ctx.fillRect(x, y, stripeWidth, stripeHeight);
	};
	// This is bloody AI
	const ArtificialInteligence = (ctx, canvas) => {
		const aiSpeed = 440;
		let tempPadleY = rightPaddleY;
		if (ballY > rightPaddleY + paddleHeight / 2)
			tempPadleY += aiSpeed * dt * sizeSpeedRatio;
		else if (ballY < rightPaddleY + paddleHeight / 2)
			tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
		tempPadleY = Math.max(0, Math.min(tempPadleY, canvas.height - paddleHeight));
		rightPaddleY = tempPadleY;
		ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
	}
	// This function Updates The Ball Positions
	const updateBallPosition = (canvas) => {
		if (gameState !== 'playing')
			return;
		const ballAngleOffset = 0.02;
		const ballSpeedIncrease = 50;
		ballX += ballSpeedX * dt * sizeSpeedRatio;
		ballY += ballSpeedY * dt * sizeSpeedRatio;
		if (ballY < 0) {
			ballY = 2;
			ballSpeedY = -ballSpeedY;
		}
		else if (ballY > canvas.height) {
			ballY = canvas.height - 2;
			ballSpeedY = -ballSpeedY;
		}
		if (ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
			const leftPaddleCenterY = leftPaddleY + paddleHeight / 2;
			const distanceFromCenter = ballY - leftPaddleCenterY;
			ballX = paddleWidth + 10;
			ballSpeedX *= -1;
			if (ballSpeedX < 0) ballSpeedX -= ballSpeedIncrease;
			else ballSpeedX += ballSpeedIncrease;
			ballSpeedY += distanceFromCenter * ballAngleOffset * sizeSpeedRatio * Math.abs(ballSpeedX);
		} else if (ballX > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
			const rightPaddleCenterY = rightPaddleY + paddleHeight / 2;
			const distanceFromCenter = ballY - rightPaddleCenterY;
			ballX = canvas.width - paddleWidth - 10;
			ballSpeedX *= -1;
			if (ballSpeedX < 0) ballSpeedX -= ballSpeedIncrease;
			else ballSpeedX += ballSpeedIncrease;
			ballSpeedY += distanceFromCenter * ballAngleOffset * sizeSpeedRatio * Math.abs(ballSpeedX);
		} else if (ballX - 8 < 0) {
			ballX = canvas.width / 2;
			ballY = canvas.height / 2;
			ballSpeedX = defaultSpeedX * sizeSpeedRatio;
			ballSpeedY = defaultSpeedY * sizeSpeedRatio;
			scoreRight += 1;
		} else if (ballX + 8 > canvas.width) {
			ballX = canvas.width / 2;
			ballY = canvas.height / 2;
			ballSpeedX = -defaultSpeedX * sizeSpeedRatio;
			ballSpeedY = -defaultSpeedY * sizeSpeedRatio;
			scoreLeft += 1;
		}
	};

	const handlePlayAgain = () => {
		setGameState('start');
	};

	// this function draws scores
	const drawScores = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		ctx.font = '80px Helvetica';
		ctx.fillText(`${scoreLeft}`, canvas.width / 2 - 100, 100);
		ctx.fillText(`${scoreRight}`, canvas.width / 2 + 60, 100);
	};


	const changeScenes = () => {
		if (scoreLeft === winningScore) {
			setGameState('win');
			scoreLeft = 0;
			scoreRight = 0;
			return;
		}
		else if (scoreRight === winningScore) {
			scoreLeft = 0;
			scoreRight = 0;
			setGameState('lose');
			return;
		}
	}
	// this Function Surprise draws a ball
	const drawBall = (ctx, canvas) => {
		ctx.beginPath();
		ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
		ctx.fillStyle = '#FFFF00';
		ctx.fill();
		ctx.closePath();
	}

	// This Monster resized the field
	const handleResize = () => {
		const screenWidth = window.innerWidth;
		const canvasWidth = 0.8 * screenWidth;
		const canvasHeight = (canvasWidth / 16) * 9;
		canvasRef.current.width = canvasWidth;
		canvasRef.current.height = canvasHeight;
		const sizeRatioX = canvasRef.current ? canvasRef.current.width / canvasWidth : 1;
		const sizeRatioY = canvasRef.current ? canvasRef.current.height / canvasHeight : 1;
		paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 1;
		paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 1;
		sizeSpeedRatio = canvasRef.current ? canvasRef.current.width / canvasDefaultWidth : 1;
		ballX *= sizeRatioX;
		ballY *= sizeRatioY;
		leftPaddleY *= sizeRatioY;
		rightPaddleY *= sizeRatioY;
		leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvasRef.current.height - paddleHeight));
		rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvasRef.current.height - paddleHeight));
		ballX = Math.max(0, Math.min(ballX, canvasRef.current.width));
		ballY = Math.max(0, Math.min(ballY, canvasRef.current.height));
	};

	const drawStartScreen = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		ctx.font = '40px Helvetica';
		ctx.fillText('Press "Start" to begin', canvas.width / 2 - 180, canvas.height / 2 - 40);
	};

	const drawGameOverScreen = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		ctx.font = '40px Helvetica';
		if (gameState === 'win')
			ctx.fillText('You Win!', canvas.width / 2 - 80, canvas.height / 2 - 40);
		else
			ctx.fillText('Game Over!', canvas.width / 2 - 110, canvas.height / 2 - 40);
		ctx.font = '20px Helvetica';
		ctx.fillText('Press "Play Again" to restart', canvas.width / 2 - 120, canvas.height / 2 + 80);
	};

	const draw = (timestamp) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		dt = (timestamp - lastFrame) / 1000;
		lastFrame = timestamp;

		// Clear the canvas first
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (gameState === 'start') {
			drawStartScreen(ctx, canvas);
		} else if (gameState === 'win' || gameState === 'lose') {
			drawGameOverScreen(ctx, canvas);
		} else {
			paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
			paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
			drawWhiteStripe(ctx, canvas);
			ctx.fillStyle = '#FF0000';
			ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
			ArtificialInteligence(ctx, canvas);
			updateBallPosition(canvas);
			drawBall(ctx, canvas);
			drawScores(ctx, canvas);
			changeScenes();
		}
		requestAnimationFrame(draw);
	};


	useEffect(() => {
		const playerSpeed = 20;
		const handleKeyDown = (event) => {
			if (canvasRef.current && gameState === 'playing') {
				if (event.key === 'ArrowUp') leftPaddleY -= playerSpeed;
				else if (event.key === 'ArrowDown') leftPaddleY += playerSpeed;
				leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvasRef.current.height - paddleHeight));
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		window.addEventListener('resize', handleResize);
		handleResize();
		draw(0);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [canvasRef, gameState]);

	return (
		<div className="flex justify-center items-center h-screen">
			<canvas ref={canvasRef} className="border-8 border-solid border-white bg-black"></canvas>
			{gameState === 'start' && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
					<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={startGame}>
						Start
					</button>
				</div>
			)}
			{gameState !== 'start' && gameState !== 'playing' && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handlePlayAgain}>
						Play Again
					</button>
				</div>
			)}
		</div>
	);
};


export default OriginalPong;