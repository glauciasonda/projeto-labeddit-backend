import { USER_ROLES } from "../Types";

export class User {
    constructor(
        private userId: string, 
        private name: string, 
        private email: string,
        private password: string, 
        private role: USER_ROLES, 
        private userCreatedAt: string 
    ){}
    
    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }

    public getUserCreatedAt(): string {
        return this.userCreatedAt
    }

    public setUserCreatedAt(value: string): void {
        this.userCreatedAt = value
    }



}