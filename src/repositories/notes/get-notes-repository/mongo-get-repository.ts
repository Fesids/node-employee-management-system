import { IGetNotesRepository } from "../../../controllers/notes/get-notes-controller/protocols";
import { MongoClient } from "../../../databases/Mongo";
import { Note } from "../../../models/Note";

export class MongoGetNotesRepository implements IGetNotesRepository{
    async getNotes(): Promise<Note[]> {
       const notes = await MongoClient.db
       .collection<Omit<Note, "id">>("notes")
       .find({})
       .toArray();

       return notes.map(({_id, ...rest}) =>({
            ...rest,
            id: _id.toHexString()
       }))
    }
    
}