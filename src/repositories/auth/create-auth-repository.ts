import { CreateUserParams, ICreateUserRepository } from "../../controllers/auth/auth-create-controller/protocols";
import { MongoClient } from "../../databases/MongoDb";
import { IUser } from "../../models/User";
import bcrypt from "bcryptjs"
import s from "connect-redis";

export class MongoCreateUserRepository implements ICreateUserRepository{
    async createUser(params: CreateUserParams): Promise<IUser> {
       const {insertedId} = await MongoClient.db
       .collection("users")
       .insertOne(params);

       const user = await MongoClient.db
       .collection<Omit<IUser, "id">>("users")
       .findOne({_id: insertedId});

       if(!user){
        throw new Error("User not created");
       }

       const {_id, password, ...rest} = user;
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(password, salt);

       return {id: _id.toHexString(), password: hash, ...rest}

    }
    
}