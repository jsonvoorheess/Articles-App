import {FC} from "react";
import styles from "./InfoSpan.module.css"
import classNames from "classnames";

interface InfoSpanProps {
    className?: string;
    name: string
    date: string
}

export const InfoSpan:FC<InfoSpanProps> = ({ name, className, date }) => {
    return (
        <span className={classNames(styles.span, className)} >
            {`${name}•${date}`}
        </span>
    )
}