import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useLangLink from "../hooks/useLangLink";
import {
  getStoredConsent,
  saveConsent,
  OPEN_COOKIE_SETTINGS_EVENT,
} from "../utils/cookieConsent";

// "banner" = first-visit prompt (must choose). "preferences" = detail panel,
// reachable either from the banner's "Manage" button or later via the
// Footer's "Cookie Settings" link (see OPEN_COOKIE_SETTINGS_EVENT).
export default function CookieConsent() {
  const { t, i18n } = useTranslation();
  const langLink = useLangLink();
  const isRTL = i18n.dir() === "rtl";

  const [visible, setVisible] = useState(false);
  const [view, setView] = useState("banner");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setDecided(true);
      setAnalyticsEnabled(!!stored.analytics);
    } else {
      setVisible(true);
      setView("banner");
    }

    const openSettings = () => {
      const current = getStoredConsent();
      setAnalyticsEnabled(current ? !!current.analytics : true);
      setView("preferences");
      setVisible(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    const existing = document.getElementById("tk-cc-styles");
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = "tk-cc-styles";
    style.textContent = `
      .tk-cc-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        pointer-events: none;
      }
      .tk-cc-panel {
        pointer-events: auto;
        width: 100%;
        max-width: 720px;
        margin: 0 16px 16px;
        background: #0b0b0e;
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        padding: 20px 22px;
        animation: tk-cc-rise 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      @media (prefers-reduced-motion: reduce) {
        .tk-cc-panel { animation: none; }
      }
      @keyframes tk-cc-rise {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .tk-cc-title {
        font-size: 15px;
        font-weight: 800;
        color: #fff;
        margin: 0 0 6px;
      }
      .tk-cc-desc {
        font-size: 12.5px;
        line-height: 1.6;
        color: #9a9aa3;
        margin: 0 0 14px;
      }
      .tk-cc-link {
        color: #d4a017;
        text-decoration: underline;
        text-underline-offset: 2px;
      }
      .tk-cc-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .tk-cc-btn {
        appearance: none;
        font: inherit;
        border: 0;
        cursor: pointer;
        padding: 10px 18px;
        border-radius: 999px;
        font-size: 12.5px;
        font-weight: 700;
        transition: transform 0.15s ease, background 0.2s ease, color 0.2s ease;
      }
      .tk-cc-btn:active { transform: scale(0.97); }
      .tk-cc-btn--primary {
        background: #d4a017;
        color: #111114;
      }
      .tk-cc-btn--primary:hover { background: #e6b32a; }
      .tk-cc-btn--secondary {
        background: rgba(255,255,255,0.06);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.14);
      }
      .tk-cc-btn--secondary:hover { background: rgba(255,255,255,0.1); }
      .tk-cc-btn--ghost {
        background: transparent;
        color: #9a9aa3;
      }
      .tk-cc-btn--ghost:hover { color: #d0d0d6; }

      .tk-cc-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 12px 0;
        border-top: 1px solid rgba(255,255,255,0.08);
      }
      .tk-cc-row:first-of-type { border-top: none; }
      .tk-cc-row-title {
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        margin: 0 0 4px;
      }
      .tk-cc-row-desc {
        font-size: 11.5px;
        line-height: 1.55;
        color: #9a9aa3;
        margin: 0;
        max-width: 480px;
      }
      .tk-cc-switch {
        position: relative;
        flex-shrink: 0;
        width: 40px;
        height: 22px;
        border-radius: 999px;
        background: rgba(255,255,255,0.14);
        border: 0;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .tk-cc-switch--on { background: #d4a017; }
      .tk-cc-switch--disabled { cursor: not-allowed; opacity: 0.55; }
      .tk-cc-switch-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #fff;
        transition: transform 0.2s ease;
      }
      .tk-cc-switch--on .tk-cc-switch-thumb { transform: translateX(18px); }
      [dir="rtl"] .tk-cc-switch-thumb { left: auto; right: 2px; }
      [dir="rtl"] .tk-cc-switch--on .tk-cc-switch-thumb { transform: translateX(-18px); }

      @media (max-width: 560px) {
        .tk-cc-panel { padding: 18px; }
        .tk-cc-actions { flex-direction: column; }
        .tk-cc-btn { width: 100%; text-align: center; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("tk-cc-styles");
      if (el) el.remove();
    };
  }, []);

  if (!visible) return null;

  const finish = (prefs) => {
    saveConsent(prefs);
    setDecided(true);
    setVisible(false);
  };

  return (
    <div className="tk-cc-overlay" dir={isRTL ? "rtl" : "ltr"}>
      <div className="tk-cc-panel" role="dialog" aria-modal="true" aria-label={t("cookieConsent.title")}>
        {view === "banner" ? (
          <>
            <p className="tk-cc-title">{t("cookieConsent.title")}</p>
            <p className="tk-cc-desc">
              {t("cookieConsent.description")}{" "}
              <Link to={langLink("/privacy-policy")} className="tk-cc-link">
                {t("cookieConsent.privacyLink")}
              </Link>
            </p>
            <div className="tk-cc-actions">
              <button type="button" className="tk-cc-btn tk-cc-btn--primary" onClick={() => finish({ analytics: true })}>
                {t("cookieConsent.acceptAll")}
              </button>
              <button type="button" className="tk-cc-btn tk-cc-btn--secondary" onClick={() => finish({ analytics: false })}>
                {t("cookieConsent.necessaryOnly")}
              </button>
              <button type="button" className="tk-cc-btn tk-cc-btn--ghost" onClick={() => setView("preferences")}>
                {t("cookieConsent.managePreferences")}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="tk-cc-title">{t("cookieConsent.preferencesTitle")}</p>
            <p className="tk-cc-desc">{t("cookieConsent.preferencesDescription")}</p>

            <div className="tk-cc-row">
              <div>
                <p className="tk-cc-row-title">{t("cookieConsent.necessaryTitle")}</p>
                <p className="tk-cc-row-desc">{t("cookieConsent.necessaryDescription")}</p>
              </div>
              <button type="button" className="tk-cc-switch tk-cc-switch--on tk-cc-switch--disabled" disabled aria-label={t("cookieConsent.necessaryTitle")} aria-checked="true" role="switch">
                <span className="tk-cc-switch-thumb" />
              </button>
            </div>

            <div className="tk-cc-row">
              <div>
                <p className="tk-cc-row-title">{t("cookieConsent.analyticsTitle")}</p>
                <p className="tk-cc-row-desc">{t("cookieConsent.analyticsDescription")}</p>
              </div>
              <button
                type="button"
                className={`tk-cc-switch${analyticsEnabled ? " tk-cc-switch--on" : ""}`}
                onClick={() => setAnalyticsEnabled((v) => !v)}
                aria-label={t("cookieConsent.analyticsTitle")}
                aria-checked={analyticsEnabled}
                role="switch"
              >
                <span className="tk-cc-switch-thumb" />
              </button>
            </div>

            <div className="tk-cc-actions" style={{ marginTop: 14 }}>
              <button type="button" className="tk-cc-btn tk-cc-btn--primary" onClick={() => finish({ analytics: analyticsEnabled })}>
                {t("cookieConsent.savePreferences")}
              </button>
              {decided ? (
                <button type="button" className="tk-cc-btn tk-cc-btn--ghost" onClick={() => setVisible(false)}>
                  {t("cookieConsent.close")}
                </button>
              ) : (
                <button type="button" className="tk-cc-btn tk-cc-btn--ghost" onClick={() => setView("banner")}>
                  {t("cookieConsent.back")}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
