import styles from "./Container.module.css"
import classNames from "classnames";
import {ReactNode} from "react";

export const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className={classNames(styles.container)} >
            {children}
        </div>
    )
}