"use client"
import { useTheme } from 'next-themes'
import {Switch} from "@mui/material";

export default function ThemeChanger() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
       <Switch onChange={toggleTheme} checked={theme === "dark"} />
    )
}