"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  duration?: number;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration = 1200,
  ...props
}: NumberTickerProps) {
  const [displayed, setDisplayed] = useState(direction === "down" ? value : startValue);
  const frameRef = useRef<number>();
  const startRef = useRef<number>();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const timeout = setTimeout(() => {
          const from = direction === "down" ? value : startValue;
          const to = direction === "down" ? startValue : value;

          const animate = (timestamp: number) => {
            if (!startRef.current) startRef.current = timestamp;
            const elapsed = timestamp - startRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(from + (to - from) * eased);
            if (progress < 1) frameRef.current = requestAnimationFrame(animate);
          };
          frameRef.current = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => clearTimeout(timeout);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [value, startValue, direction, delay, duration]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(Number(displayed.toFixed(decimalPlaces)))}
    </span>
  );
}

export default NumberTicker;
