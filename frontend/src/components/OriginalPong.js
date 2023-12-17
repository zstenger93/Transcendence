import React, { useEffect, useRef } from 'react';




const OriginalPong = () => {
	// Default Parameters
	let paddleOffset = 20;
	let scoreLeft = 0;
	let scoreRight = 0;
	const canvasRef = useRef(null);
	let paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
	let paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
	let leftPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
	let rightPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
	let ballX = canvasRef.current ? canvasRef.current.width / 2 : 0;
	let ballY = canvasRef.current ? canvasRef.current.height / 2 : 0;
	let ballSpeedX = 100;
	let ballSpeedY = 20;
	let canvasDefaultWidth = 1920;
	let sizeSpeedRatio = canvasRef.current ? canvasDefaultWidth / canvasRef.current.width : 1;
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
		if (ballY > rightPaddleY + paddleHeight / 2)
			rightPaddleY += 4
		else if (ballY < rightPaddleY + paddleHeight / 2)
			rightPaddleY -= 4
		ctx.fillRect(canvas.width - paddleWidth - paddleOffset, rightPaddleY, paddleWidth, paddleHeight);
	}
	// This function Updates The Ball Positions
	const updateBallPosition = (canvas) => {
		ballX += ballSpeedX * dt * sizeSpeedRatio;
		ballY += ballSpeedY * dt * sizeSpeedRatio;
		if (ballY - 8 < 0 || ballY + 8 > canvas.height)
		  ballSpeedY = -ballSpeedY;
		if ((ballX - 8 < paddleWidth + paddleOffset && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) || (ballX + 8 > canvas.width - paddleWidth - paddleOffset && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight))
		  ballSpeedX = -ballSpeedX;
		if (ballX - 8 < 0) {
			ballX = canvas.width / 2;
			ballY = canvas.width / 2;
			ballSpeedX = -ballSpeedX;
			scoreRight += 1;
		} else if (ballX + 8 > canvas.width) {
		  ballX = canvas.width / 2;
		  ballY = canvas.height / 2;
		  ballSpeedX = -ballSpeedX;
		  scoreLeft += 1;
		}
	  };

	const drawScores = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		ctx.font = '80px Helvetica';
		ctx.fillText(`${scoreLeft}`, canvas.width / 2 - 100, 100);
		ctx.fillText(`${scoreRight}`, canvas.width / 2 + 60, 100);
	};

	const drawBall = (ctx, canvas) => {
		ctx.beginPath();
		ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
		ctx.fillStyle = '#FFFF00';
		ctx.fill();
		ctx.closePath();
	}

    const handleResize = () => {
		const screenWidth = window.innerWidth;
		const canvasWidth = 0.8 * screenWidth;
		const canvasHeight = (canvasWidth / 16) * 9;
		canvasRef.current.width = canvasWidth;
		canvasRef.current.height = canvasHeight;
		paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
		paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;

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
	ctx.fillRect(paddleOffset, leftPaddleY, paddleWidth, paddleHeight);
	ArtificialInteligence(ctx, canvas);
	updateBallPosition(canvas);
	drawBall(ctx, canvas);
	drawScores(ctx, canvas);
	requestAnimationFrame(draw);
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') leftPaddleY -= 8;
      else if (event.key === 'ArrowDown') leftPaddleY += 8;
      leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvasRef.current.height - paddleHeight));
    });
	window.addEventListener('resize', handleResize);
    handleResize();
    draw(0);
    return () => {
      document.removeEventListener('keydown', () => {});
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
