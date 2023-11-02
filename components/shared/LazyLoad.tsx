"use client"

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  fallback: ReactNode;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ children, fallback }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [ref]);

  return (
    <div ref={ref} className="min-h-[20px]">
      {isVisible ? children : fallback}
    </div>
  );
}

export default LazyLoad;