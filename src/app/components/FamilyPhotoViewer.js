"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/family/family-01.png", alt: "Family photo 1" },
  { src: "/family/family-02.png", alt: "Family photo 2" },
];

const FamilyPhotoViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        paginate(-1);
      } else if (event.key === "ArrowRight") {
        paginate(1);
      } else if (event.key === "Escape") {
        setIsFullscreen(false);
        setScale(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const paginate = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex >= images.length) newIndex = 0;
      if (newIndex < 0) newIndex = images.length - 1;
      return newIndex;
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setScale(1);
  };

  const handleZoom = (zoomIn) => {
    setScale((prevScale) => {
      const newScale = zoomIn ? prevScale + 0.1 : prevScale - 0.1;
      return Math.max(0.5, Math.min(newScale, 3));
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-8 rounded-lg shadow-inner">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Family Photos</h2>
      <div
        className={`relative ${
          isFullscreen
            ? "fixed inset-0 z-50 bg-black"
            : "w-full max-w-2xl aspect-[4/3]"
        } bg-white rounded-lg shadow-lg overflow-hidden`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        {!isFullscreen && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => paginate(-1)}
              aria-label="Previous photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => paginate(1)}
              aria-label="Next photo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <button
          className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isFullscreen
                  ? "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  : "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              }
            />
          </svg>
        </button>
        {isFullscreen && (
          <div className="absolute bottom-4 right-4 space-x-2">
            <button
              className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => handleZoom(true)}
              aria-label="Zoom in"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
            <button
              className="bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              onClick={() => handleZoom(false)}
              aria-label="Zoom out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      {!isFullscreen && (
        <div className="mt-6 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 300);
              }}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
      <p className="mt-4 text-gray-600 text-center">
        Cherishing moments with loved ones. Use arrow keys to navigate, click
        the expand icon to view full image.
      </p>
    </div>
  );
};

export default FamilyPhotoViewer;
