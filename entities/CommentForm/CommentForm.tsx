"use client"
import React, {FormEvent, useEffect, useState} from 'react';
import {signIn, useSession} from "next-auth/react";
import styles from "./CommentForm.module.css"
import {H1} from "@/shared/H1/H1";
import Image from "next/image";
import {CircularProgress, Skeleton, Stack, TextField} from "@mui/material";
import classNames from "classnames";
import {Container} from "@/shared/Container/Container";

export const CommentForm = () => {
    const [inputText, setInputText] = useState<null | string>(null)
    const [error, setError] = useState<boolean>(false)
    const { data: session, status } = useSession()
    const sendComment = (e:FormEvent) => {
        e.preventDefault()
        if (!inputText || !inputText.length) {
            setError(true)
        }
        if (inputText?.length) {
            setError(false)
        }

        console.log(error)
    }
    return (
        status === "unauthenticated" ?
        <div className={styles.CommentFormAuth} >
            <H1>Войдите в аккаунт, прежде чем оставлять комментарии</H1>
            <button className={styles.buttonSignIn} onClick={() => signIn("github")} >
                Войти с помощью GitHub
            </button>
        </div>
            : status === "authenticated" ?
            <>
                <div className={styles.CommentForm}>
                    {(session && session.user) &&
                        <Image width={40} height={40} src={session.user.image as string} alt={"Фото вашего профиля"}/>}
                    <form className={styles.form}>
                            <textarea
                                rows={5}
                                className={classNames({
                                    [styles.error]:error
                                })}
                                cols={53}
                                onInput={event => setInputText(event.currentTarget.value)} />
                            <button onClick={sendComment} type={"submit"}>Отправить</button>
                    </form>
                </div>

            </> :
            <Container className={styles.circ} >
                <CircularProgress className={styles.circular} />
            </Container>



    );
};
