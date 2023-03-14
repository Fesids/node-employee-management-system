import { Note } from "../../../models/Note";

export interface IUpdateNoteParams extends Omit<Note, "id">{
    
}
export interface IUpdateNoteRepository{
    updateNote(id:string, params:IUpdateNoteParams):Promise<Note>
}