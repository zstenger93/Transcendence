const handleResize = (
    canvasRef,
    resize,
    paddleWidth,
    paddleHeight,
    sizeSpeedRatio,
    canvasDefaultWidth,
    ballX,
    ballY,
    leftPaddleY,
    rightPaddleY
) => {
    if (canvasRef.current) {
        const screenWidth = window.innerWidth;
        let canvasWidth = screenWidth;
        if (resize === true) canvasWidth = 0.8 * screenWidth;
        const canvasHeight = (canvasWidth / 16) * 9;
        canvasRef.current.width = canvasWidth;
        canvasRef.current.height = canvasHeight;
        const sizeRatioX = canvasRef.current
            ? canvasRef.current.width / canvasWidth
            : 1;
        const sizeRatioY = canvasRef.current
            ? canvasRef.current.height / canvasHeight
            : 1;
        paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 1;
        paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 1;
        sizeSpeedRatio = canvasRef.current
            ? canvasRef.current.width / canvasDefaultWidth
            : 1;
        ballX *= sizeRatioX;
        ballY *= sizeRatioY;
        leftPaddleY *= sizeRatioY;
        rightPaddleY *= sizeRatioY;
        leftPaddleY = Math.max(
            0,
            Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
        );
        rightPaddleY = Math.max(
            0,
            Math.min(rightPaddleY, canvasRef.current.height - paddleHeight)
        );
        ballX = Math.max(0, Math.min(ballX, canvasRef.current.width));
        ballY = Math.max(0, Math.min(ballY, canvasRef.current.height));
    }
};

export default handleResize;