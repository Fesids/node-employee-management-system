import { Note } from "../../../models/Note";

export interface IGetSpecificNoteRepository{
    getSpecificNote(id:string): Promise<Note>
}