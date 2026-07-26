"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wind: number;
  opacity: number;
  swayFrequency: number;
  swayAmplitude: number;
}

export function SnowEffect() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Disable snow animation on all Admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 90 realistic snow particles
    const particleCount = 90;
    const particles: Snowflake[] = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.8 + 0.8,
      speed: Math.random() * 1.2 + 0.4,
      wind: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.75 + 0.25,
      swayFrequency: Math.random() * 0.02 + 0.005,
      swayAmplitude: Math.random() * 1.5 + 0.5,
    }));

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 1;

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(248, 250, 252, ${p.opacity})`;
        ctx.shadowBlur = p.radius > 2 ? 6 : 0;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();

        // Update positions with natural drifting physics
        p.y += p.speed;
        p.x += Math.sin(step * p.swayFrequency) * p.swayAmplitude + p.wind;

        // Wrap around when falling off bottom or sides
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) {
          p.x = -10;
        } else if (p.x < -10) {
          p.x = width + 10;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}
