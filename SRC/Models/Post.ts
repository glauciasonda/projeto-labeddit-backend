import { TYPE_POST } from "../Types"

export class Post {
    constructor(
        private postId: string, 
        private creatorId: string, 
        private nameCreator: any,
        private emailCreator: any,
        private content: string, 
        private likes: number,
        private dislikes: number, 
        private postCreatedAt: string, 
        private postUpdatedAt: string, 
        private postOriginalId: string , 
        private comments: number, 
        private typePost: TYPE_POST
    ) {}

    public getPostId(): string {
        return this.postId
    }

    public setPostId(value: string): void {
        this.postId = value
    }

    public getCreatorId(): string{
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getNameCreator(): string{
        return this.nameCreator
    }
    
    public getEmailCreator(): string{
        return this.emailCreator
    }
    
    public getContent(): string{
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }
    
    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getPostCreatedAt(): string {
        return this.postCreatedAt
    }

    public setPostCreatedAt(value: string): void {
        this.postCreatedAt = value
    }

    public getPostUpdatedAt(): string{
        return this.postUpdatedAt
    }

    public setPostUpdatedAt(value: string): void {
        this.postUpdatedAt = value
    }

    public getPostOriginalId(): string {
        return this.postOriginalId
    }

    public setPostOriginalId(value: string): void {
        this.postOriginalId = value
    } 

    public getComments(): number {
        return this.comments
    }

    public setComments(value: number): void {
        this.comments = value
    }

    public getTypePost(): TYPE_POST {
        return this.typePost
    }

    public setTypePost(value: TYPE_POST): void {
        this.typePost = value
    }
     
}