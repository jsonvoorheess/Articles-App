import Image from "next/image";
import {FC} from "react";
import styles from "./Comment.module.css"
import Link from "next/link";


interface CommentProps {
    src: string,
    username: string,
    date: string,
    content: string
}

export const Comment:FC<CommentProps> = ({src,username, date, content}) => {
    return (
        <div className={styles.comment} >
                <Image height={40} width={40} className={styles.userImage} src={src} alt={"Фото профиля пользователя"} />
            <div className={styles.commentInfo} >
                <div className={styles.commentUser} >
                    <Link className={styles.userLink}  href={`/user/${username}`}>{username}</Link>
                    <span>• {date}</span>
                </div>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: content}} ></div>
            </div>
        </div>
    )
}