// Shared app-store targets for every "Download App" button. App Store on iOS,
// Google Play everywhere else. Buttons must be real <a href> links (not
// window.location handlers) so utils/adsTracking.js's delegated listener
// classifies the click as app_download_click.
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.tareeqk.order"
export const IOS_URL = "https://apps.apple.com/in/app/tareeqk-roadside-assistances/id6480442854"

export function pickStoreOnClick(e) {
  const ua = navigator.userAgent || ""
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) e.currentTarget.href = IOS_URL
}

// Spread onto an <a>: <a {...storeLinkProps}>…</a>
export const storeLinkProps = {
  href: PLAY_URL,
  onClick: pickStoreOnClick,
  target: "_blank",
  rel: "noopener noreferrer",
}

// Phones/tablets go straight to the right store; desktop visitors can't
// install anything, so they get the /download page instead (see
// hooks/useDownloadLink.js).
export function isMobileDevice() {
  if (typeof navigator === "undefined") return false
  const ua = navigator.userAgent || ""
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return true
  // iPadOS 13+ reports itself as a Mac but has a touch screen.
  return /Mac/i.test(navigator.platform || "") && navigator.maxTouchPoints > 1
}

export function storeUrlForDevice() {
  const ua = navigator.userAgent || ""
  const isApple = /iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(navigator.platform || "") && navigator.maxTouchPoints > 1)
  return isApple ? IOS_URL : PLAY_URL
}
