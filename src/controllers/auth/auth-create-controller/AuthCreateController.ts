import { IUser } from "../../../models/User";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest, created } from "../../Helpers";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController{
    constructor(private readonly createUserRepository: ICreateUserRepository){}
    async handle(httpRequest: HttpRequest<CreateUserParams>): 
    Promise<HttpResponse<IUser | string>> {
        try{
            const requiredFields = ["user_name", "email", "password", "role"];

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateUserParams]){
                    return badRequest(`Field ${field} is required`)
                }
            }

            if(!httpRequest.body){
                return badRequest("Please, specify a body");
            }

            const user = await this.createUserRepository.createUser(httpRequest.body);
            return created<IUser>(user);

        } catch(error){
            return badRequest("Someting went wrong");
        }
    }
    
}