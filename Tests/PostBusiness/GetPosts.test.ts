import { IdGeneratorMock } from "../Mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock"
import { PostDatabaseMock } from "../Mocks/PostDatabaseMock"
import { Post } from "../../SRC/Models/Post"
import { PostDTO, PostOutputDTO } from "../../SRC/Dto/PostDTO"
import { TYPE_POST } from "../../SRC/Types"
import { PostBusiness } from "../../SRC/Business/PostBusiness"


describe("GetPosts", () => {
    const postBusiness = new PostBusiness (
        new PostDTO(),
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    )

    const result: PostOutputDTO[] = [
        {
          id: 'post id mock 1',
          content: 'fjkldjfoejoerieuorujflfjldjfeojoe',
          likes: 3,
          deslikes: 2,
          comments: 3,
          createdAt: '2023-03-28T17:59:39.923Z',
          updatedAt: '2023-03-28T17:59:39.923Z',
          creator: {
            creatorId: 'creator id mock 1',
            name: 'User Normal 1',
            email: 'user@email.com'
          }
        },
        {
          id: 'post id mock 2',
          content: 'fjkldjfoejoerieuorujflfjldjfeojoe',
          likes: 3,
          deslikes: 2,
          comments: 3,
          createdAt: '2023-03-28T17:59:39.923Z',
          updatedAt: '2023-03-28T17:59:39.923Z',
          creator: {
            creatorId: 'creator id mock 1',
            name: 'User Normal 1',
            email: 'user@email.com'
          }
        },
        {
          id: 'post id mock 3',
          content: 'fjkldjfoejoerieuorujflfjldjfeojoe',
          likes: 3,
          deslikes: 2,
          comments: 3,
          createdAt: '2023-03-28T17:59:39.923Z',
          updatedAt: '2023-03-28T17:59:39.923Z',
          creator: {
            creatorId: 'creator id mock 1',
            name: 'User Normal 1',
            email: 'user@email.com'
          }
        }
      ]

      

    test("resultado GetPosts válido", async () => {
        
        const response = await postBusiness.getPosts("teste")
        console.log("typeof result: ",  result)
        console.log("typeof response:",  response)

        //expect(response).toThrow()
        
    })


    

})