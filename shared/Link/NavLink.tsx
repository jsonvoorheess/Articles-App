import Link from "next/link";
import cls from "./NavLink.module.css"
import classNames from "classnames";
import {FC} from "react";

interface NavLinkProps {
    children: string,
    path: string,
    className?: string
}

export const NavLink: FC<NavLinkProps> = ({children, path, className}) => {
    return (
        <Link className={classNames(cls.link, className)} href={path}>
            {children}
        </Link>
    )
}
