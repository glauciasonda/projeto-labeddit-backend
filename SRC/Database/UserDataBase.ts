import { User } from "../Models/User";
import { UserDB } from "../Types";
import { BaseDatabase } from "./BaseDataBase";


export class UserDataBase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public signUp = async (user: User) => {

        const userDB: UserDB = {
            user_id: user.getUserId(),
            name: user.getName(), 
            email: user.getEmail(), 
            password: user.getPassword(),
            role: user.getRole(),
            user_created_at: user.getUserCreatedAt()
        }
        await BaseDatabase
                .connection(UserDataBase.TABLE_USERS)
                .insert(userDB)
    } 

    public getUserByEmail =  async (email: string): Promise<User | undefined> => {

        const [ userDB ]: UserDB[] =   await BaseDatabase
                                                    .connection(UserDataBase.TABLE_USERS)
                                                    .where("email", "=", `${email}`)
        if(userDB) {
            return new User(
                userDB.user_id,
                userDB.name, 
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.user_created_at
            )

        } else {
            return undefined
        }
    }


    
}