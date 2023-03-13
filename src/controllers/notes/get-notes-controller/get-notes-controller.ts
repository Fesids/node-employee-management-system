import { ok } from "assert";
import { Note } from "../../../models/Note";
import { HttpRequest, HttpResponse, IController } from "../ComunProtocols";
import { badRequest } from "../helpers";
import { IGetNotesRepository } from "./protocols";

export class GetNotesController implements IController{
    constructor(private readonly getNotesRepository: IGetNotesRepository){}
    async handle(): 
    Promise<HttpResponse<Note[] | string>> {
        try{
            const notes = await this.getNotesRepository.getNotes();
            return {
                statusCode: 200,
                body: notes
            }
           
        } catch(error){
            return badRequest("error")
        }
    }


    
}