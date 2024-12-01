import styles from "./Paragraph.module.css"
import classNames from "classnames";
import {FC} from "react";

interface ParagraphProps {
    children: string;
    className?: string
}

export const Paragraph:FC<ParagraphProps> = ({ children, className }) => {
    return (
        <p className={classNames(styles.p, className)} >
            {children}
        </p>
    )
}