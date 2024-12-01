import {NavLink} from "@/shared/Link/NavLink";
import {Container} from "@/shared/Container/Container";
import styles from "./Footer.module.css"

export const Footer = () => {
    return (
        <footer className={styles.foooter} >
            <Container className={styles.footer} >
                <hr/>
                <div className={styles.nav} >
                    <span className={styles.span}>© 2024</span>
                    <NavLink path="/">Email</NavLink>
                    <NavLink path="/">VK</NavLink>
                    <NavLink path="/">Instagram</NavLink>
                </div>
            </Container>
        </footer>
    )
}