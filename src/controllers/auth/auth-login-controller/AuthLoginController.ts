import { IUser } from "../../../models/User";
import { HttpRequest, HttpResponse, HttpResponseLogin, IController, IControllerLogin } from "../../ComunProtocols";
import { badRequest, ok } from "../../Helpers";
import { ILoginRepository, IUserLogin, LoginParams } from "./protocols";

export class LoginController implements IControllerLogin{
    constructor(private readonly loginRepository: ILoginRepository){}
    async handle(httpRequest: HttpRequest<LoginParams>):
     Promise<HttpResponseLogin<IUserLogin | string>> {
       
        try{
            const email = httpRequest?.params?.email


            /*if(!email){
                return badRequest("missing user email")
            }*/

            const user = await this.loginRepository.login(httpRequest.body);
            
            return {
                statusCode: 200,
                body: user,
                token: user.token
            };
        } catch(error){
            return badRequest("Something went wrong when trying login")
        }
    } 
    
}