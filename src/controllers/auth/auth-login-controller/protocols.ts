import { IUser } from "../../../models/User";

export interface LoginParams extends Omit<IUser, "id" | "user_name" | "role">{

}

export interface ILoginRepository {
    login(params: LoginParams):Promise<IUser>
}