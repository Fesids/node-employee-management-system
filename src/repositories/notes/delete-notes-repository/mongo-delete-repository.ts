import { ObjectId } from "mongodb";
import { IDeleteNoteRepository } from "../../../controllers/notes/delete-notes-controller/protocols";
import { MongoClient } from "../../../databases/Mongo";
import { Note } from "../../../models/Note";

export class MongoDeleteNoteRepository implements IDeleteNoteRepository{
    async deleteUser(id: string): Promise<Note> {
        const note = await MongoClient.db
        .collection<Omit<Note, "id">>("notes")
        .findOne({_id: new ObjectId(id)});

        if(!note){
            throw new Error("Note not found!! provide a  valid id");
        }

        const {deletedCount} = await MongoClient.db
        .collection("notes")
        .deleteOne({_id: new ObjectId(id)});

        if(!deletedCount){
            throw new Error("Note couldn't be deleted");
        }

        const {_id, ...rest} = note;

        return{
            id: _id.toHexString(),
            ...rest
        }
    }
    
}