"use client";

import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prevProgress + Math.random() * 30;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-primary flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-2xl font-bold text-white animate-pulse">
            KA
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            <span className="text-accent">Kevin</span> Adiputra
          </h1>
          <p className="text-white/70">Loading amazing portfolio...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-white/50 text-sm mt-2">
            {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;