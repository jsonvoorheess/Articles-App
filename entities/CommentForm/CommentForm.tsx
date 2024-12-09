"use client"
import React, {useState} from 'react';
import {signIn, useSession} from "next-auth/react";
import styles from "./CommentForm.module.css"
import {H1} from "@/shared/H1/H1";
import Image from "next/image";

export const CommentForm = () => {
    const { data: session } = useSession()
    return (
        !session ?
        <div className={styles.CommentForm} >
            <H1>Войдите в аккаунт, прежде чем оставлять комментарии</H1>
            <button className={styles.buttonSignIn} onClick={() => signIn("github")} >
                Войти с помощью GitHub
            </button>
        </div>
            :
            <div className={styles.CommentForm} >
                <Image width={40} height={40} src={session.user?.image || ""} alt={"Фото вашего профиля"} />
                <form className={styles.form} action="">
                    <textarea />
                    <button type={"submit"} >Отправить</button>
                </form>
            </div>
    );
};
