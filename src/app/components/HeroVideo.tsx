"use client";

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Replace src with your 10s loop video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.07]"
        // src="/hero-bg.mp4"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/80 to-bg" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
