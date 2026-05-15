import React, { useRef, useEffect, useState } from "react";

/**
 * Premium, cinematic presentation of the recovery truck.
 * Fixes:
 *  1. Faster model load — reveal="manual" + dismissPoster() immediately,
 *     model-viewer script injected once after mount.
 *  2. Full 360° rotation on mouse movement across the hero area.
 */
export default function CarModel({ type = "flatbed" }) {
  const modelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );

  const target  = useRef({ x: 210, y: 78 });
  const current = useRef({ x: 210, y: 78 });
  const idle    = useRef(0);

  const RADIUS = isMobile ? "7m" : "10m";

  // ── 1. Inject <model-viewer> script once ────────────────────────────────
  useEffect(() => {
    if (!document.querySelector('script[data-mv]')) {
      const s = document.createElement("script");
      s.type    = "module";
      s.dataset.mv = "1";
      s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
      document.head.appendChild(s);
    }
  }, []);

  // ── 2. Dismiss poster as soon as the element is ready ───────────────────
  useEffect(() => {
    const el = modelRef.current;
    if (!el) return;
    const dismiss = () => {
      try { el.dismissPoster?.(); } catch (_) {}
    };
    // Fire immediately — model-viewer may already be defined
    dismiss();
    el.addEventListener("load", dismiss);
    return () => el.removeEventListener("load", dismiss);
  }, [type]);

  // ── 3. Resize listener ───────────────────────────────────────────────────
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

  // ── 4. Mouse → full 360° target ─────────────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width;   // 0 → 1
    const y    = (e.clientY - rect.top)  / rect.height;

    // Map x across the full orbit: 0 deg (left edge) → 360 deg (right edge)
    target.current.x = x * 360;
    target.current.y = 65 + y * 26;                       // vertical tilt 65–91°
  };

  const handleMouseLeave = () => {
    target.current.x = 210;
    target.current.y = 78;
  };

  // ── 5. Animation loop ────────────────────────────────────────────────────
  useEffect(() => {
    let frame;
    const animate = () => {
      if (isMobile) {
        idle.current += 0.005;
        const orbitX = 210 + Math.sin(idle.current) * 12;
        if (modelRef.current) {
          modelRef.current.cameraOrbit = `${orbitX}deg 78deg ${RADIUS}`;
        }
      } else {
        idle.current += 0.015;

        // Smooth lerp — slightly faster (0.07) for snappier feel
        current.current.x += (target.current.x - current.current.x) * 0.07;
        current.current.y += (target.current.y - current.current.y) * 0.07;

        const isIdle =
          Math.abs(target.current.x - 210) < 1 &&
          Math.abs(target.current.y - 78)  < 1;

        const finalX = isIdle
          ? 210 + Math.sin(idle.current) * 20
          : current.current.x;

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

      {/*
        Key load-speed attributes:
          reveal="manual"       — skip built-in poster delay; we dismiss it immediately
          loading="eager"       — don't wait for intersection observer
          ar={false}            — skip AR capability check on load
      */}
      <model-viewer
        key={type}
        ref={modelRef}
        src={getModelPath()}
        alt="Tareeqk Recovery Truck"
        camera-controls={false}
        interaction-prompt="none"
        disable-zoom
        reveal="manual"
        loading="eager"
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
          overflow: hidden;
          cursor: grab;
        }
        .car-model-wrapper:active { cursor: grabbing; }

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
          .car-model-wrapper { overflow: hidden; cursor: default; }
          .tk-glow-warm    { bottom: 0%;  width: 100%; filter: blur(30px); }
          .tk-glow-contact { bottom: 5%;  width: 80%; }
        }
      `}</style>
    </div>
  );
}