import { IUser } from "../../../models/User";
import { HttpRequest, HttpResponse, IController } from "../../ComunProtocols";
import { badRequest, ok } from "../../Helpers";
import { ILoginRepository } from "./protocols";

export class LoginController implements IController{
    constructor(private readonly loginRepository: ILoginRepository){}
    async handle(httpRequest: HttpRequest<any>):
     Promise<HttpResponse<IUser | string>> {
       
        try{
            const email = httpRequest?.body?.email


            if(!email){
                return badRequest("missing user email")
            }

            const user = await this.loginRepository.login(httpRequest.body);

            return ok(user);
        } catch(error){
            return badRequest("Something went wrong when trying login")
        }
    } 
    
}