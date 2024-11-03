import React, { useState } from "react";
import Image from "next/image";

const Memories = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = [
    { src: "/memories/1.png", alt: "Photo 1" },
    { src: "/memories/2.png", alt: "Photo 2" },
    { src: "/memories/3.png", alt: "Photo 3" },
    { src: "/memories/4.png", alt: "Photo 4" },
  ];

  const goNext = () => {
    setCurrentPhotoIndex((current) => (current + 1) % photos.length);
  };

  const goPrevious = () => {
    setCurrentPhotoIndex(
      (current) => (current - 1 + photos.length) % photos.length
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg">
      <div className="relative w-full max-w-3xl">
        <Image
          src={photos[currentPhotoIndex].src}
          alt={photos[currentPhotoIndex].alt}
          width={800} // Set the desired width
          height={600} // Set the desired height
          className="rounded-md"
          layout="responsive" // This ensures the image scales correctly within the container
        />
      </div>
      <div className="flex mt-4">
        <button
          onClick={goPrevious}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded shadow hover:shadow-md transition-all duration-300 mr-2"
        >
          &lt; Previous
        </button>
        <button
          onClick={goNext}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded shadow hover:shadow-md transition-all duration-300"
        >
          Next &gt;
        </button>
      </div>

        {/* <div className="mt-2 text-sm text-gray-600">
            Use the buttons to navigate through memories.
        </div> */}
    </div>
  );
};

export default Memories;
