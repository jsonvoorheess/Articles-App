import {MyComment, Post, Tag, User1} from "@/types";
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

export const dynamic = 'force-dynamic'; 

export async function generateStaticParams() {
    try {
        const [latestData, postsData] = await Promise.all([
            fetch("https://dev.to/api/articles/latest", { next: { revalidate: 100 } }),
            fetch("https://dev.to/api/articles", { next: { revalidate: 100 } })
        ]);

        const [latestPosts, MainPosts] = await Promise.all([
            latestData.json(),
            postsData.json()
        ]);

        const posts: Post[] = latestPosts.concat(MainPosts);
        return posts.map((post: Post) => ({
            id: post.id.toString(),
        }));
    } catch (error) {
        console.error('Ошибка при генерации статических параметров:', error);
        return [];
    }
}


export default async function Page({params}: { params: Promise<{ id: string, userId:string }> }) {   
    try {
        const [postResponse, commentsResponse] = await Promise.all([
            fetch(`https://dev.to/api/articles/${(await params).id}`, {
                next: { revalidate: 60 },
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            fetch(`https://dev.to/api/comments?a_id=${(await params).id}`, {
                next: { revalidate: 60 }
            })
        ]);

        if (!postResponse.ok || !commentsResponse.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const [post, comments] = await Promise.all([
            postResponse.json(),
            commentsResponse.json()
        ]);

        const userResponse = await fetch(`https://dev.to/api/users/${post.user.user_id}`, {
            next: { revalidate: 3600 } 
        });

        if (!userResponse.ok) {
            throw new Error('Ошибка при загрузке данных пользователя');
        }

        const user: User1 = await userResponse.json();

        const myCommentsResponse = await fetch("http://localhost:8000/comments", {
            cache: 'no-store' 
        });

        if (!myCommentsResponse.ok) {
            throw new Error('Ошибка при загрузке локальных комментариев');
        }

        const myComments: MyComment[] = await myCommentsResponse.json();
        const filteredComm = myComments.filter((comm) => comm.id === post.id);
        const tagsArray: string[] = post.tag_list.split(", ").filter((tag: string) => Tag.includes(tag));

        return (
            <section className={styles.section} key={post.id} >
            <div className={styles.left} >
                <ReactionBar className={styles.reaction1} commentCount={comments.length} likeCount={post.positive_reactions_count} />
                <main className={styles.post} >
                    <Image className={styles.image} width={876} height={368} src={post.social_image} alt="Фото поста" />
                    <div className={styles.info} >
                        <div className={styles.reacions} >
                            <UserCart src={post.user.profile_image} userName={post.user.username} date={post.readable_publish_date} />
                            <ReactionBar className={styles.reaction2} commentCount={comments.length} likeCount={post.positive_reactions_count} />
                        </div>
                
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
                            <CommentForm PostId={post.id} />
                            {filteredComm.map((comm) => {
                                return (
                                    <Comment key={comm.commId} src={comm.avatar as string} username={comm.author as string} date={comm.date} content={comm.text} />
                                )
                            })}
                            {/* eslint-disable @typescript-eslint/no-explicit-any */}
                            {comments.map((comment: any) => {
                                return (
                                    <Comment key={comment.id_code} src={comment.user.profile_image_90} username={comment.user.username} date={comment.created_at} content={comment.body_html} />
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

    } catch (error) {
        console.error('Ошибка при загрузке страницы:', error);
        return (
            <div className={styles.errorContainer}>
                <h1>Произошла ошибка при загрузке страницы</h1>
                <p>Пожалуйста, попробуйте позже или обратитесь к администратору</p>
            </div>
        );
    }
}

    
