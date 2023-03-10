export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export enum TYPE_POST {
    POST = 0,
    COMMENT = 1
}

export interface PostDB {
    post_id: string, 
    creator_id: string, 
    content: string, 
    likes: number,
    dislikes: number, 
    post_created_at: string, 
    post_update_at: string, 
    post_original_id: string, 
    comments: number, 
    type_post: TYPE_POST
}

export interface PostUserDB {
    postId: string,
    creatorId: string,
    content: string,
    likes: number,
    dislikes: number,
    postCreatedAt: string,
    postUpdateAt: string,
    name: string,
    email: string, 
    postOriginalId: string, 
    comments: number, 
    typePost: TYPE_POST

}

export interface UserDB {
    user_id: string, 
    name: string, 
    email: string,
    password: string, 
    role: USER_ROLES,     
    user_created_at: string 
}

export interface TokenPayload {
    userId: string,
	name: string,
    role: USER_ROLES
}

export interface OutputToken {
    message: string,
    token: string
}

export interface LikeDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface Comment {
    user_id: string,
    user_name: string,
    content: string,
    like: number,
    dislike: number
}