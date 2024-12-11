import Image from "next/image";
import {FC} from "react";
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
                <span className={styles.link} >{userName}</span>
                <span className={styles.span} >{date}</span>
            </div>
        </div>
    )
}