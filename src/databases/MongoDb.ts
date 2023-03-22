/*import {MongoClient as Mongo, Db} from "mongodb";


export const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void>{
        const url = process.env.MONGODB_URL || "mongodb://localhost:27017";

        const client = new Mongo(url);
        const db = client.db("employee-management-node");

        this.client = client;
        this.db = db;

        console.log("connected to mongo");
    }
}*/

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { BlockList } from "net";
import { string } from "prop-types";


const UserSchema = new mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        unique: true
    },

    email:{
        type: String,
        require: true,
        match: /.+\@.+\..+/,
        unique: true

    },

    password:{
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
})

UserSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return next();
    if(user.isModified("password")){
        bcrypt.genSalt(10, function  (err, salt){
            if(err) return next();

            if(typeof user.password === 'string'){
                bcrypt.hash(user.password, salt, function (err, hash){
                if(err) return next(err);
                user.password = hash;
                next();


            })
            }
           
        })
    }
});

UserSchema.methods.comparePassword = function(candidatePassword: string,
    cb: (arg:any, isMatch?: boolean)=>void){

        bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
            if (err) return cb(err);
            cb(null, isMatch);
        })
}

export const User = mongoose.model("user", UserSchema);
