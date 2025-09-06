'use client';
import React from 'react';

const Cursor = () => {
  return (
    <div
      id="cursor"
      className="border-2 Cursor w-10 h-10 rounded-full border-[rgb(255,255,255,0.5)] fixed top-0 left-0 pointer-events-none z-50"
      style={{ transform: 'translate(-50%, -50%)' }}
    ></div>
  );
};

export default Cursor;
