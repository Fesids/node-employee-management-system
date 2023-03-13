import { ObjectId } from "mongodb";
import { IGetSpecificNoteRepository } from "../../../controllers/notes/get-specific-note-controller/protocols";
import { MongoClient } from "../../../databases/Mongo";
import { Note } from "../../../models/Note";

export class MongoGetSpecificNoteRepository implements IGetSpecificNoteRepository{
     async getSpecificNote(id: string): Promise<Note> {
        const note = await MongoClient.db
        .collection<Omit<Note, "id">>("notes")
        .findOne({_id: new ObjectId(id)});

        if(!note){
            throw new Error("Note not found")
        }

        const {_id,...rest} = note

        return {id: _id.toHexString(), ...rest}
    }

}