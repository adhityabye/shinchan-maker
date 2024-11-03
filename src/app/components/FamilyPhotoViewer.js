"use client";

import React, { useState } from "react";
import Image from "next/image";

const images = [
  { src: "/family/family-01.png", alt: "Family photo 1" },
  { src: "/family/family-02.png", alt: "Family photo 2" },
];

const FamilyPhotoViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="space-y-4 p-4 h-full overflow-auto bg-gray-100 rounded-lg">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800">Family Album</h2>
        <div className="relative" style={{ height: "calc(100vh - 200px)" }}>
          <div className="h-full rounded-lg overflow-hidden">
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-500 ease-in-out"
            />
          </div>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
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
        <div className="mt-4 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                index === currentIndex
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Cherishing moments with loved ones.
          {/* Use the arrows or dots to navigate through the photos. */}
        </p>
      </div>
    </div>
  );
};

export default FamilyPhotoViewer;
