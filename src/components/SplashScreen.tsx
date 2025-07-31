import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500); // Brief delay before transitioning
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random incremental progress
      });
    }, 200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-fiji-green-600 via-fiji-green-700 to-fiji-green-800 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-fiji-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-fiji-yellow-300 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-32 w-20 h-20 bg-fiji-yellow-500 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-28 h-28 bg-fiji-yellow-300 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo and Brand */}
        <div className={`transition-all duration-1000 transform ${
          showLogo 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}>
          {/* Agricultural Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full shadow-2xl">
              <svg 
                className="w-12 h-12 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                <path d="M12 14V22"/>
                <path d="M8 18H16"/>
              </svg>
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 text-shadow">
            AgriLink
          </h1>
          <p className="text-fiji-yellow-300 text-lg md:text-xl font-medium mb-2">
            Fiji
          </p>
          <p className="text-white/80 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Connecting farmers, buyers, and suppliers across the beautiful islands of Fiji
          </p>
        </div>

        {/* Loading Progress */}
        <div className="mt-12 w-full max-w-xs mx-auto">
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-fiji-yellow-400 to-fiji-yellow-300 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-white/60 text-xs mt-3 font-medium">
            Loading your agricultural marketplace...
          </p>
        </div>

        {/* Version indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-white/40 text-xs">
            Version 1.0.0
          </p>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float bg-white/10 rounded-full"
            style={{
              width: Math.random() * 6 + 4 + 'px',
              height: Math.random() * 6 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 3 + 's',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
