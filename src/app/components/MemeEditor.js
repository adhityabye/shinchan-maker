"use client";

import React, { useState, useRef, useEffect } from "react";

const MemeEditor = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [stickers, setStickers] = useState([]);
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const canvasRef = useRef(null);

  const defaultStickers = [
    "/meme/STICKER1.png",
    "/meme/STICKER2.png",
    "/meme/STICKER3.png",
    "/meme/STICKER4.png",
    "/meme/STICKER5.png",
    "/meme/TEKS 1.png",
    "/meme/TEKS 2.png",
    "/meme/TEKS 3.png",
  ];

  useEffect(() => {
    drawMeme();
  }, [backgroundImage, stickers, texts]);

  const drawMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (backgroundImage) {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    stickers.forEach((sticker) => {
      ctx.drawImage(
        sticker.img,
        sticker.x,
        sticker.y,
        sticker.width,
        sticker.height
      );
    });

    texts.forEach((text) => {
      ctx.font = "bold 30px Impact";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.fillText(text.content, text.x, text.y);
      ctx.strokeText(text.content, text.x, text.y);
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleStickerAdd = (src) => {
    const img = new Image();
    img.onload = () => {
      setStickers([
        ...stickers,
        { img, x: 150, y: 150, width: 100, height: 100 },
      ]);
    };
    img.src = src;
  };

  const handleTextAdd = () => {
    if (currentText) {
      setTexts([...texts, { content: currentText, x: 150, y: 150 }]);
      setCurrentText("");
    }
  };

  const handleStickerDelete = (index) => {
    const newStickers = stickers.filter((_, i) => i !== index);
    setStickers(newStickers);
  };

  const handleTextDelete = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let draggedItem = null;
    let resizingItem = null;

    for (let i = stickers.length - 1; i >= 0; i--) {
      const sticker = stickers[i];
      if (
        x >= sticker.x &&
        x <= sticker.x + sticker.width &&
        y >= sticker.y &&
        y <= sticker.y + sticker.height
      ) {
        if (
          x >= sticker.x + sticker.width - 10 &&
          y >= sticker.y + sticker.height - 10
        ) {
          resizingItem = { type: "sticker", index: i };
        } else {
          draggedItem = { type: "sticker", index: i };
        }
        break;
      }
    }

    if (!draggedItem && !resizingItem) {
      for (let i = texts.length - 1; i >= 0; i--) {
        const text = texts[i];
        const textWidth = canvasRef.current
          .getContext("2d")
          .measureText(text.content).width;
        if (
          x >= text.x - textWidth / 2 &&
          x <= text.x + textWidth / 2 &&
          y >= text.y - 15 &&
          y <= text.y + 15
        ) {
          draggedItem = { type: "text", index: i };
          break;
        }
      }
    }

    if (draggedItem) {
      setDragging({ ...draggedItem, startX: x, startY: y });
    } else if (resizingItem) {
      setResizing({ ...resizingItem, startX: x, startY: y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (dragging) {
      const dx = x - dragging.startX;
      const dy = y - dragging.startY;

      if (dragging.type === "sticker") {
        const newStickers = [...stickers];
        newStickers[dragging.index].x += dx;
        newStickers[dragging.index].y += dy;
        setStickers(newStickers);
      } else if (dragging.type === "text") {
        const newTexts = [...texts];
        newTexts[dragging.index].x += dx;
        newTexts[dragging.index].y += dy;
        setTexts(newTexts);
      }

      setDragging({ ...dragging, startX: x, startY: y });
    } else if (resizing) {
      const dx = x - resizing.startX;
      const dy = y - resizing.startY;

      if (resizing.type === "sticker") {
        const newStickers = [...stickers];
        newStickers[resizing.index].width += dx;
        newStickers[resizing.index].height += dy;
        setStickers(newStickers);
      }

      setResizing({ ...resizing, startX: x, startY: y });
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
    setResizing(null);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "meme.png";
    link.click();
  };

  return (
    <div className="space-y-4 rounded-lg justify-center">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border border-gray-300"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <div className="space-y-2">
        <div>
          <label className="block mb-1">Choose background:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 p-1"
          />
        </div>
        <div>
          <label className="block mb-1">Add sticker:</label>
          <div className="flex space-x-2">
            {defaultStickers.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Sticker ${index + 1}`}
                className="w-16 h-16 object-cover cursor-pointer border border-gray-300"
                onClick={() => handleStickerAdd(src)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1">Add text:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="border border-gray-300 p-1 flex-grow"
            />
            <button
              onClick={handleTextAdd}
              className="px-2 py-1 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1">Stickers:</label>
          <ul className="space-y-1">
            {stickers.map((_, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>Sticker {index + 1}</span>
                <button
                  onClick={() => handleStickerDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block mb-1">Text elements:</label>
          <ul className="space-y-1">
            {texts.map((text, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{text.content}</span>
                <button
                  onClick={() => handleTextDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleDownload}
          className="px-2 py-1 bg-green-500 text-white rounded"
        >
          Download Meme
        </button>
      </div>
    </div>
  );
};

export default MemeEditor;
