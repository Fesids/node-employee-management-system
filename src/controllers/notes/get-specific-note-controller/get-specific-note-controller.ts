import { Note } from "../../../models/Note";
import { HttpRequest, HttpResponse, IController } from "../ComunProtocols";
import { badRequest, ok } from "../helpers";
import { IGetSpecificNoteRepository } from "./protocols";


export class GetSpecificNoteController implements IController{
    constructor(private readonly getSpecificNoteRepository: IGetSpecificNoteRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<Note | string>> {
        try{
            const id = httpRequest?.params?.id

            if(!id){
                return badRequest("Missing note id")
            }

            const note = await this.getSpecificNoteRepository.getSpecificNote(id);

            return ok(note)
        } catch(error){
            return badRequest(`Something went wrong when trying to retrive note`);
        }
    }
    
}