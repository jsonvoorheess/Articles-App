"use client"
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import {ThemeProvider} from "next-themes";
import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

export const Providers = ({ children }: { children: ReactNode }) => {
    const providers = [
        { id: 'github', name: 'GitHub' },
    ];
    return (
        <AppRouterCacheProvider>
            <ThemeProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}