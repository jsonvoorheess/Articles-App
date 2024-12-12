"use client"
import {FC, useCallback, useState} from "react";
import styles from "./ReactionBar.module.css"
import Like from "@/public/heart.svg"
import Comment from "@/public/comment.svg"
import classNames from "classnames";


interface ReactionBarProps {
    commentCount: number,
    likeCount: number,
    className?: string
}


export const ReactionBar:FC<ReactionBarProps> = ({ commentCount, likeCount, className }) => {
    const [isLike, setIsLike] = useState(false)


    const onLike =  useCallback(() => {
        setIsLike(!isLike)
    }, [setIsLike, isLike])


    return (
        <div className={classNames(styles.reactionsBar, className)}>
            <div className={styles.reaction}>
                    <Like onClick={() => onLike()} className={classNames(styles.like, {
                        [styles.isLike]: isLike
                    })} />
                <span>
                {isLike ? likeCount + 1 : likeCount}
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