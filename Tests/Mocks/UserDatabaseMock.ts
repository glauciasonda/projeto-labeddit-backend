import { BaseDatabase } from "../../SRC/Database/BaseDataBase"
import { User } from "../../SRC/Models/User"
import { USER_ROLES } from "../../SRC/Types"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public signUp = async (user: User) => {
     
    }

    public getUserByEmail = async (email: string): Promise<User | undefined> => {
        switch (email) {
            case "normal@email.com":
                return new User(
                    "id-mock",
                    "User Normal Mock",
                    "normal@email.com", 
                    "hash-senha@123", 
                    USER_ROLES.NORMAL,
                    new Date().toString()
                )
            
            case "admin@email.com":
                return new User (
                    "id-mock",
                    "User Admin Mock",
                    "adminl@email.com", 
                    "hash-senha@123", 
                    USER_ROLES.ADMIN,
                    new Date().toString()
                )
            
            default:
                return undefined        
        }

    }
    

}

                           