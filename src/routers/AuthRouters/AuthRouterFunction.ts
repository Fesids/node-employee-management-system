import {Request, Response} from "express";
import {param, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import { CreateUserController } from "../../controllers/auth/auth-create-controller/AuthCreateController";

import { IUser } from "../../models/User";
import { MongoCreateUserRepository } from "../../repositories/auth/create-auth-repository";



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