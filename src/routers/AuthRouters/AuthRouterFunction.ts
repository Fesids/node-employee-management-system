import {Request, Response, NextFunction} from "express";
import {param, validationResult} from "express-validator";
import jwt, {Secret, JwtPayload} from "jsonwebtoken";
import { CreateUserController } from "../../controllers/auth/auth-create-controller/AuthCreateController";
import { LoginController } from "../../controllers/auth/auth-login-controller/AuthLoginController";

import { IUser } from "../../models/User";
import { MongoCreateUserRepository } from "../../repositories/auth/create-auth-repository";
import { MongoLoginRepository } from "../../repositories/auth/login-auth-repository";
import {config} from "dotenv"


/**
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns
 * 
 */
export const register = async (req: Request, res: Response) =>{
   const mongoUserRepository = new MongoCreateUserRepository();

   const createUserController = new CreateUserController(
    mongoUserRepository
   );

   const {body, statusCode} = await createUserController.handle({
        body: req.body
   })

   res.status(statusCode).send(body);

}

export const Login = async (req:Request, res: Response) =>{
    const loginRepository = new MongoLoginRepository();

    const loginController = new LoginController(
        loginRepository
    )

   

    const {body, statusCode, token} = await loginController.handle(
        {
            body: req.body
        }
    );

    

    res.cookie("jwtkey", token, {
        httpOnly:true
    })

    res.status(statusCode).send(body);

}


export const auth = async (req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.jwtkey;
    try{
        
        const decoded = jwt.verify(token, "jwtkey");
        next();
        res.json(decoded)
    } catch(err){
        res.status(401).send("Please authenticate")
    }

    
}

export const Logout = (req:Request, res:Response) =>{
    res.clearCookie("jwtkey", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has logout")
}











