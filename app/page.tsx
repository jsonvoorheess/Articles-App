import {Post} from "@/types";
import {H1} from "@/shared/H1/H1";
import styles from "./page.module.css"
import {Article} from "@/entities/Article/Article";
import {ButonListOpen} from "@/shared/ButtonListOpen/ButonListOpen";
import {TranslateDate} from "@/utils";

export default async function Home() {
    let latestPosts: Post[] = [];
    let posts: Post[] = [];

    try {
        const data = await fetch("https://dev.to/api/articles/latest", {
            next: { revalidate: 100 },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!data.ok) {
            throw new Error(`Ошибка при загрузке последних постов: ${data.status}`);
        }
        
        latestPosts = await data.json();

        const postsData = await fetch("https://dev.to/api/articles", {
            cache: "force-cache",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!postsData.ok) {
            throw new Error(`Ошибка при загрузке всех постов: ${postsData.status}`);
        }
        
        posts = await postsData.json();
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        return <div>Произошла ошибка при загрузке данных. Пожалуйста, попробуйте позже.</div>;
    }

    if (!latestPosts.length || !posts.length) {
        return <div>Данные не найдены</div>;
    }

  return (
   <div className={styles.latest} >
       <H1 className={styles.mainpageH} >Недавние посты</H1>
       <div className={styles.topLatest} >
       <div className={styles.cont} >
           <Article
               key={latestPosts[0].id}
               vert={true}
               link={`/post/${latestPosts[0].id}`}
               image={latestPosts[0].social_image}
               name={latestPosts[0].user.name}
               date={TranslateDate(latestPosts[0].created_at)}
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
                           link={`/post/${post.id}`}
                           image={post.social_image}
                           name={post.user.name}
                           date={TranslateDate(post.created_at)}
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
                       link={`/post/${latestPosts[3].id}`}
                       image={latestPosts[3].social_image}
                       name={latestPosts[3].user.name}
                       date={TranslateDate(latestPosts[3].created_at)}
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
                            link={`/post/${post.id}`}
                            image={post.social_image}
                            name={post.user.name}
                            date={TranslateDate(post.created_at)}
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
