"use client";

import { useEffect } from "react";

export default function SplineEmbed() {
  useEffect(() => {
    // Dynamically load the Spline script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.10.45/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden shadow-lg border">
      <spline-viewer url="https://prod.spline.design/ByqpAhO3QJsm1DRn/scene.splinecode"></spline-viewer>
    </div>
  );
}
