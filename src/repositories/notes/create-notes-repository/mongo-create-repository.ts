import { CreateNoteParams, ICreateNoteRepository } from "../../../controllers/notes/create-notes-controller/protocols";
import { MongoClient } from "../../../databases/Mongo";
import { Note } from "../../../models/Note";


export class MongoCreateUserRepository implements ICreateNoteRepository{
    async createNote(params: CreateNoteParams): Promise<Note> {
        const {insertedId} = await MongoClient.db
        .collection("notes")
        .insertOne(params);

        const user = await MongoClient.db
        .collection<Omit<Note, "id">>("notes")
        .findOne({_id: insertedId});

        if(!user){
            throw new Error("User not created");
        }

        const {_id,...rest} = user;

        return {id: _id.toHexString(), ...rest}

    }
    
}