import {FC} from "react";
import styles from "./InfoBlock.module.css"

interface InfoBlockProps {
    location: string | null,
    date: string,
    name: string | null,
    website: string | null,
    github_username: string | null
}

export const InfoBlock:FC<InfoBlockProps> = ({ location, date, name, website, github_username }) => {
    return (
        <div className={styles.infoblock}>
            {name && <div className={styles.info}>
                <p>Имя:</p>
                <span>{name}</span>
            </div>}
            {website && <div className={styles.info}>
                <p>Сайт пользователя:</p>
                <a target="_blank" href={website}>{website}</a>
            </div>}
            {github_username && <div className={styles.info}>
                <p>Ник в github:</p>
                <span>{github_username}</span>
            </div>}
            {location && <div className={styles.info}>
                <p>Местоположение:</p>
                <span>{location}</span>
            </div>}
            <div className={styles.info}>
                <p>Зарегистрировался:</p>
                <span>{date}</span>
            </div>
        </div>
    )
}