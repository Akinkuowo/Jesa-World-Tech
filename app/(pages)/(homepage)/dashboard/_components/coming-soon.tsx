import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-electric-blue-600">
      <div className="relative w-64 h-12 rounded-full bg-black overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-electric-blue-700" style={{ width: '50%' }}></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <span className="text-white font-bold text-lg">COMING SOON</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
