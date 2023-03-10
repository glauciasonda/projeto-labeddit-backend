
import { BadRequestError } from "../Errors/BadRequestError"
import { User } from "../Models/User"
import { USER_ROLES } from "../Types"

export interface UserInputDTO {
    name: string, 
    email: string,
    password: string, 
}

export interface UserLoginDTO{
    email: string,
    password: string
}

export class UserDTO {
    public createUserInputDTO(
        name: unknown, 
        email: unknown, 
        password: unknown
    ): UserInputDTO {

        if (typeof name !== "string"){
            throw new BadRequestError("name deve ser string")
        }

        if (typeof email !== "string"){
            throw new BadRequestError("email deve ser string")
        }

        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i)){
            throw new BadRequestError("email inválido")
        }

        if(typeof password !== "string"){
            throw new BadRequestError("password deve ser string")
        }
        const dto = {
            name, 
            email,
            password
        }
        return dto
    }

    public createUserLoginDTO(
        email: unknown, 
        password: unknown
    ): UserLoginDTO {

        if (typeof email !== "string"){
            throw new BadRequestError("email deve ser string")
        }

        if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i)){
            throw new BadRequestError("email inválido")
        }

        if(typeof password !== "string"){
            throw new BadRequestError("password deve ser string")
        }

        const dto: UserLoginDTO = {
            email,
            password
        }
        return dto
    }
    
    public toUserModel(userInputDTO: UserInputDTO, 
                       userIdGenerator: string, 
                       passwordHash: string
         ): User {
                return new User(
                    userIdGenerator,
                    userInputDTO.name,
                    userInputDTO.email,
                    passwordHash,
                    USER_ROLES.NORMAL,
                    new Date().toISOString()
                )    
    }

}