import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    if (!isMounted) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  const getIcon = () => {
    if (theme === "light") return <FaSun className="hover:text-orange-500 transition-colors" />;
    else return <FaMoon className="hover:text-teal-500 transition-colors" />
  }

  return <button onClick={toggle} className="w-6 text-right">
    {(!isMounted || theme === "light")
      ? <FaSun className="hover:text-orange-500 transition-colors" />
      : <FaMoon className="hover:text-teal-500 transition-colors" />}
  </button>
};

export default ThemeSwitch;