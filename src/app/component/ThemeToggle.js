'use client'

import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme) {
            // Use saved theme
            if (savedTheme === 'dark') {
                setDarkMode(true)
                document.documentElement.classList.add('dark')
            } else {
                setDarkMode(false)
                document.documentElement.classList.remove('dark')
            }
        } else {
            // Use system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setDarkMode(prefersDark)
            if (prefersDark) {
                document.documentElement.classList.add('dark')
            }
        }
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode
        setDarkMode(newDarkMode)

        if (newDarkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    if (!mounted) {
        return (
            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        )
    }

    return (
        <div></div>
    )
}