"use client";

import React, { useRef, useEffect, useState } from "react";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

export default function Component() {
  const baseCanvasRef = useRef(null);
  const drawingCanvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(10);
  const [selectedImage, setSelectedImage] = useState("1.png");
  const [tool, setTool] = useState("brush");

  const images = ["1.png", "2.png", "3.png"];

  useEffect(() => {
    loadImage();
  }, [selectedImage]);

  const loadImage = () => {
    const baseCanvas = baseCanvasRef.current;
    const drawingCanvas = drawingCanvasRef.current;
    if (!baseCanvas || !drawingCanvas) return;

    const baseCtx = baseCanvas.getContext("2d");
    const drawingCtx = drawingCanvas.getContext("2d");
    if (!baseCtx || !drawingCtx) return;

    const img = new Image();
    img.onload = () => {
      baseCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      baseCtx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawingCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    img.src = `/coloring/${selectedImage}`;
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) return;

    const drawingCtx = drawingCanvas.getContext("2d");
    if (!drawingCtx) return;

    drawingCtx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) return;

    const drawingCtx = drawingCanvas.getContext("2d");
    if (!drawingCtx) return;

    const rect = drawingCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawingCtx.lineWidth = brushSize;
    drawingCtx.lineCap = "round";
    drawingCtx.lineJoin = "round";

    if (tool === "eraser") {
      drawingCtx.globalCompositeOperation = "destination-out";
    } else {
      drawingCtx.globalCompositeOperation = "source-over";
      drawingCtx.strokeStyle = color;
    }

    drawingCtx.lineTo(x, y);
    drawingCtx.stroke();
    drawingCtx.beginPath();
    drawingCtx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const drawingCanvas = drawingCanvasRef.current;
    if (!drawingCanvas) return;

    const drawingCtx = drawingCanvas.getContext("2d");
    if (!drawingCtx) return;

    drawingCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#000000",
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Shinchan Coloring Page</h2>
      <div className="mb-4 flex items-center justify-center w-full">
        <div className="mr-4">
          {colors.map((c) => (
            <button
              key={c}
              className={`w-8 h-8 rounded-full mx-1 ${
                color === c && tool === "brush"
                  ? "ring-2 ring-offset-2 ring-black"
                  : ""
              }`}
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                setTool("brush");
              }}
            />
          ))}
        </div>
        <button
          className={`w-8 h-8 rounded-full mx-1 bg-white border border-gray-300 flex items-center justify-center ${
            tool === "eraser" ? "ring-2 ring-offset-2 ring-black" : ""
          }`}
          onClick={() => setTool("eraser")}
        >
          ⌫
        </button>
        <div className="flex items-center ml-4">
          <span className="mr-2">
            {tool === "brush" ? "Brush" : "Eraser"} Size:
          </span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-32"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-center w-full">
        <span className="mr-2">Select Image:</span>
        <select
          value={selectedImage}
          onChange={(e) => setSelectedImage(e.target.value)}
          className="border border-gray-300 rounded p-1"
        >
          {images.map((img) => (
            <option key={img} value={img}>
              {img}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-[400px] h-[400px]">
        <canvas
          ref={baseCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="absolute top-0 left-0 border border-gray-300 z-10"
        />
        <canvas
          ref={drawingCanvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="absolute top-0 left-0 cursor-crosshair z-20"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
        />
      </div>
      <div className="mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={clearCanvas}
        >
          Clear Coloring
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            const baseCanvas = baseCanvasRef.current;
            const drawingCanvas = drawingCanvasRef.current;
            if (!baseCanvas || !drawingCanvas) return;

            const resultCanvas = document.createElement("canvas");
            resultCanvas.width = CANVAS_WIDTH;
            resultCanvas.height = CANVAS_HEIGHT;
            const resultCtx = resultCanvas.getContext("2d");
            if (!resultCtx) return;

            resultCtx.drawImage(baseCanvas, 0, 0);
            resultCtx.drawImage(drawingCanvas, 0, 0);

            const link = document.createElement("a");
            link.download = `colored_${selectedImage}`;
            link.href = resultCanvas.toDataURL();
            link.click();
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
