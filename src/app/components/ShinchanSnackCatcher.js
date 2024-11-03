import React, { useState, useEffect, useRef } from "react";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const BASKET_WIDTH = 80;
const BASKET_HEIGHT = 60;
const ITEM_SIZE = 40;
const FALL_SPEED = 2;

const ShinchanSnackCatcher = () => {
  const [basketPosition, setBasketPosition] = useState(
    GAME_WIDTH / 2 - BASKET_WIDTH / 2
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef();
  const canvasRef = useRef(null);
  const fallingItemsRef = useRef([]);
  const imagesRef = useRef({});

  useEffect(() => {
    const loadImages = () => {
      const cookieImage = new Image();
      const homeworkImage = new Image();
      const shinchanImage = new Image();

      cookieImage.src = "/games/cookies.png";
      homeworkImage.src = "/games/homework.png";
      shinchanImage.src = "/games/shinchan.png";

      cookieImage.onload = () => (imagesRef.current.cookie = cookieImage);
      homeworkImage.onload = () => (imagesRef.current.homework = homeworkImage);
      shinchanImage.onload = () => (imagesRef.current.shinchan = shinchanImage);
    };

    loadImages();

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setBasketPosition((prev) => Math.max(0, prev - 10));
      } else if (e.key === "ArrowRight") {
        setBasketPosition((prev) =>
          Math.min(GAME_WIDTH - BASKET_WIDTH, prev + 10)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gameLoop = () => {
      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      // Draw basket using Shinchan image
      const basketImg = imagesRef.current.shinchan;
      if (basketImg) {
        ctx.drawImage(
          basketImg,
          basketPosition,
          GAME_HEIGHT - BASKET_HEIGHT,
          BASKET_WIDTH,
          BASKET_HEIGHT
        );
      }

      // Update and draw falling items
      fallingItemsRef.current = fallingItemsRef.current.filter((item) => {
        const newY = item.y + FALL_SPEED;
        const itemImg = item.isGood
          ? imagesRef.current.cookie
          : imagesRef.current.homework;
        if (itemImg) {
          ctx.drawImage(itemImg, item.x, newY, ITEM_SIZE, ITEM_SIZE);
        }

        // Check for collision with basket
        if (
          newY + ITEM_SIZE > GAME_HEIGHT - BASKET_HEIGHT &&
          newY < GAME_HEIGHT &&
          item.x + ITEM_SIZE > basketPosition &&
          item.x < basketPosition + BASKET_WIDTH
        ) {
          if (item.isGood) {
            setScore((prev) => prev + 1);
          } else {
            setGameOver(true);
          }
          return false;
        }

        if (newY > GAME_HEIGHT) return false;

        item.y = newY;
        return true;
      });

      if (Math.random() < 0.02) {
        fallingItemsRef.current.push({
          x: Math.random() * (GAME_WIDTH - ITEM_SIZE),
          y: 0,
          isGood: Math.random() > 0.3, // 70% chance of good item
        });
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [basketPosition, gameOver]);

  const restartGame = () => {
    setScore(0);
    fallingItemsRef.current = [];
    setGameOver(false);
  };

  return (
    <div className="rounded-lg flex flex-col items-center">
      <div className="mb-4">
        <span className="text-2xl font-bold">Score: {score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="border border-gray-300"
      />
      {gameOver && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Use left and right arrow keys to help Shinchan catch the cookies
      </div>
    </div>
  );
};

export default ShinchanSnackCatcher;
