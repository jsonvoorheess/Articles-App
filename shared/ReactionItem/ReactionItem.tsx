import styles from "./ReactionItem.module.css"


export const ReactionItem = ({ count, icon }: { count: number, icon: any }) => {
    return (
        <div className={styles.reaction} >
            <button className={styles.button} >
                {icon}
            </button>
            <span>
                {count}
            </span>
        </div>
    )
}