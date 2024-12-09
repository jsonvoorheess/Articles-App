import styles from "./Tag.module.css"
import classNames from "classnames";

export const TagInfo = ({ tag }:{ tag:string }) => {
    return (
        <p className={classNames(styles.tag, {
            [styles.beginners]: tag === "beginners",
            [styles.programming]: tag === "programming",
            [styles.javascript]: tag === "javascript",
            [styles.webdev]: tag === "webdev",
            [styles.tutorial]: tag === "tutorial",
            [styles.react]: tag === "react",
            [styles.python]: tag === "python",
            [styles.archlinux]: tag === "archlinux",
            [styles.productivity]: tag === "productivity",
            [styles.devops]: tag === "devops",
            [styles.a11y]: tag === "a11y",
            [styles.android]: tag === "android",
            [styles.testing]: tag === "testing",
            [styles.mobile]: tag === "mobile"
        })} >
            #
            <span className={styles.tagtext} >{tag}</span>
        </p>
    )
}