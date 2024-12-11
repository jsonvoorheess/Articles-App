"use client"
import React, {FormEvent, useEffect, useRef, useState} from 'react';
import {signIn, useSession} from "next-auth/react";
import styles from "./CommentForm.module.css"
import {H1} from "@/shared/H1/H1";
import Image from "next/image";
import {CircularProgress} from "@mui/material";
import classNames from "classnames";
import {Container} from "@/shared/Container/Container";
import {Comment} from "@/shared/Comment/Comment";
import {MyComment} from "@/types";
import {TranslateDate} from "@/utils";
var randomize = require('randomatic');

export const CommentForm = ({ PostId }: { PostId: number }) => {
    const [inputText, setInputText] = useState<null | string>(null)
    const [error, setError] = useState<boolean>(false)
    const [comment, setComment] = useState<[] | MyComment[]>([])
    const { data: session, status } = useSession()
    const ref = useRef<null | HTMLTextAreaElement>(null)

    const sendComment = async (e:FormEvent) => {
        e.preventDefault()
        if (!inputText || !inputText.length) {
            setError(true)
            return
        }
        if (inputText?.length) {
            setError(false)
            await fetch("http://localhost:8000/comments", {
                method: "POST",
                body: JSON.stringify({
                    id: PostId,
                    author: session?.user?.name,
                    text: inputText,
                    avatar: session?.user?.image,
                    commId: randomize("*", 10),
                    date: new Date().toISOString()
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setComment([{
                id: PostId,
                author: session?.user?.name,
                text: inputText,
                avatar: session?.user?.image,
                commId: randomize("*", 10),
                date: new Date().toISOString()
            },
                ...comment])
            if (ref.current !== null) {
                ref.current.value = ""
                setInputText("")
            }

        }

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
                                ref={ref}
                                rows={5}
                                className={classNames({
                                    [styles.error]:error
                                })}
                                cols={53}
                                onInput={event => setInputText(event.currentTarget.value)} />
                            <button onClick={sendComment} type={"submit"}>Отправить</button>
                    </form>
                </div>
                {(session && session.user && comment) &&
                    comment.map((comm) => {
                        console.log(comm.date)
                        return (
                            <Comment key={comm.commId} src={comm.avatar as string} username={comm.author as string} date={comm.date} content={comm.text} />
                        )

                    })

                }

            </> :
            <Container className={styles.circ} >
                <CircularProgress className={styles.circular} />
            </Container>



    );
};
