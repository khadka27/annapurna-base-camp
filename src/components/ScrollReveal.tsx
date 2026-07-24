"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-left" | "fade-right" | "zoom-in";
  delayMs?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  delayMs = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  const variantClass =
    variant === "fade-left"
      ? "reveal-fade-left"
      : variant === "fade-right"
      ? "reveal-fade-right"
      : variant === "zoom-in"
      ? "reveal-zoom-in"
      : "reveal-fade-up";

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal-hidden ${variantClass} ${
        isVisible ? "reveal-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
