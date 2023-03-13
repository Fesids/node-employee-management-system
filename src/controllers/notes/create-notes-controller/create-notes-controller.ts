import { Note } from "../../../models/Note";
import { HttpRequest, HttpResponse, IController } from "../ComunProtocols";
import { badRequest, created } from "../helpers";
import { CreateNoteParams, ICreateNoteRepository } from "./protocols";

export class CreateNotesController implements IController{
    constructor(private readonly createNoteRepository: ICreateNoteRepository){}
    async handle(httpRequest: HttpRequest<CreateNoteParams>)
    : Promise<HttpResponse<Note | string>> {
        try{
            const requiredFields = ['key','title', 'body'];

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof CreateNoteParams]?.length){
                    return badRequest(`Field ${field} is required`)
                }
            }

            if(!httpRequest.body){
                return badRequest("Please, specify a body")
            }

            const note = await this.createNoteRepository.createNote(httpRequest.body);
            return created<Note>(note);
        } catch(error){
            return badRequest("Something went wrong");
        }

       
    }
    
}