import { UserBusiness } from "../../SRC/Business/UserBusiness"
import { UserDTO, UserInputDTO } from "../../SRC/Dto/UserDTO"
import { UserDatabaseMock } from "../Mocks/UserDatabaseMock"
import { IdGeneratorMock } from "../Mocks/IdGeneratorMock"
import { HashManagerMock } from "../Mocks/HashManagerMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"

describe("signup", () => {
  const userBusiness = new UserBusiness(
        new UserDTO(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new HashManagerMock(),
        new TokenManagerMock()
    )  
    test ("Signup com retorno de token válido", async () => {
        const input: UserInputDTO = {
            name: "User Mock Test",
            email: "normal@email.com",
            password: "senha@123"
        }
        const response = await userBusiness.signUp(input)
        expect(response.token).toBe("token-mock-normal")

    })
})