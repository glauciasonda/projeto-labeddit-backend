import express from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserController } from "../Controller/UserController"
import { UserDataBase } from "../Database/UserDataBase"
import { UserDTO } from "../Dto/UserDTO"
import { HashManager } from "../Services/HashManager"
import { IdGenerator } from "../Services/IdGenerator"
import { TokenManager } from "../Services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
        new UserDTO(),
        new UserBusiness(
            new UserDTO(),
            new UserDataBase(),
            new IdGenerator(),
            new HashManager(),
            new TokenManager()
            )
        )
userRouter.post("/signup", userController.signUp)
userRouter.post("/login", userController.login)
