import { ObjectId } from "mongodb";
import { ILoginRepository, IUserLogin, LoginParams } from "../../controllers/auth/auth-login-controller/protocols";
import { MongoClient } from "../../databases/MongoDb";
import { IUser } from "../../models/User";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";


export class MongoLoginRepository implements ILoginRepository{
    async login(body:LoginParams): Promise<IUserLogin> {
        
        const user = await MongoClient.db
        .collection<Omit<IUser, "id">>("users")
        .findOne({email: body.email});

        if(!user){
            throw new Error("User not found! check credentials")
        }



        const isPasswordCorrect = bcrypt.compareSync(body.password, user.password);

        if(!isPasswordCorrect){
            throw new Error("Password is incorrect! please, check your password")
        }



        const {_id, ...rest} = user
        const token = jwt.sign({id: user._id}, "jwtkey");

        const userLogin = {
            id: _id.toHexString(),
            ...rest,

        }

        return {id: _id.toHexString(), ...rest, token}
    }
    
}