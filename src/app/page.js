"use client";

import React, { useState } from "react";
import SignInPage from "./components/SignInPage";
import DesktopInterface from "./components/DesktopInterface";
import BootTransition from "./components/BootTransition";

export default function Page() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  const handleSignIn = () => {
    setIsBooting(true);
    setTimeout(() => {
      setIsSignedIn(true);
      setIsBooting(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {/* {!isSignedIn && !isBooting && <SignInPage onSignIn={handleSignIn} />}
      {isBooting && <BootTransition />}
      {isSignedIn && <DesktopInterface />} */}
      <DesktopInterface />
    </div>
  );
}
