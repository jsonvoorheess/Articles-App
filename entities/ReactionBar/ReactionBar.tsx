"use client"
import {FC, MouseEventHandler, useCallback, useState} from "react";
import styles from "./ReactionBar.module.css"
import Like from "@/public/heart.svg"
import Comment from "@/public/comment.svg"
import classNames from "classnames";


interface ReactionBarProps {
    commentCount: number,
    likeCount: number
}


export const ReactionBar:FC<ReactionBarProps> = ({ commentCount, likeCount }) => {
    const [isLike, setIsLike] = useState(false)


    const onLike =  useCallback(() => {
        setIsLike(!isLike)
    }, [setIsLike, isLike])


    return (
        <div className={styles.reactionsBar}>
            <div className={styles.reaction}>
                    <Like onClick={() => onLike()} className={classNames(styles.like, {
                        [styles.isLike]: isLike
                    })} />
                <span>
                {likeCount}
            </span>
            </div>
            <div className={styles.reaction}>
                <a
                   href="#comm"
                >
                    <Comment  className={styles.comm} />
                </a>

                <span>
                {commentCount}
            </span>
            </div>
        </div>
    )
}