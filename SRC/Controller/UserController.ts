import { Request, Response } from "express"
import { UserBusiness } from "../Business/UserBusiness"
import { UserDTO, UserInputDTO, UserLoginDTO } from "../Dto/UserDTO"
import { BaseError } from "../Errors/BaseError"
import { OutputToken } from "../Types"

export class UserController {

    constructor(
        private userDTO: UserDTO,
        private userBusiness: UserBusiness

    ){}

    public signUp = async (req: Request, res: Response) => {
        try{

            const input: UserInputDTO = this.userDTO.createUserInputDTO(
                req.body.name, 
                req.body.email,
                req.body.password
            )

            const outputToken: OutputToken = await this.userBusiness.signUp(input)
            
            res.status(201).send(outputToken)

        } catch (error) {
            console.log("Erro ao executar UserController.signUp", error)
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public login = async (req: Request, res: Response) => {
        const email = req.body.email
        const password = req.body.password
        try{

            const userLoginDTO: UserLoginDTO = this.userDTO.createUserLoginDTO(email, password)
            
            const outputToken: OutputToken =  await this.userBusiness.login(userLoginDTO)
            
            res.status(200).send(outputToken)

        } catch(error) {
            console.log("Erro ao executar método UserController.login", error )
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }


}