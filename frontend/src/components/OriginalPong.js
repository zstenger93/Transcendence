import React, { useEffect, useRef } from 'react';




const OriginalPong = () => {
	const drawWhiteStripe = (ctx, canvas) => {
		ctx.fillStyle = '#FFFFFF';
		const stripeWidth = 4;
		const stripeHeight = canvas.height;
		const x = canvas.width / 2 - stripeWidth / 2;
		const y = 0;
		ctx.fillRect(x, y, stripeWidth, stripeHeight);
	};

	const canvasRef = useRef(null);
  const paddleWidth = 10, paddleHeight = 60;
  let leftPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
  let rightPaddleY = canvasRef.current ? canvasRef.current.height / 2 - paddleHeight / 2 : 0;
  let ballX = canvasRef.current ? canvasRef.current.width / 2 : 0;
  let ballY = canvasRef.current ? canvasRef.current.height / 2 : 0;
  let ballSpeedX = 3, ballSpeedY = 2;

  const draw = () => {
	const canvas = canvasRef.current;
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawWhiteStripe(ctx, canvas);
	ctx.fillStyle = '#FF0000';
	ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
	if (ballY > rightPaddleY + paddleHeight / 2)
		rightPaddleY += 4
	else if (ballY < rightPaddleY + paddleHeight / 2)
		rightPaddleY -= 4
	ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
	ctx.beginPath();
	ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
	ctx.fillStyle = '#FFFF00';
	ctx.fill();
	ctx.closePath();
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballY - 8 < 0 || ballY + 8 > canvas.height)
		ballSpeedY = -ballSpeedY;
	if ((ballX - 8 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) || (ballX + 8 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight))
			ballSpeedX = -ballSpeedX;
	if (ballX - 8 < 0 || ballX + 8 > canvas.width)
		ballSpeedX = -ballSpeedX;
	requestAnimationFrame(draw);
  };
  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') leftPaddleY -= 8;
      else if (event.key === 'ArrowDown') leftPaddleY += 8;
      leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvasRef.current.height - paddleHeight));
    });
    draw();
    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, [leftPaddleY]);

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas
        ref={canvasRef}
        className="border-8 border-solid border-white bg-black"
        width="1600"
        height="900	"
      ></canvas>
    </div>
  );
};

export default OriginalPong;
