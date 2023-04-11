import { TokenPayload, USER_ROLES } from "../../SRC/Types"

export class TokenManagerMock {

    public createToken = (payload: TokenPayload): string => {
        if (payload.role == USER_ROLES.NORMAL) {
            return "token-mock-normal"
        } else {
            return "token-mock-normal"
        }
    }

    public getPayload = (token: string): TokenPayload | null => {
        if (token == "token-mock-normal") {
            return {
                userId: "id-mock",
                name: "name-mock",
                role: USER_ROLES.NORMAL
            }
            
        } else if (token == "token-mock-admin") {
            return {
                userId: "id-mock",
                name: "name-mock",
                role: USER_ROLES.ADMIN
            }

        } else {
            return null
        }
    }
}