"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaTelegramPlane, FaTwitter, FaChartBar } from "react-icons/fa";

import MemeEditor from "./components/MemeEditor";
import SnakeGame from "./components/SnakeGame";
import Memories from "./components/Memories";
import ShinchanSnackCatcher from "./components/ShinchanSnackCatcher";
import ShinchanColoringPage from "./components/ShinchanColoringPage";

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
      name: "My Diary",
      iconSrc: "/icons/diary.png",
      content: (
        <div className="space-y-4 p-4 h-full overflow-auto">
          <div className="bg-yellow-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Shinchan Diary</h3>
            <div className="flex justify-center">
              <Image
                src="/diary/diary-1.png"
                alt="Meeting notes"
                width={300}
                height={200}
                className="mt-2 rounded-md"
              />
            </div>
          </div>
          {/* <div className="bg-blue-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Shopping List</h3>
            <ul className="list-disc list-inside">
              <li>Milk</li>
              <li>Eggs</li>
              <li>Bread</li>
            </ul>
            <div className="flex justify-center">
              <Image
                src="/diary/diary-2.png"
                alt="Shopping list"
                width={300}
                height={200}
                className="mt-2 rounded-md"
              />
            </div>
          </div>
          <div className="bg-green-100 p-3 rounded-md shadow">
            <h3 className="font-semibold">Ideas</h3>
            <p>New app concept: AI-powered personal assistant</p>
            <div className="flex justify-center">
              <Image
                src="/diary/diary-3.png"
                alt="App idea sketch"
                width={300}
                height={200}
                className="mt-2 rounded-md"
              />
            </div>
          </div> */}
        </div>
      ),
    },
    {
      id: 2,
      name: "Family",
      iconSrc: "/icons/family.png",
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
      id: 3,
      name: "Mini Game",
      iconSrc: "/icons/mini_game.png",
      content: (
        <div className="space-y-2 p-4 h-full overflow-auto">
          <ShinchanSnackCatcher />
        </div>
      ),
    },
    {
      id: 4,
      name: "Memories",
      iconSrc: "/icons/memories.png",
      content: (
        <div className="gap-4 p-4">
          <Memories />
        </div>
      ),
    },
    {
      id: 5,
      name: "Home",
      iconSrc: "/icons/home.png",
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
      id: 6,
      name: "Coloring Page",
      iconSrc: "/icons/coloring.png",
      content: (
        <div className="space-y-4 p-4">
          <ShinchanColoringPage />
        </div>
      ),
    },
    {
      id: 7,
      name: "Meme Editor",
      iconSrc: "/icons/meme.png",
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
        backgroundImage: "url('/assets/main-bg.gif')",
      }}
      onMouseUp={() => apps.forEach((app) => onMouseUp(app.id))}
    >
      <div className="absolute inset-0 p-4 grid grid-cols-10 grid-rows-6 gap-1">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center justify-center"
            style={{
              gridColumn: app.id % 3 === 1 ? 1 : app.id % 3 === 2 ? 2 : 3, // Wrap around every three items
              gridRow: app.id <= 3 ? 1 : app.id <= 6 ? 2 : 3, // Row control: 1 for IDs 1-3, 2 for IDs 4-6, 3 for ID 7
            }}
          >
            <button
              onClick={() => toggleWindow(app.id, true)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <Image
                src={app.iconSrc}
                alt={`${app.name} icon`}
                width={50}
                height={50}
                className="w-10 h-10 object-contain"
              />
            </button>
            <span className="text-gray-800 font-bold text-sm mt-1 shadow-sm">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {Object.entries(activeWindows).map(
        ([id, isOpen]) =>
          isOpen && (
            <div
              key={id}
              className="absolute bg-white shadow-lg overflow-hidden border border-gray-300 rounded-lg"
              style={{
                left: `${posRefs.current[id].x}px`,
                top: `${posRefs.current[id].y}px`,
                zIndex: posRefs.current[id].zIndex,
                width: "500px",
                height: "550px",
              }}
            >
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-700 p-1 cursor-move flex items-center justify-between"
                onMouseDown={(e) => onMouseDown(id, e)}
                onMouseMove={(e) => onMouseMove(id, e)}
              >
                <div className="flex items-center">
                  <span className="mr-2 text-xl text-white">
                    {apps.find((app) => app.id === parseInt(id)).icon}
                  </span>
                  <span className="font-semibold text-white text-sm">
                    {apps.find((app) => app.id === parseInt(id)).name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-white hover:bg-blue-500 rounded-sm p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="text-white hover:bg-blue-500 rounded-sm p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v8h10V6H5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleWindow(id, false)}
                    className="text-white hover:bg-red-500 rounded-sm p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[calc(100%-32px)] overflow-auto">
                {apps.find((app) => app.id === parseInt(id)).content}
              </div>
            </div>
          )
      )}

      <div className="absolute bottom-0 left-0 w-full bg-gray-700 text-white p-2 flex items-center space-x-4">
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
                className="text-white font-semibold hover:bg-white/20 p-1 rounded flex items-center"
              >
                <Image
                  src={app.iconSrc}
                  alt={`${app.name} icon`}
                  width={10}
                  height={10}
                  className="w-5 h-5 object-contain"
                />
                {/* <span>{app.name}</span> */}
              </button>
            )
        )}
        <div className="flex-grow space-x-8" />
        <span className="cursor-pointer">
          <FaTelegramPlane size={32} />
        </span>
        <span className="cursor-pointer">
          <FaTwitter size={32} />
        </span>
        <span className="cursor-pointer">
          <FaChartBar size={32} />
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
