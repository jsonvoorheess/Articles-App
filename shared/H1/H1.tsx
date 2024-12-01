import {FC} from "react";
import styles from "./H1.module.css"
import classNames from "classnames";


interface H1Props {
    className?: string;
    children: string
}

export const H1:FC<H1Props> = ({ className, children }) => {
    return (
        <h1 className={classNames(className, styles.h1)} >
            {children}
        </h1>
    )
}