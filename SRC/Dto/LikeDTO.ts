import { BadRequestError } from "../Errors/BadRequestError"

export interface LikeInputDTO {
    like: boolean
    token: string, 
    postId: string
}

export class LikeDTO {
    public createLikeInputDTO(
            like: unknown,
            token: unknown,
            postId: unknown
        
        ): LikeInputDTO {

        if (typeof like !== "boolean") {
            throw new BadRequestError("like deve ser bolean")
        }

        if (typeof token !== "string"){
            throw new BadRequestError("token deve ser string")
        }
        if (typeof postId !== "string"){
            throw new BadRequestError("postId deve ser string")
        }

        const dto: LikeInputDTO = {
            like: like, 
            token: token,
            postId: postId
        }
        return dto
    }
}

