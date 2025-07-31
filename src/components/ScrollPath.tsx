import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollPath = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Set initial state
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate path drawing on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="scroll-path">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 3000"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(280 100% 70%)" />
            <stop offset="50%" stopColor="hsl(320 100% 65%)" />
            <stop offset="100%" stopColor="hsl(200 100% 60%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          ref={pathRef}
          d="M 600 100 
             Q 200 300 400 600
             Q 800 800 500 1200
             Q 100 1400 600 1600
             Q 1000 1800 400 2200
             Q 200 2400 600 2600
             Q 900 2800 600 2900"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow)"
          className="path-line"
        />
        
        {/* Decorative dots along the path */}
        <circle cx="600" cy="100" r="8" fill="hsl(280 100% 70%)" className="floating-element" />
        <circle cx="400" cy="600" r="6" fill="hsl(320 100% 65%)" className="floating-element" style={{animationDelay: '1s'}} />
        <circle cx="500" cy="1200" r="8" fill="hsl(200 100% 60%)" className="floating-element" style={{animationDelay: '2s'}} />
        <circle cx="600" cy="1600" r="6" fill="hsl(280 100% 70%)" className="floating-element" style={{animationDelay: '3s'}} />
        <circle cx="400" cy="2200" r="8" fill="hsl(320 100% 65%)" className="floating-element" style={{animationDelay: '4s'}} />
        <circle cx="600" cy="2600" r="6" fill="hsl(200 100% 60%)" className="floating-element" style={{animationDelay: '5s'}} />
      </svg>
    </div>
  );
};

export default ScrollPath;