"use client"
import {FC, useState} from "react";
import {Button} from "@mui/material";
import styles from "./ButtonListOpen.module.css"
import {Post} from "@/types";
import {Article} from "@/entities/Article/Article";
import {TranslateDate} from "@/utils";

interface ButonListOpenProps {
    infoArticles: Post[]
}

export const ButonListOpen:FC<ButonListOpenProps> = ({infoArticles}) => {
    const [openList, setOpenList] = useState(false)
    return (
        !openList ?
            <div className={styles.blockPosts}>
                <Button onClick={() => setOpenList(true)}  variant={"contained"} style={{paddingTop: 10}}>Показать еще</Button>
            </div> :
            <div className={styles.posts} >
                {infoArticles.map((post:Post) => {
                    return (
                        <Article className={styles.post} key={post.id} vert={true} link={`/post/${post.id}`} image={post.social_image} name={post.user.name} date={TranslateDate(post.created_at)} title={post.title} desc={post.description} imageSize={"small"} />
                    )
                })}
            </div>
    )}