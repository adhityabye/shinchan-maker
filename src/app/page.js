"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaTelegramPlane, FaTwitter, FaChartBar } from "react-icons/fa";

import MemeEditor from "./components/MemeEditor";
import SnakeGame from "./components/SnakeGame";

export default function Component() {
  const [activeWindows, setActiveWindows] = useState({});
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const posRefs = useRef({});
  const [zIndex, setZIndex] = useState(1000);

  const toggleWindow = (id, isOpen) => {
    setActiveWindows((prev) => ({ ...prev, [id]: isOpen }));
    if (isOpen && !posRefs.current[id]) {
      posRefs.current[id] = {
        x: Math.random() * 100,
        y: Math.random() * 100,
        offsetX: 0,
        offsetY: 0,
        dragging: false,
      };
    }
    if (isOpen) {
      setZIndex((prev) => prev + 1);
      posRefs.current[id].zIndex = zIndex;
    }
  };

  const onMouseDown = (id, event) => {
    posRefs.current[id].offsetX = event.clientX - posRefs.current[id].x;
    posRefs.current[id].offsetY = event.clientY - posRefs.current[id].y;
    posRefs.current[id].dragging = true;
    setZIndex((prev) => prev + 1);
    posRefs.current[id].zIndex = zIndex;
  };

  const onMouseMove = (id, event) => {
    if (posRefs.current[id]?.dragging) {
      const newX = event.clientX - posRefs.current[id].offsetX;
      const newY = event.clientY - posRefs.current[id].offsetY;
      posRefs.current[id].x = newX;
      posRefs.current[id].y = newY;
      setActiveWindows((prev) => ({ ...prev })); // Force update
    }
  };

  const onMouseUp = (id) => {
    if (posRefs.current[id]?.dragging) {
      posRefs.current[id].dragging = false;
    }
  };

  const apps = [
    {
      id: 1,
      name: "Notes",
      icon: "📝",
      content: (
        <div className="space-y-4 p-4 h-full overflow-auto">
          <div className="bg-yellow-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Meeting Notes</h3>
            <p>Discuss project timeline and deliverables</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Shopping List</h3>
            <ul className="list-disc list-inside">
              <li>Milk</li>
              <li>Eggs</li>
              <li>Bread</li>
            </ul>
          </div>
          <div className="bg-green-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Ideas</h3>
            <p>New app concept: AI-powered personal assistant</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: "Photos",
      icon: "🖼️",
      content: (
        <div className="grid grid-cols-2 gap-4 p-4">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Photo 1"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Photo 2"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Photo 3"
            width={100}
            height={100}
            className="rounded-md"
          />
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="Photo 4"
            width={100}
            height={100}
            className="rounded-md"
          />
        </div>
      ),
    },
    {
      id: 3,
      name: "Game",
      icon: "🎮",
      content: (
        <div className="space-y-2 p-4 h-full overflow-auto">
          <SnakeGame />
        </div>
      ),
    },
    {
      id: 4,
      name: "Meme Editor",
      icon: "🖼️",
      content: (
        <div className="space-y-4 p-4">
          <MemeEditor />
        </div>
      ),
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/background-2.jpg')",
      }}
      onMouseUp={() => apps.forEach((app) => onMouseUp(app.id))}
    >
      <div className="absolute inset-0 p-4 grid grid-cols-10 grid-rows-6 gap-1">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center justify-center"
          >
            <button
              onClick={() => toggleWindow(app.id, true)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span className="text-4xl">{app.icon}</span>
            </button>
            <span className="text-white text-sm mt-1">{app.name}</span>
          </div>
        ))}
      </div>

      {Object.entries(activeWindows).map(
        ([id, isOpen]) =>
          isOpen && (
            <div
              key={id}
              className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                left: `${posRefs.current[id].x}px`,
                top: `${posRefs.current[id].y}px`,
                zIndex: posRefs.current[id].zIndex,
                width: "500px",
                height: "550px",
              }}
            >
              <div
                className="bg-gray-200 p-2 cursor-move flex items-center justify-between"
                onMouseDown={(e) => onMouseDown(id, e)}
                onMouseMove={(e) => onMouseMove(id, e)}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-2xl">
                    {apps.find((app) => app.id === parseInt(id)).icon}
                  </span>
                  <span className="font-semibold">
                    {apps.find((app) => app.id === parseInt(id)).name}
                  </span>
                </div>
                <button
                  onClick={() => toggleWindow(id, false)}
                  className="rounded-full hover:bg-gray-300 transition-colors duration-200 w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div className="h-[calc(100%-40px)] overflow-auto">
                {apps.find((app) => app.id === parseInt(id)).content}
              </div>
            </div>
          )
      )}

      <div className="absolute bottom-0 left-0 w-full bg-gray-800 text-white p-2 flex items-center space-x-4">
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="text-white hover:bg-white/20 p-1 rounded"
        >
          🪟
        </button>
        <div className="h-6 w-px bg-gray-600" />
        {apps.map(
          (app) =>
            activeWindows[app.id] && (
              <button
                key={app.id}
                onClick={() => toggleWindow(app.id, true)}
                className="text-white hover:bg-white/20 p-1 rounded flex items-center"
              >
                <span className="mr-2">{app.icon}</span>
                <span>{app.name}</span>
              </button>
            )
        )}
        <div className="flex-grow" />
        <span className="cursor-pointer">
          <FaTelegramPlane /> 
        </span>
        <span className="cursor-pointer">
          <FaTwitter /> 
        </span>
        <span className="cursor-pointer">
          <FaChartBar /> 
        </span>
      </div>

      {startMenuOpen && (
        <div className="absolute bottom-12 left-0 w-64 bg-gray-800 text-white rounded-tr-lg shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">Start Menu</h2>
          {apps.map((app) => (
            <button
              key={app.id}
              className="w-full text-left text-white hover:bg-white/20 p-2 rounded mb-2 flex items-center"
              onClick={() => {
                toggleWindow(app.id, true);
                setStartMenuOpen(false);
              }}
            >
              <span className="mr-2 text-2xl">{app.icon}</span>
              <span>{app.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
