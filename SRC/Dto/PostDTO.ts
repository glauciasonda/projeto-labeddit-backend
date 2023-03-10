import { BadRequestError } from "../Errors/BadRequestError"
import { Post } from "../Models/Post"
import { Comment } from "../Types"

export interface PostInputDTO {
     content: string, 
     token: string 
}

export interface UserCreator{
    creatorId: string, 
    name: string,
    email: string
}

export interface PostOutputDTO {
    id: string, 
    content: string, 
    likes: number,
    deslikes: number, 
    comments: number,
    createdAt: string, 
    updatedAt: string,
    creator: UserCreator
}

export interface PostCommentInputDTO {
    postOriginalId: string, 
    content: string, 
    token: string
}

export interface PostCommentGetDTO{
    postOriginalId: string, 
    token: string
}

export interface PostCommentOutputDTO {
    id: string, 
    content: string, 
    likes: number,
    deslikes: number, 
    comments: number,
    createdAt: string, 
    updatedAt: string,
    creator: UserCreator,
    listComments: Comment[]
}

export class PostDTO {

    public createPostOutPutDTO(post: Post): PostOutputDTO {
        const userCreator: UserCreator = { 
            creatorId: post.getCreatorId(),
            name: post.getNameCreator(),
            email: post.getEmailCreator()
        }
        const dto: PostOutputDTO =  {
            id: post.getPostId(), 
            content: post.getContent(),
            likes: post.getLikes(),
            deslikes: post.getDislikes(),
            comments: post.getComments(),
            createdAt: post.getPostCreatedAt(),
            updatedAt: post.getPostUpdatedAt(),
            creator: userCreator
        } 
        return dto
    } 

    public createPostInputDTO(
        content: unknown,
        token: unknown
    ): PostInputDTO {

        if (typeof content !== "string"){
            throw new BadRequestError("content deve ser string")
        }

        if (typeof token !== "string"){
            throw new BadRequestError("Token Null")
        } 
        const dto: PostInputDTO = {
            content: content,
            token: token
        }
        return dto  

    }

    public createPostCommentInputDTO(
        postOriginalId: unknown, 
        content: unknown, 
        token: unknown

    ): PostCommentInputDTO  {

        if(typeof postOriginalId !== "string") {
            throw new BadRequestError("content deve ser string")
        }
        if (typeof content !== "string"){
            throw new BadRequestError("content deve ser string")
        }

        if (typeof token !== "string"){
            throw new BadRequestError("Token Null")
        }
        
        const dto: PostCommentInputDTO ={
            postOriginalId, 
            content, 
            token
        } 
        return dto
    }

    public createPostCommentGetDTO(
        postOriginalId: unknown, 
        token: unknown

    ): PostCommentGetDTO  {

        if(typeof postOriginalId !== "string") {
            throw new BadRequestError("content deve ser string")
        }
        
        if (typeof token !== "string"){
            throw new BadRequestError("Token Null")
        }
        
        const dto: PostCommentGetDTO ={
            postOriginalId, 
            token
        } 
        return dto
    }

    public createPostCommentOutputDTO(
        post: Post, 
        listComent: Post[]
    ): PostCommentOutputDTO  {

        const userCreator: UserCreator = { 
            creatorId: post.getCreatorId(),
            name: post.getNameCreator(),
            email: post.getEmailCreator()
        }

        let allComments: Comment[] = listComent.map((element) => {
            
            return {
                user_id: element.getCreatorId(),
                user_name: element.getNameCreator(),
                content: element.getContent(),
                like: element.getLikes(),
                dislike: element.getDislikes()
            }
        })

        const dto: PostCommentOutputDTO = {
            id: post.getPostId(), 
            content: post.getContent(), 
            likes: post.getLikes(),
            deslikes: post.getDislikes(), 
            comments: post.getComments(),
            createdAt: post.getPostCreatedAt(), 
            updatedAt: post.getPostUpdatedAt(),
            creator: userCreator,
            listComments: allComments
        }
        
        return dto 
    }
}