import { ok } from "assert";
import { Note } from "../../../models/Note";
import { HttpRequest, HttpResponse, IController } from "../ComunProtocols";
import { badRequest } from "../helpers";
import { IDeleteNoteRepository } from "./protocols";


export class DeleteNoteController implements IController{
    constructor(private readonly deleteUserRepository: IDeleteNoteRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<Note | string>> {
        try{
            const id = httpRequest?.params?.id

            if(!id){
                return badRequest("Missing note id");
            }

            const note = await this.deleteUserRepository.deleteUser(id);

            return {
                statusCode: 200,
                body: note
            }

        } catch(error){
          return badRequest("Something went wrong")
        }
        
    }
    
}