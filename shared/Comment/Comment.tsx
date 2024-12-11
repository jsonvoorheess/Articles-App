import Image from "next/image";
import {FC} from "react";
import styles from "./Comment.module.css"
import {TranslateDate} from "@/utils";


interface CommentProps {
    src: string,
    username: string,
    date: string,
    content: string,
}

export const Comment:FC<CommentProps> = ({src,username, date, content }) => {
    return (
        <div className={styles.comment} >
                <Image height={40} width={40} className={styles.userImage} src={src} alt={"Фото профиля пользователя"} />
            <div className={styles.commentInfo} >
                <div className={styles.commentUser} >
                    <span className={styles.userLink}>{username}</span>
                    <span className={styles.date} >
                        • {TranslateDate(date)}
                    </span>
                </div>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: content}} ></div>
            </div>
        </div>
    )
}