import { UserBusiness } from "../../SRC/Business/UserBusiness"
import { UserDTO, UserInputDTO, UserLoginDTO } from "../../SRC/Dto/UserDTO"
import { UserDatabaseMock } from "../Mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../Mocks/IdGeneratorMock"
import { HashManagerMock } from "../Mocks/HashManagerMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"

describe("Login", () => {
    const userBusiness = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )  

    test ("Login com retorno de token válido", async () => {
        const input: UserLoginDTO = {
            email: "normal@email.com",
            password: "senha@123"
        }
        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")

    })

})