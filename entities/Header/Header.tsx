"use client"
import classNames from "classnames";
import styles from "./Header.module.css"
import {Container} from "@/shared/Container/Container";
import WhiteLogo from "@/public/WhiteLogo.svg"
import {NavLink} from "@/shared/Link/NavLink";
import {useSession, signIn, signOut} from "next-auth/react";
import Githab from "@/public/github.svg"
import Image from "next/image";
import ThemeChanger from "@/entities/ThemeSwitcher/ThemeSwitcher";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel} from "@mui/material";


export const Header = () => {
    const { data:session } = useSession()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSend = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        await signOut({
            callbackUrl: "/",
            redirect: true
        })
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };


    return (
        <header >
            <Container >
                <div className={classNames(styles.header)} >
                    <WhiteLogo/>
                    <nav className={classNames(styles.nav)}>
                        <NavLink path="/">Posts</NavLink>
                        {session
                            ?
                            <>
                                <button onClick={handleClickOpen} className={styles.buttonUserAvatar}>
                                    <Image className={styles.useravatar} width={40} height={40}
                                           src={session.user?.image || ""} alt={"Фото вашего профиля"}/>
                                </button>
                                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                        <DialogTitle>Вы уверены, что хотите выйти из аккаунта?</DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Отменить</Button>
                                            <Button onClick={handleSend}>Да</Button>
                                        </DialogActions>
                                </Dialog>
                            </>

                            :
                            <button onClick={() => signIn("github", {
                                callbackUrl: "/",
                                redirect: true
                            })} className={styles.authbutton}>
                                <span>Войти</span>
                                <Githab/>
                            </button>}
                        <ThemeChanger/>
                    </nav>
                </div>
                <hr/>
            </Container>
        </header>


    )
}