import React, { useRef, useEffect, useState } from "react";

/**
 * Premium, cinematic presentation of the recovery truck.
 * Optimized for larger scale and smoother interactive tracking.
 */
export default function CarModel({ type = "flatbed" }) {
  const modelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const target = useRef({ x: 210, y: 78 });
  const current = useRef({ x: 210, y: 78 });
  const idle = useRef(0);

  // Pull camera further back on mobile so the full truck fits in frame
  const RADIUS = isMobile ? "7m" : "10m";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getModelPath = () => {
    switch (type) {
      case "crane":     return "/models/truck_new.glb";
      case "emergency": return "/models/emergency.gltf";
      default:          return "/models/truck_new.glb";
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    target.current.x = 170 + (x - 0.5) * 80;
    target.current.y = 70  + y * 20;
  };

  const handleMouseLeave = () => {
    target.current.x = 210;
    target.current.y = 78;
  };

  useEffect(() => {
    let frame;
    const animate = () => {
      if (isMobile) {
        // Slow gentle oscillation ±12deg around 210 — truck always centred
        idle.current += 0.005;
        const orbitX = 210 + Math.sin(idle.current) * 12;
        if (modelRef.current) {
          modelRef.current.cameraOrbit = `${orbitX}deg 78deg ${RADIUS}`;
        }
      } else {
        // Desktop: full idle drift + mouse tracking
        idle.current += 0.015;
        current.current.x += (target.current.x - current.current.x) * 0.05;
        current.current.y += (target.current.y - current.current.y) * 0.05;

        const isIdle =
          Math.abs(target.current.x - 210) < 1 &&
          Math.abs(target.current.y - 78)  < 1;

        const finalX = isIdle ? (210 + Math.sin(idle.current) * 20) : current.current.x;

        if (modelRef.current) {
          modelRef.current.cameraOrbit = `${finalX}deg ${current.current.y}deg ${RADIUS}`;
        }
      }

      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [RADIUS, isMobile]);

  return (
    <div
      className="car-model-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="car-model-wrapper"
    >
      <div className="tk-glow-warm"    aria-hidden="true" />
      <div className="tk-glow-contact" aria-hidden="true" />

      <model-viewer
        key={type}
        ref={modelRef}
        src={getModelPath()}
        alt="Tareeqk Recovery Truck"
        camera-controls={false}
        interaction-prompt="none"
        disable-zoom
        environment-image="neutral"
        exposure="1.25"
        shadow-intensity="1.6"
        shadow-softness="1"
        camera-orbit={`210deg 78deg ${RADIUS}`}
        min-camera-orbit="auto 50deg 6m"
        max-camera-orbit="auto 95deg 20m"
        field-of-view={isMobile ? "36deg" : "42deg"}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          "--poster-color": "transparent",
        }}
        fallback="new/NewNasir.webp"
      />

      <style>{`
  .car-model-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    /* clip the 3D canvas to its box — prevents landscape edge bleed */
    overflow: hidden;
  }

  .car-model-wrapper model-viewer {
    position: relative;
    z-index: 2;
    background-color: transparent !important;
    width: 100%;
    height: 100%;
  }

  .tk-glow-warm {
    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 800px;
    height: 160px;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 176, 42, 0.40) 0%,
      rgba(255, 140, 20, 0.15) 45%,
      transparent 85%
    );
    filter: blur(50px);
    z-index: 0;
    pointer-events: none;
  }

  .tk-glow-contact {
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translateX(-50%);
    width: 70%;
    height: 30px;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.6) 0%,
      transparent 85%
    );
    filter: blur(15px);
    z-index: 1;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .car-model-wrapper {
      overflow: hidden;
    }
    .tk-glow-warm    { bottom: 0%;  width: 100%; filter: blur(30px); }
    .tk-glow-contact { bottom: 5%;  width: 80%; }
  }
`}</style>
    </div>
  );
}