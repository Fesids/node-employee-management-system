import { Note } from "../../../models/Note";

export interface IDeleteNoteRepository{
    deleteUser(id:string):Promise<Note>
}