"use client"
import classNames from "classnames";
import styles from "./Header.module.css"
import {Container} from "@/shared/Container/Container";
import WhiteLogo from "@/public/WhiteLogo.svg"
import {NavLink} from "@/shared/Link/NavLink";
import dynamic from "next/dynamic";
import {Switch} from "@mui/material";
const ThemeChanger = dynamic(() => import("@/entities/ThemeSwitcher/ThemeSwitcher"),
    {
        ssr: false,
        loading: () => <Switch checked={false}  />
    })

export const Header = () => {

    return (
        <header >
            <Container >
                <div className={classNames(styles.header)} >
                    <WhiteLogo/>
                    <nav className={classNames(styles.nav)}>
                        <NavLink path="/">Projects</NavLink>
                        <NavLink path="/">News</NavLink>
                        <NavLink path="/">Newspaper</NavLink>
                        <NavLink path="/">Feed</NavLink>
                        <ThemeChanger/>
                    </nav>
                </div>
                <hr/>
            </Container>
        </header>


    )
}