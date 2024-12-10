import { useState, useEffect } from "react";
import "../styles/themeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.body.classList.add(initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(newTheme);
  };

  const handleClick = () => {
    toggleTheme();
    document.getElementById("switch").checked = !document.getElementById("switch").checked;
  };

  return (
    <span className="switch" onClick={handleClick}>
      <input id="switch" className="switch__input" name="switch" type="checkbox" checked={theme === "dark"} readOnly />
      <label className="switch__label" htmlFor="switch"></label>
    </span>
  );
};

export default ThemeToggle;
