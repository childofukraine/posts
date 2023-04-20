export interface UserInfo {
    id: number
    username: string
    password: string
}

export interface Post {
    id: number
    user_name: string
    post_name: string
    post_text: string
    created_at: Date
}