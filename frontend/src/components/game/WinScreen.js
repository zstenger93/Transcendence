import React, { useState } from 'react';

const WinScreen = ({ t, navigate, GameCanvas, backgroundImage, WelcomeButtonStyle, BackButton }) => {
    const [gameStarted, setGameStarted] = useState(false);

    const handleButtonClick = () => {
        setGameStarted(true);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {gameStarted ? (
                <GameCanvas />
            ) : (
                <div className="relative">
                    <img
                        src={backgroundImage}
                        style={{ width: "80vw", height: "100%", objectFit: "cover" }}
                        alt="Background"
                        className="rounded-xl shadow-lg"
                    />
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
                    -translate-y-1/2 text-center font-bold font-nosifer"
                    >
                        <p>{t("YOU WON!")}</p>
                        <button
                            onClick={handleButtonClick}
                            className={`mt-10 ${WelcomeButtonStyle}`}
                        >
                            {t("Play Again")}
                        </button>
                    </div>
                    <BackButton navigate={navigate} t={t} />
                </div>
            )}
        </div>
    );
};

export default WinScreen;