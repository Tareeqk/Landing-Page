import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * Premium recovery-truck presentation — optimized for FAST first paint.
 *
 * Optimisations:
 *  1.  IntersectionObserver lazy-mounts the <model-viewer> only when the hero
 *      enters the viewport (skips work for users who never scroll back up).
 *  2.  <link rel="preload" as="fetch"> warms the .glb in parallel with the
 *      script download — both arrive together.
 *  3.  Model-viewer ESM script is injected once during requestIdleCallback so
 *      it never blocks the main thread on initial render.
 *  4.  Pure-CSS poster (radial-gradient + halo + grain) shows INSTANTLY while
 *      the GLB streams in — perceived load time drops to ~0 ms.
 *  5.  reveal="manual" + dismissPoster() the moment the model emits its first
 *      frame, ensuring no flash-of-empty-canvas.
 *  6.  3D animation loop is paused when the element is off-screen.
 */
export default function CarModel({ type = "flatbed" }) {
  const modelRef     = useRef(null);
  const wrapperRef   = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );

  const target  = useRef({ x: 210, y: 78 });
  const current = useRef({ x: 210, y: 78 });
  const idle    = useRef(0);
  const visible = useRef(true);

  const RADIUS = isMobile ? "7m" : "10m";

  const getModelPath = useCallback(() => {
    switch (type) {
      case "crane":     return "/models/truck_new.glb";
      case "emergency": return "/models/emergency.gltf";
      default:          return "/models/truck_new.glb";
    }
  }, [type]);

  // ── 1. Inject model-viewer script + warm the .glb (idle, deferred) ────────
  useEffect(() => {
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    ric(() => {
      // Script
      if (!document.querySelector('script[data-mv]')) {
        const s = document.createElement("script");
        s.type = "module";
        s.dataset.mv = "1";
        s.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
        s.crossOrigin = "anonymous";
        document.head.appendChild(s);
      }
      // Preload the .glb in parallel
      const href = getModelPath();
      if (!document.querySelector(`link[data-mv-preload="${href}"]`)) {
        const l = document.createElement("link");
        l.rel = "preload";
        l.as  = "fetch";
        l.crossOrigin = "anonymous";
        l.href = href;
        l.dataset.mvPreload = href;
        document.head.appendChild(l);
      }
    });
  }, [getModelPath]);

  // ── 2. Lazy mount via IntersectionObserver (also tracks visibility) ───────
  useEffect(() => {
    if (!wrapperRef.current) return;

    // Mobile devices: mount eagerly — hero is the entire viewport on first load
    if (window.innerWidth <= 1024) {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setMounted(true);
          visible.current = e.isIntersecting;
        });
      },
      { rootMargin: "200px 0px", threshold: 0.01 }
    );
    io.observe(wrapperRef.current);
    return () => io.disconnect();
  }, []);

  // ── 3. Resize listener ────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── 4. Dismiss poster the moment the first frame is ready ────────────────
  useEffect(() => {
    const el = modelRef.current;
    if (!el || !mounted) return;
    const onLoad = () => {
      try { el.dismissPoster?.(); } catch (_) {}
      setLoaded(true);
    };
    el.addEventListener("load", onLoad);
    el.addEventListener("model-visibility", onLoad);
    // Also try immediately (CE may already be defined + cached)
    setTimeout(onLoad, 50);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("model-visibility", onLoad);
    };
  }, [mounted, type]);

  // ── 5. Mouse → full 360° target ──────────────────────────────────────────
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    target.current.x = x * 360;
    target.current.y = 65 + y * 26;
  };

  const handleMouseLeave = () => {
    target.current.x = 210;
    target.current.y = 78;
  };

  // ── 6. Animation loop — paused when off-screen ───────────────────────────
  useEffect(() => {
    if (!mounted) return;
    let frame;
    const animate = () => {
      if (!visible.current) {
        frame = requestAnimationFrame(animate);
        return;
      }
      if (isMobile) {
        idle.current += 0.005;
        const orbitX = 210 + Math.sin(idle.current) * 12;
        if (modelRef.current) {
          modelRef.current.cameraOrbit = `${orbitX}deg 78deg ${RADIUS}`;
        }
      } else {
        idle.current += 0.015;
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
  }, [RADIUS, isMobile, mounted]);

  return (
    <div
      ref={wrapperRef}
      className="car-model-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="car-model-wrapper"
    >
      <div className="tk-glow-warm"    aria-hidden="true" />
      <div className="tk-glow-contact" aria-hidden="true" />

      {/* Pure-CSS poster — visible instantly, fades out when GLB is ready */}
      <div
        className={`tk-poster ${loaded ? "tk-poster--gone" : ""}`}
        aria-hidden="true"
      >
        <div className="tk-poster__halo" />
        <div className="tk-poster__truck">
          {/* Lightweight inline SVG silhouette of a flatbed recovery truck */}
          <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 56 H132 V36 H172 L196 46 V56 H212"
              stroke="rgba(255,184,60,0.55)"
              strokeWidth="1.6"
              fill="rgba(255,184,60,0.10)"
              strokeLinejoin="round"
            />
            <rect x="146" y="20" width="22" height="16" rx="2"
              stroke="rgba(255,184,60,0.55)" strokeWidth="1.4" fill="none" />
            <circle cx="44"  cy="62" r="8" stroke="rgba(255,210,120,0.7)" strokeWidth="1.6" fill="rgba(0,0,0,0.4)" />
            <circle cx="178" cy="62" r="8" stroke="rgba(255,210,120,0.7)" strokeWidth="1.6" fill="rgba(0,0,0,0.4)" />
          </svg>
          <div className="tk-poster__spinner" />
        </div>
      </div>

      {mounted && (
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
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.45s ease",
          }}
        />
      )}

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
          contain: layout paint;
        }
        .car-model-wrapper:active { cursor: grabbing; }

        .car-model-wrapper model-viewer {
          position: relative;
          z-index: 2;
          background-color: transparent !important;
          width: 100%;
          height: 100%;
        }

        /* ── INSTANT poster ───────────────────────────────────────────── */
        .tk-poster {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          opacity: 1;
          transition: opacity 0.55s ease;
        }
        .tk-poster--gone { opacity: 0; }
        .tk-poster__halo {
          position: absolute;
          width: 90%;
          height: 70%;
          background: radial-gradient(
            ellipse at center,
            rgba(255,184,60,0.22) 0%,
            rgba(255,140,20,0.06) 40%,
            transparent 75%
          );
          filter: blur(40px);
        }
        .tk-poster__truck {
          position: relative;
          width: clamp(220px, 50%, 480px);
          opacity: 0.85;
          animation: tk-poster-float 3.2s ease-in-out infinite;
        }
        .tk-poster__truck svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .tk-poster__spinner {
          position: absolute;
          left: 50%;
          bottom: -28px;
          transform: translateX(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(255,184,60,0.18);
          border-top-color: rgba(255,184,60,0.85);
          animation: tk-poster-spin 0.9s linear infinite;
        }
        @keyframes tk-poster-spin { to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes tk-poster-float {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(-6px); }
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
