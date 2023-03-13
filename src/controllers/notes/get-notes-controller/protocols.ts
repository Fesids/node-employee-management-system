import { Note } from "../../../models/Note";

export interface IGetNotesRepository{
    getNotes(): Promise<Note[]>
}