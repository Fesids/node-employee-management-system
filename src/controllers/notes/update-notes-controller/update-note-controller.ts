import { ok } from "assert";
import { Note } from "../../../models/Note";
import { HttpRequest, HttpResponse, IController } from "../ComunProtocols";
import { badRequest } from "../helpers";
import { IUpdateNoteParams, IUpdateNoteRepository } from "./protocols";


export class updateNoteController implements IController{
    constructor(private readonly updateNoteRepository:IUpdateNoteRepository){}
    async handle(httpRequest: HttpRequest<IUpdateNoteParams>)
    : Promise<HttpResponse<Note | string>> {
        
        try{
            const id = httpRequest?.params?.id;
            const {body} = httpRequest;

            if(!body){
                return badRequest("Missing Fields");
            }

            if(!id){
                return badRequest("Missing user id")
            }

            const allowedfieldstoupdate:(keyof IUpdateNoteParams)[]=[
                "key",
                "body",
                "title"
            ]

            const somefieldsNotAllowedToUpdate = Object.keys(body)
            .some(
                (key) => !allowedfieldstoupdate
                .includes(key as keyof IUpdateNoteParams)
            );

            if (somefieldsNotAllowedToUpdate){
                return badRequest("some included fields are not allowed")
            }

            const note = await this.updateNoteRepository.updateNote(id, body);

            return {
                statusCode: 200,
                body: note
            }
     } catch(error){
        return badRequest("Something went wrong when trying update note")
     }
     
    } 
    
}