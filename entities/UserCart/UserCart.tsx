import Image from "next/image";
import {FC} from "react";
import Link from "next/link";
import styles from "./UserCart.module.css"

interface UserCartProps {
    src: string,
    userName: string,
    date: string
}

export const UserCart:FC<UserCartProps> = ({src, date, userName}) => {
    return (
        <div className={styles.usercart} >
            <Image width={40} height={40} className={styles.image} src={src} alt={"Карточка пользователя"} />
            <div className={styles.info} >
                <Link className={styles.link} href={`/user/${userName}`} >{userName}</Link>
                <span className={styles.span} >{date}</span>
            </div>
        </div>
    )
}