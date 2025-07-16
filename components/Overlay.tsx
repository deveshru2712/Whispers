"use client";
import { useTheme } from "next-themes";

const Overlay = () => {
  const { theme } = useTheme();

  const gradientColor =
    theme === "dark" ? "rgba(120, 180, 255, 0.25)" : "rgba(80, 140, 220, 0.15)";

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 0%, 
              ${gradientColor}, 
              transparent 70%
            )
          `,
        }}
      />
    </div>
  );
};

export default Overlay;
