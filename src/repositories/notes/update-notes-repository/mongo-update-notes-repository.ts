import { ObjectId } from "mongodb";
import { IUpdateNoteParams, IUpdateNoteRepository } from "../../../controllers/notes/update-notes-controller/protocols";
import { MongoClient } from "../../../databases/Mongo";
import { Note } from "../../../models/Note";

export class MongoUpdateNoteRepository implements IUpdateNoteRepository{
    async updateNote(id: string, params: IUpdateNoteParams): Promise<Note> {
        await MongoClient.db
        .collection("notes")
        .updateOne({_id: new ObjectId(id)}, {
            $set:{
                ...params,
            }
        });

        const note = await MongoClient.db
        .collection<Omit<Note, "id">>("notes")
        .findOne({_id: new ObjectId(id)});

        if(!note){
            throw new Error("Not couldn't be updated");

        }

        const {_id, ...rest} = note;

        return{id:_id.toHexString(), ...rest}

    }
    
}