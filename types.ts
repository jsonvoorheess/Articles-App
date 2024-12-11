export interface Post {
    type_of: string
    id: number
    title: string
    description: string
    readable_publish_date: string
    slug: string
    path: string
    url: string
    comments_count: number
    public_reactions_count: number
    collection_id: any
    published_timestamp: string
    positive_reactions_count: number
    cover_image: any
    social_image: string
    canonical_url: string
    created_at: string
    edited_at: any
    crossposted_at: any
    published_at: string
    last_comment_at: string
    reading_time_minutes: number
    tag_list: string
    tags: string
    user: User
    body_markdown: string,
    body_html: string,
}

export interface User1{
    type_of: string,
    id: number,
    username: string,
    name:  string,
    twitter_username: null | string,
    github_username: string | null,
    summary: string,
    location: string | null,
    website_url: string | null,
    joined_at: string,
    profile_image: string
}


export interface User {
    name: string
    username: string
    twitter_username: any
    github_username: any
    user_id: number
    website_url: any
    profile_image: string
    profile_image_90: string
}


export interface comment {
    type_of: string
    id_code: string
    created_at: string
    body_html: string
    user: User
    children: Children[] | []
}

export interface Children {
    type_of: string
    id_code: string
    created_at: string
    body_html: string
    user: User2
    children: any[]
}

export interface User2 {
    name: string
    username: string
    twitter_username: any
    github_username: string
    user_id: number
    website_url: any
    profile_image: string
    profile_image_90: string
}

export const Tag = ["beginners", "programming", "javascript", "webdev", "tutorial", "react", "python", "archlinux", "productivity", "devops", "a11y", "android", "testing", "mobile"]

export interface MyComment {
    id: number,
    author: string | null | undefined,
    text: string,
    avatar: string | null | undefined,
    commId: string,
    date: string
}