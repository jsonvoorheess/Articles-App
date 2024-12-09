import {comment, Post, Tag, User1} from "@/types";
import {ReactionBar} from "@/entities/ReactionBar/ReactionBar";
import Image from "next/image";
import styles from "./PostPage.module.css"
import {UserCart} from "@/entities/UserCart/UserCart";
import {H1} from "@/shared/H1/H1";
import {TagInfo} from "@/shared/Tag/Tag";
import {Comment} from "@/shared/Comment/Comment";
import {Paragraph} from "@/shared/Paragraph/Paragraph";
import {InfoBlock} from "@/shared/InfoBlock/InfoBlock";
import {CommentForm} from "@/entities/CommentForm/CommentForm";


export async function generateStaticParams() {
    const data = await fetch("https://dev.to/api/articles/latest", { next: { revalidate: 100 } })
    const latestPosts:Post[] = await data.json()
    const postsData = await fetch("https://dev.to/api/articles")
    const MainPosts: Post[] = await postsData.json()
    const posts:Post[] = latestPosts.concat(MainPosts)

    return posts.map((post:Post) => ({
        id: post.id.toString(),
    }))
}


export default async function Page({params,}: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const post:Post = await fetch(`https://dev.to/api/articles/${id}`, { cache:"force-cache" }).then(post => post.json())
    const tags:string = post.tag_list
    const tagsArray:string[] = tags.split(", ").filter((tag) => Tag.includes(tag))
    const comments:comment[] = await fetch(`https://dev.to/api/comments?a_id=${post.id}`).then(comm => comm.json())
    const user:User1 = await fetch(`https://dev.to/api/users/${post.user.user_id}`, { cache: "force-cache" }).then(user => user.json())
    console.log(comments)
    return (
        <section className={styles.section} key={post.id} >
            <div className={styles.left} >
                <ReactionBar commentCount={comments.length} likeCount={post.positive_reactions_count} />
                <main className={styles.post} >
                    <Image className={styles.image} width={876} height={368} src={post.social_image} alt="Фото поста" />
                    <div className={styles.info} >
                        <UserCart src={post.user.profile_image} userName={post.user.username} date={post.readable_publish_date} />
                        <H1 className={styles.title} >{post.title}</H1>
                        <div className={styles.tags} >
                            {tagsArray.map((tag) => {
                                return (
                                    <TagInfo key={tag} tag={tag} />
                                )
                            })}
                        </div>
                            <div dangerouslySetInnerHTML={{__html: post.body_html}} className={styles.postText} >
                        </div>
                        <hr/>
                        <div className={styles.comments} id={"comm"} >
                            <CommentForm />
                            {comments.map((comment) => {
                                return (
                                    <Comment src={comment.user.profile_image_90} username={comment.user.username} date={comment.created_at} content={comment.body_html} />
                                )
                            })}

                        </div>
                    </div>
                </main>
            </div>
            <aside className={styles.userCard} >
                <div className={styles.user} >
                    <Image className={styles.imageuser}  width={48} height={48} src={user.profile_image} alt={"Фото пользователя"} />
                    <H1>{user.username}</H1>
                </div>
                <div className={styles.userInfo}>
                    <Paragraph>{user.summary}</Paragraph>
                    <InfoBlock location={user.location} github_username={user.github_username} name={user.name} website={user.website_url} date={user.joined_at} />
                </div>
            </aside>
        </section>
    )
}