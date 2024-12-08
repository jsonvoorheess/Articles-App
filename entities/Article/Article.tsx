import styles from "./Article.module.css"
import classNames from "classnames";
import Link from "next/link";
import {FC} from "react";
import Image from "next/image";
import {InfoSpan} from "@/shared/InfoSpan/InfoSpan";
import {H1} from "@/shared/H1/H1";
import {Paragraph} from "@/shared/Paragraph/Paragraph";


interface BigArticleProps {
    vert: boolean;
    className?: string,
    link: string;
    image: string;
    name: string;
    date: string;
    title: string;
    desc: string;
    imageSize: "small" | "big"

}

export const Article:FC<BigArticleProps> = ({ className, link, vert, image, name, date, title, desc, imageSize }) => {
    return (
        <Link href={link} role="link" className={classNames(styles.link, className)} >
            <article className={classNames(styles.article, className, {
                [styles.vertical]: vert,
                [styles.gorizontal]: !vert
            })} >
                <div className={classNames(styles.imageCont)} >
                    <Image height={imageSize === "small" ? 200 : 228} width={imageSize === "small" ?  320 : 592} src={image} alt="Изображение статьи" className={classNames({
                        [styles['small']]: imageSize === "small",
                        [styles['big']]: imageSize === "big"
                    })} />
                </div>
                <div className={styles.info} >
                    <InfoSpan name={name} date={date} />
                    <H1>{title}</H1>
                    <Paragraph>{desc}</Paragraph>
                </div>
            </article>
        </Link>
    )
}