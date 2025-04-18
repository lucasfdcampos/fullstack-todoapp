"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      setTheme("light")
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
      aria-label={theme === "light" ? "Ativar modo escuro" : "Ativar modo claro"}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
