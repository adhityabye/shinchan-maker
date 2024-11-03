import React, { useEffect, useState } from "react";

export default function BootTransition() {
  const [bootText, setBootText] = useState("");

  useEffect(() => {
    const text =
      "Booting Shinchan's PC...\nInitializing crayon drives...\nLoading snack database...\nPreparing action masks...\nReady!";
    let index = 0;

    const interval = setInterval(() => {
      setBootText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <pre className="text-green-500 font-mono text-xl whitespace-pre-wrap">
        {bootText}
      </pre>
    </div>
  );
}
