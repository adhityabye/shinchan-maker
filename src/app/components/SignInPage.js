import React from "react";
import Image from "next/image";

export default function SignInPage({ onSignIn }) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Image
        src="/assets/sign-in.png"
        alt="Sign In Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={onSignIn}
          className="bg-[#6574B5] hover:bg-[#7a8ee6] text-gray-900 font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105 relative top-[80px] left-[120px]"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
