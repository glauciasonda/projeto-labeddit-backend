import { PostDatabase } from "../Database/PostDataBase"
import { PostCommentGetDTO, PostCommentInputDTO, PostCommentOutputDTO, PostDTO, PostInputDTO, PostOutputDTO } from "../Dto/PostDTO"
import { BadRequestError } from "../Errors/BadRequestError"
import { Post  } from "../Models/Post"
import { IdGenerator } from "../Services/IdGenerator"
import { TokenManager } from "../Services/TokenManager"
import { LikeInputDTO } from "../Dto/LikeDTO"
import { Like } from "../Models/Like"
import { TYPE_POST, USER_ROLES } from "../Types"


export class PostBusiness {
    constructor (
        private postDTO: PostDTO,
        private postDataBase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManage: TokenManager

    ) {}

    public getPosts = async (input: string | undefined ) => {

        const allPosts: Post[] = await this.postDataBase.getPosts(input)

        const output: PostOutputDTO[] = allPosts.map((post) => {
            return this.postDTO.createPostOutPutDTO(post) 
        })

        return (output)
        
    }

    public getPostWithComments = async (input: PostCommentGetDTO) =>  {
        const { postOriginalId, token } = input

        const payload = this.tokenManage.getPayload(token)
        if(payload === null) {
            throw new BadRequestError("Invalid Token")
        }

        const [ postOriginal ]: Post[] =  await this.postDataBase.getPosts(postOriginalId)
        if (!postOriginal) {
            throw new BadRequestError("Invalid postId")
        }
        
        const comments: Post[] = await this.postDataBase.getComments(postOriginalId)

        const output: PostCommentOutputDTO = this.postDTO.createPostCommentOutputDTO(postOriginal, comments)
         
        return output

    }

    public createPost = async (input: PostInputDTO) => {
        const { content, token } = input

        const payload = this.tokenManage.getPayload(token)
        if( payload === null ){
            throw new BadRequestError("Invalid Token")
        }
                
        const postId = this.idGenerator.generate()
        const newPost = new Post(
                            postId,
                            payload.userId,
                            null, 
                            null, 
                            content,
                            0,
                            0,
                            new Date().toISOString(),
                            new Date().toISOString(), 
                            postId,
                            0,
                            TYPE_POST.POST
        )
        await this.postDataBase.createPost(newPost)
    }

    public createPostComment = async (input: PostCommentInputDTO ) => {

        const { postOriginalId, content, token } = input

        const payload = this.tokenManage.getPayload(token)
        if(payload === null) {
            throw new BadRequestError("Invalid Token")
        }

        const [ postOriginal ]: Post[] =  await this.postDataBase.getPosts(postOriginalId)
        if (!postOriginal) {
            throw new BadRequestError("Invalid postId")
        }

        const postCommentId = this.idGenerator.generate()
        const postComment = new Post(
                                postCommentId,
                                payload.userId,
                                null, 
                                null, 
                                content,
                                0,
                                0,
                                new Date().toISOString(),
                                new Date().toISOString(),
                                postOriginalId,
                                0,
                                TYPE_POST.COMMENT
       )
        await  this.postDataBase.createPost(postComment)
        
        const comments = postOriginal.getComments()
        postOriginal.setComments(comments + 1)

        await this.postDataBase.updatePost(postOriginal)
        
    }

    public likeDislke = async (input: LikeInputDTO) => {
        const { like, token, postId } = input

        const valueLike: number = like ? 1 : 0
        
        const payload = this.tokenManage.getPayload(token)
        if( payload === null ){
            throw new BadRequestError("Invalid Token")
        }

        const [ post ]: Post[] =  await this.postDataBase.getPosts(postId)
        if (!post) {
            throw new BadRequestError("Invalid postId")
        }

        if (post.getCreatorId() === payload.userId){
            throw new BadRequestError ("user don't able to Like/Dislike")
        }

        const likeTotal = post.getLikes()
        const dislikeTotal = post.getDislikes()
        
        const postLike: Like | undefined   = await this.postDataBase.getLike(post.getPostId(), post.getCreatorId())

        if(postLike){

            if (postLike.getLike() === valueLike){
                
                await this.postDataBase.delteLike(postLike.getPostId())
               
                if (like){
                    post.setLikes(likeTotal - 1)
                } else {
                    post.setDislikes(dislikeTotal - 1)
                } 
                
                await this.postDataBase.updatePost(post)

            } else {
                console.log("entrou no else")
                postLike.setLike(valueLike)

                await this.postDataBase.updateLike(postLike)

                if (like){
                    post.setLikes(likeTotal + 1)
                    post.setDislikes(dislikeTotal -1)
                } else {
                    post.setLikes(likeTotal - 1)
                    post.setDislikes(dislikeTotal +1)
                } 
                
                await this.postDataBase.updatePost(post)
           }

        } else {
            const newLike = new Like(
                post.getCreatorId(),
                post.getPostId(),
                valueLike
            )
            await this.postDataBase.createLike(newLike)
                
            if (like){
                post.setLikes(likeTotal + 1)
            } else {
                post.setDislikes(dislikeTotal + 1)
            } 
           
            await this.postDataBase.updatePost(post)
        }
            
    }

    public deletePost = async (postId: string, token: string) => {

        const payload = this.tokenManage.getPayload(token)
        if(!payload) {
            throw new BadRequestError("Invalid Token")
        }

        const [ post ]: Post[] =  await this.postDataBase.getPosts(postId)
        if (!post) {
            throw new BadRequestError("Invalid postId")
        }

        if ((post.getCreatorId() === payload.userId) || (payload.role === USER_ROLES.NORMAL)){
                        
            await this.postDataBase.deletePost(postId)

        } else {
            throw new BadRequestError("user not allowed")
        }
    
    }

}