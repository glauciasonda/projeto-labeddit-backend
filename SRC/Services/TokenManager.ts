import jwt from 'jsonwebtoken'
import { TokenPayload } from '../Types'
import dotenv from 'dotenv' 

dotenv.config()

export class TokenManager {

    public createToken = (payload: TokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
        return token
    }

    public getPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )
            return payload as TokenPayload
        } catch (error) {
            console.log("Erro ao executar método TokenManager.getPayload", error)
            return null
        }
    }
}