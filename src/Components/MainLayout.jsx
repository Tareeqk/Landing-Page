// components/MainLayout.jsx
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"
import Nasir from "./Nasir"
import HreflangTags from "../Hreflangtags"

const MainLayout = ({ isDark, setIsDark }) => {
  return (
    <div className="pt-16 sm:pt-20">
      <HreflangTags />
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Nasir />
      <main>
        <Outlet />
      </main>
      <Footer isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}

export default MainLayout
