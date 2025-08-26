"use client";
import React from "react";

export interface FloatingCardProps {
  data: {
    year: string;
    title: string;
    company: string;
    description: string;
    color: string;
  };
  isVisible: boolean;
}

export default function FloatingCard({ data, isVisible }: FloatingCardProps) {
  if (!data) return null;

  return (
    <div
      // MODIFIED: Changed positioning from top-1/2 to bottom-10 for better mobile UX.
      className={`md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-999 w-full max-w-sm px-4 pointer-events-none transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div
        className="backdrop-blur-sm rounded-xl shadow-lg p-4 transition-colors duration-500"
        style={{ backgroundColor: data.color }}
      >
        <div className="flex items-center justify-between">
          <div className="bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded-full">
            {data.year}
          </div>
          <div className="text-sm font-medium text-gray-800 truncate ml-2">
            {data.company}
          </div>
        </div>
        <h3 className="text-sm font-bold text-gray-800 mt-1 truncate">
          {data.title}
        </h3>
        <p className="text-xs text-gray-700 mt-2 line-clamp-3">
          {data.description}
        </p>
      </div>
    </div>
  );
}
