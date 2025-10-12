import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e) => {
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

 return (
  <>
    <div className="fixed pointer-events-none z-[9999]" style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)' }}>
      <div className={`bg-black rounded-full transition-all duration-200 ease-out ${isPointer ? 'w-7 h-7' : 'w-3 h-3'}`} />
    </div>
    <div className="fixed pointer-events-none z-[9999]" style={{ left: `${position.x}px`, top: `${position.y}px`, transform: 'translate(-50%, -50%)', transition: 'all 0.3s ease-out' }}>
      <div className="w-2.5 h-2.5 bg-black rounded-full opacity-20 transition-all duration-200 ease-out" />
    </div>
  </>
);
}