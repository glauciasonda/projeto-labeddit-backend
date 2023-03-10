
import express from "express"
import {PostController} from "../Controller/PostController"
import { PostDTO } from "../Dto/PostDTO"
import { PostDatabase } from "../Database/PostDataBase" 
import { PostBusiness } from "../Business/PostBusiness"
import { IdGenerator } from "../Services/IdGenerator"
import { TokenManager } from "../Services/TokenManager"
import { LikeDTO } from "../Dto/LikeDTO"

export const postRouter = express.Router()

const postController = new PostController(
    new PostDTO(),
    new LikeDTO(),
    new PostBusiness(
        new PostDTO(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost) 
postRouter.post("/:id/comment", postController.createPostComment)
postRouter.get("/:id/comment", postController.getPostWithComments)
postRouter.put("/:id/like", postController.like)
postRouter.delete("/:id", postController.deletePost)