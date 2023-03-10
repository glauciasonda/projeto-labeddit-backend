import { Request, Response } from "express"
import { PostBusiness } from "../Business/PostBusiness"
import { LikeDTO } from "../Dto/LikeDTO"
import { PostCommentGetDTO, PostCommentInputDTO, PostCommentOutputDTO, PostDTO, PostInputDTO, PostOutputDTO } from "../Dto/PostDTO"
import { BaseError } from "../Errors/BaseError"

export class PostController{
    constructor(
        private postDTO: PostDTO, 
        private likeDTO: LikeDTO,
        private postBusiness: PostBusiness
        
    ){}
    
    public getPosts = async(req: Request, res: Response) => {
        try{
            const input = req.body.query
           
            const output: PostOutputDTO[] = await this.postBusiness.getPosts(input)

            res.status(200).send(output)

        } catch (error) {
            console.log("Erro ao executar método PostController.getPosts", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }

    }

    public getPostWithComments = async (req: Request, res: Response) => {
        try{
            const postOriginalId = req.params.id 
            const token = req.headers.authorization

            const input: PostCommentGetDTO = this.postDTO.createPostCommentGetDTO(postOriginalId, token)

            const output: PostCommentOutputDTO = await this.postBusiness.getPostWithComments(input)

            res.status(200).send(output)

        } catch (error) {
            console.log("Erro ao executar método PostController.getPostWithComments", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
            
        }
        
    }

    public createPost = async (req: Request, res: Response) => {
        try{
            const content = req.body.content
            const token = req.headers.authorization

            const input: PostInputDTO = this.postDTO.createPostInputDTO(content, token)

            await this.postBusiness.createPost(input)
            
            res.status(201).send()

        } catch (error) {
            console.log("Erro ao executar método PostController.createPost", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createPostComment = async (req: Request, res: Response) => {
        try{
            
            const postOriginalId = req.params.id 
            const content = req.body.content
            const token = req.headers.authorization

            const input: PostCommentInputDTO = this.postDTO.createPostCommentInputDTO(postOriginalId, content, token)

            await this.postBusiness.createPostComment(input)
            res.status(201).send()

        } catch (error) {
            console.log("Erro ao executar método PostController.createPostComment", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }

    }

    public like = async (req: Request, res: Response) => {
        try{
             const like = req.body.like 
             const token = req.headers.authorization
             const postId = req.params.id
                        
             const input = this.likeDTO.createLikeInputDTO(like, token, postId)
             await this.postBusiness.likeDislke(input)

             res.status(200).send()

        } catch(error) {
            console.log("Erro ao executar método PostController.like", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deletePost = async (req: Request, res: Response) => {
        try{
            const token = req.headers.authorization as string
            const postId = req.params.id as string 

            await this.postBusiness.deletePost(postId, token)

        } catch (error) {
            console.log("Erro ao executar método PostController.deletePost", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }

        }
    }


}