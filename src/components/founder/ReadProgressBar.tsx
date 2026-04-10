"use client";

import { useEffect, useState } from "react";

export default function ReadProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / Math.max(docH, 1)) * 100);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ width: `${width}%` }}
      className="fixed top-0 left-0 h-[3px] z-[60] transition-[width_.15s_linear]"
      // inline style so it animates smoothly via direct DOM write
    >
      <div className="h-full w-full bg-gradient-to-r from-[color:var(--gold)] to-[color:var(--gold-dark)]" />
    </div>
  );
}