import { BaseDatabase } from "../../SRC/Database/BaseDataBase"
import { Post } from "../../SRC/Models/Post"
import { Like } from "../../SRC/Models/Like"
import { TYPE_POST } from "../../SRC/Types"

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_USERS = "users"
    public static TABLE_LIKES = "likes_dislikes"

    public async getPosts(q: string | undefined) {
         
        const a = new Post(
                "post id mock 1", 
                "creator id mock 1", 
                "User Normal 1", 
                "user@email.com", 
                "fjkldjfoejoerieuorujflfjldjfeojoe", 
                3,
                2,
                new Date().toISOString(), 
                new Date().toISOString(),
                "post id mock 1",
                3,
                TYPE_POST.POST )

        const b = new Post(
            "post id mock 2", 
            "creator id mock 1", 
            "User Normal 1", 
            "user@email.com", 
            "fjkldjfoejoerieuorujflfjldjfeojoe", 
            3,
            2,
            new Date().toISOString(), 
            new Date().toISOString(),
            "post id mock 2",
            3,
            TYPE_POST.POST )

        const c = new Post(
            "post id mock 3", 
            "creator id mock 1", 
            "User Normal 1", 
            "user@email.com", 
            "fjkldjfoejoerieuorujflfjldjfeojoe", 
            3,
            2,
            new Date().toISOString(), 
            new Date().toISOString(),
            "post id mock 3",
            3,
            TYPE_POST.POST)
        
        const allPosts: Post[] = [a, b, c]    
                           
        return allPosts
    }

    public  getComments =  async (q: string) =>  {
        
        const a = new Post(
            "post id mock 4", 
            "creator id mock 1", 
            "User Normal 1", 
            "user@email.com", 
            "fjkldjfoejoerieuorujflfjldjfeojoe", 
            3,
            2,
            new Date().toISOString(), 
            new Date().toISOString(),
            "post id mock 1",
            3,
            TYPE_POST.COMMENT )

        const b = new Post(
            "post id mock 5", 
            "creator id mock 1", 
            "User Normal 1", 
            "user@email.com", 
            "fjkldjfoejoerieuorujflfjldjfeojoe", 
            3,
            2,
            new Date().toISOString(), 
            new Date().toISOString(),
            "post id mock 1",
            3,
            TYPE_POST.COMMENT )

        const c = new Post(
            "post id mock 6", 
            "creator id mock 1", 
            "User Normal 1", 
            "user@email.com", 
            "fjkldjfoejoerieuorujflfjldjfeojoe", 
            3,
            2,
            new Date().toISOString(), 
            new Date().toISOString(),
            "post id mock 2",
            3,
            TYPE_POST.COMMENT)
        
        const allComments: Post[] = [a, b, c]    
        
        return allComments
    }

    public  createPost = async (post: Post) =>  {

    }

    public getLike = async (postId: string, userId: string) => {
        return new Like (
            "creator id mock 1",
            "post id mock 1", 
            1
         )
    }
    

    public createLike = async (like: Like) => {  }

    public updateLike = async (like: Like) => {  }

    public delteLike = async(postId: string) => { }

    public updatePost = async (post: Post) => { }

    public deletePost = async (postId: string) => { }

}