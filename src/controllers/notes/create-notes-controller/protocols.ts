import { Note } from "../../../models/Note";

export interface CreateNoteParams extends Omit<Note, "id">{

}


export interface ICreateNoteRepository{
    createNote(params: CreateNoteParams): Promise<Note>;
}