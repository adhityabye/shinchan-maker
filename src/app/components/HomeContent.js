"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/home/home-1.png", alt: "Home image 1" },
  { src: "/home/home-2.png", alt: "Home image 2" },
  { src: "/home/home-3.png", alt: "Home image 3" },
  { src: "/home/home-4.png", alt: "Home image 4" },
  { src: "/home/home-5.png", alt: "Home image 5" },
];

const HomePhotoViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="space-y-4 p-4 h-full overflow-hidden bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome Home</h2>
      <div className="relative h-[calc(100%-4rem)] w-full overflow-hidden rounded-lg shadow-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 transform scale-100"
                : "opacity-0 transform scale-110"
            }`}
            style={{
              zIndex: index === currentIndex ? 10 : 0,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <p className="text-white text-lg font-semibold">
            {images[currentIndex].alt}
          </p>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 z-20"
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
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 z-20"
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
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
              index === currentIndex
                ? "bg-blue-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <div className="space-y-4 p-4 h-full overflow-auto">
      <HomePhotoViewer />
    </div>
  );
};

export default HomeContent;
