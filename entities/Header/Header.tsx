import classNames from "classnames";
import styles from "./Header.module.css"
import {Container} from "@/shared/Container/Container";
import WhiteLogo from "@/public/WhiteLogo.svg"
import {NavLink} from "@/shared/Link/NavLink";


export const Header = () => {
    return (
        <Container>
            <header className={classNames(styles.header)} >
                <WhiteLogo />
                <nav className={classNames(styles.nav)} >
                    <NavLink path="/">Projects</NavLink>
                    <NavLink path="/">News</NavLink>
                    <NavLink path="/">Newspaper</NavLink>
                    <NavLink path="/">Feed</NavLink>
                </nav>
            </header>
            <hr/>
        </Container>
    )
}