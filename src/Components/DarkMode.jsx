import React from "react"
import "./DarkMode.css"

const DarkMode = ({ isDark, setIsDark }) => {
  return (
    <div className="dm-wrapper">
      <label className="switch">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
        <span className="slider" />
      </label>
    </div>
  )
}

export default DarkMode
