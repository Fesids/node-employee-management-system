import { IUser } from "../../models/User";

export interface CreateUserParams extends Omit<IUser, "id">{

}

export interface ICreateUserRepository{
    createUser(params: CreateUserParams): Promise<IUser>
}