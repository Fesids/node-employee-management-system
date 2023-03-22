import { ILoginRepository, LoginParams } from "../../controllers/auth/auth-login-controller/protocols";
import { MongoClient } from "../../databases/MongoDb";
import { IUser } from "../../models/User";


export class MongoLoginRepository implements ILoginRepository{
    async login(params: LoginParams): Promise<IUser> {
        const user = await MongoClient.db
        .collection<Omit<IUser, "id">>("users")
        .findOne({email: params.email});

        if(!user){
            throw new Error("User not found")
        }

        const {_id, ...rest} = user

        return {id: _id.toHexString(), ...rest}
    }
    
}