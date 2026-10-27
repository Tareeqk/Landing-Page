// hooks/useDownloadLink.js
//
// One rule for every "Download App" button on the site:
//   - phone / tablet  -> open the right store (App Store on Apple, Play else)
//   - desktop         -> go to the /download page (both apps, all stores)
//
// Use `linkProps` on a react-router <Link>, or `go` as a <button> onClick.
// The store redirect is a real link click, so it is tracked like any store link.
import { useNavigate } from "react-router-dom"
import useLangLink from "./useLangLink"
import { isMobileDevice, storeUrlForDevice } from "../utils/appStore"

export default function useDownloadLink() {
  const langLink = useLangLink()
  const navigate = useNavigate()
  const to = langLink("/download")

  // Click a real <a href="store-url"> instead of setting window.location, so
  // anything watching for outbound/app-store link clicks (Google's tag, the
  // delegated listener in utils/adsTracking.js) sees an actual link click and
  // records app_download_click itself -- no separate tracking call here.
  const openStore = () => {
    const a = document.createElement("a")
    a.href = storeUrlForDevice()
    a.rel = "noopener noreferrer"
    a.style.display = "none"
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const go = () => {
    if (isMobileDevice()) openStore()
    else navigate(to)
  }

  const onClick = (e) => {
    if (isMobileDevice()) {
      e.preventDefault()
      openStore()
    }
  }

  return { to, go, onClick, linkProps: { to, onClick, viewTransition: true } }
}
