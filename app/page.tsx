import {Post} from "@/types";
import {H1} from "@/shared/H1/H1";
import styles from "./page.module.css"
import {Article} from "@/entities/Article/Article";
import {ButonListOpen} from "@/shared/ButtonListOpen/ButonListOpen";

export default async function Home() {
    const data = await fetch("https://dev.to/api/articles/latest", { next: { revalidate: 100 } })
    const latestPosts:Post[] = await data.json()
    const postsData = await fetch("https://dev.to/api/articles")
    const posts: Post[] = await postsData.json()
  return (
   <div className={styles.latest} >
       <H1 className={styles.mainpageH} >Недавние посты</H1>
       <div className={styles.topLatest} >
       <div className={styles.cont} >
           <Article
               key={latestPosts[0].id}
               vert={true}
               link={`/article/${latestPosts[0].id}`}
               image={latestPosts[0].social_image}
               name={latestPosts[0].user.name}
               date={latestPosts[0].created_at}
               title={latestPosts[0].title}
               desc={latestPosts[0].description}
               imageSize={"big"}
           />
           <div className={styles.group} >
               {latestPosts.slice(1, 3).map((post) => {
                   return (
                       <Article
                           key={post.id}
                           vert={false}
                           link={`/article/${post.id}`}
                           image={post.social_image}
                           name={post.user.name}
                           date={post.created_at}
                           title={post.title}
                           desc={post.description}
                           imageSize={"small"}
                       />
                   )
               })}
           </div>
           </div>
                   <Article
                       key={latestPosts[3].id}
                       vert={false}
                       link={`/article/${latestPosts[3].id}`}
                       image={latestPosts[3].social_image}
                       name={latestPosts[3].user.name}
                       date={latestPosts[3].created_at}
                       title={latestPosts[3].title}
                       desc={latestPosts[3].description}
                       imageSize={"big"}
                   />
           <hr/>

        </div>
       <H1>Все посты</H1>
        <div>
            <div className={styles.posts} >
                {posts.slice(0, 16).map((post:Post) => {
                    return (
                        <Article
                            className={styles.post}
                            key={post.id}
                            vert={true}
                            link={`/article/${post.id}`}
                            image={post.social_image}
                            name={post.user.name}
                            date={post.created_at}
                            title={post.title}
                            desc={post.description}
                            imageSize={"small"} />
                    )
                })}
            </div>
                <ButonListOpen infoArticles={posts.slice(17)} />
        </div>
   </div>
  );
}
