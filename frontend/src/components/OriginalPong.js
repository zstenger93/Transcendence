	import React, { useEffect, useRef } from 'react';

	const OriginalPong = () => {
		// Default Parameters
		const defaultSpeedX = 200;
		const defaultSpeedY = 20;
		let scoreLeft = 0;
		let scoreRight = 0;
		const canvasRef = useRef(null);
		let paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
		let paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
		let leftPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
		let rightPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
		let ballX = canvasRef.current ? canvasRef.current.width / 2 : 0;
		let ballY = canvasRef.current ? canvasRef.current.height / 2 : 0;
		let ballSpeedX = defaultSpeedX;
		let ballSpeedY = defaultSpeedY;
		let canvasDefaultWidth = 1920;
		let sizeSpeedRatio = canvasRef.current ? canvasRef.current.width / canvasDefaultWidth : 1;
		let lastFrame = 0;
		let dt = 0;

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
			const aiSpeed = 240;
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
			const ballAngleOffset = 0.02;
			const ballSpeedIncrease = 100;
			ballX += ballSpeedX * dt * sizeSpeedRatio;
			ballY += ballSpeedY * dt * sizeSpeedRatio;
			if (ballY - 8 < 0 || ballY + 8 > canvas.height)
				ballSpeedY = -ballSpeedY;
			if (ballX - 8 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight)
			{
				const leftPaddleCenterY = leftPaddleY + paddleHeight / 2;
				const distanceFromCenter = ballY - leftPaddleCenterY;
				ballSpeedX *= -1;
				if (ballSpeedX < 0)
					ballSpeedX -= ballSpeedIncrease;
				else
					ballSpeedX += ballSpeedIncrease;
				ballSpeedY += distanceFromCenter * ballAngleOffset * sizeSpeedRatio * Math.abs(ballSpeedX);
			}
			else if (ballX + 8 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
			{
				const rightPaddleCenterY = rightPaddleY + paddleHeight / 2;
				const distanceFromCenter = ballY - rightPaddleCenterY;
				ballSpeedX *= -1;
				if (ballSpeedX < 0)
					ballSpeedX -= ballSpeedIncrease;
				else
					ballSpeedX += ballSpeedIncrease;
				ballSpeedY += distanceFromCenter * ballAngleOffset * sizeSpeedRatio * Math.abs(ballSpeedX);
			}
			if (ballX - 8 < 0) {
				ballX = canvas.width / 2;
				ballY = canvas.height / 2;
				ballSpeedX = defaultSpeedX;
				ballSpeedY = defaultSpeedY;
				scoreRight += 1;
			} else if (ballX + 8 > canvas.width) {
				ballX = canvas.width / 2;
				ballY = canvas.height / 2;
				ballSpeedX = -defaultSpeedX;
				ballSpeedY = -defaultSpeedY;
				scoreLeft += 1;
			}
		};
		
		// this function draws scores
		const drawScores = (ctx, canvas) => {
			ctx.fillStyle = '#FFFFFF';
			ctx.font = '80px Helvetica';
			ctx.fillText(`${scoreLeft}`, canvas.width / 2 - 100, 100);
			ctx.fillText(`${scoreRight}`, canvas.width / 2 + 60, 100);
		};
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
			if (ballX === 0 || ballX === canvasRef.current.width)
				ballSpeedX = -ballSpeedX;
			if (ballY === 0 || ballY === canvasRef.current.height)
				ballSpeedY = -ballSpeedY;
		};
	

	const draw = (timestamp) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		dt = (timestamp - lastFrame) / 1000;
		lastFrame = timestamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawWhiteStripe(ctx, canvas);
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
		ArtificialInteligence(ctx, canvas);
		updateBallPosition(canvas);
		drawBall(ctx, canvas);
		drawScores(ctx, canvas);
		requestAnimationFrame(draw);
	};

	useEffect(() => {
		const playerSpeed = 10;
		const handleKeyDown = (event) => {
		  if (canvasRef.current) {
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
	  }, [canvasRef]);

	return (
		<div className="flex justify-center items-center h-screen">
		<canvas
			ref={canvasRef}
			className="border-8 border-solid border-white bg-black"
		></canvas>
		</div>
	);
	};

	export default OriginalPong;
