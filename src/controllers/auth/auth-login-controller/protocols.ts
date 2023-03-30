import { IUser } from "../../../models/User";

export interface LoginParams extends Omit<IUser, "id" | "user_name" | "role">{

}

export interface IUserLogin extends IUser{
    token : string
}

export interface ILoginRepository {
    login(body:LoginParams):Promise<IUserLogin>
}