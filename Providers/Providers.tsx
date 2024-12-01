"use client"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import {ThemeProvider} from "next-themes";
import {ReactNode} from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}