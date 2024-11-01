"use client";

import React, { useState, useEffect, useRef } from "react";

const CANVAS_SIZE = 300;
const SNAKE_SIZE = 10;
const GAME_SPEED = 100;

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 150, y: 150 }]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [dir, setDir] = useState({ x: SNAKE_SIZE, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (dir.y === 0) setDir({ x: 0, y: -SNAKE_SIZE });
          break;
        case "ArrowDown":
          if (dir.y === 0) setDir({ x: 0, y: SNAKE_SIZE });
          break;
        case "ArrowLeft":
          if (dir.x === 0) setDir({ x: -SNAKE_SIZE, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x === 0) setDir({ x: SNAKE_SIZE, y: 0 });
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [dir]);

  useEffect(() => {
    if (!gameStarted) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const newHead = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y };

      // Check for collisions
      if (
        newHead.x < 0 ||
        newHead.x >= CANVAS_SIZE ||
        newHead.y < 0 ||
        newHead.y >= CANVAS_SIZE ||
        newSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(newHead);

      // Check if snake ate the food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(score + 1);
        generateFood();
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameLoop = setInterval(moveSnake, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [snake, dir, food, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      generateFood();
    }
  }, [gameStarted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x, segment.y, SNAKE_SIZE, SNAKE_SIZE);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, SNAKE_SIZE, SNAKE_SIZE);
  }, [snake, food]);

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)) * SNAKE_SIZE,
      y: Math.floor(Math.random() * (CANVAS_SIZE / SNAKE_SIZE)) * SNAKE_SIZE,
    };
    setFood(newFood);
  };

  const startGame = () => {
    setSnake([{ x: 150, y: 150 }]);
    setDir({ x: SNAKE_SIZE, y: 0 });
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="border border-gray-300"
      />
      <div className="mt-4">
        <p className="text-xl font-bold">Score: {score}</p>
        {!gameStarted && !gameOver && (
          <button
            onClick={startGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        )}
        {gameOver && (
          <div>
            <p className="text-xl font-bold text-red-500">Game Over!</p>
            <button
              onClick={startGame}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
