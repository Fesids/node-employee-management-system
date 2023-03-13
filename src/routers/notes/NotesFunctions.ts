import { CreateNotesController } from "../../controllers/notes/create-notes-controller/create-notes-controller";
import { DeleteNoteController } from "../../controllers/notes/delete-notes-controller/delete-notes-controller";
import { GetNotesController } from "../../controllers/notes/get-notes-controller/get-notes-controller";
import { MongoCreateNoteRepository } from "../../repositories/notes/create-notes-repository/mongo-create-repository"
import { MongoDeleteNoteRepository } from "../../repositories/notes/delete-notes-repository/mongo-delete-repository";
import { MongoGetNotesRepository } from "../../repositories/notes/get-notes-repository/mongo-get-repository";

export const Teste = async (req:any, res:any)=>{
    return res.send("Teste funfou")
}

export const CreateNoteFunction = async (req:any, res:any) =>{
    const mongoNoteRepository = new MongoCreateNoteRepository();

    const createNoteController = new CreateNotesController(
        mongoNoteRepository
    );

    const {body, statusCode} = await createNoteController.handle({
        body: req.body
    })

    res.status(statusCode).send(body);
}

export const GetNotesFunction = async (req:any, res:any) =>{
    const mongoGetNotesRepository = new MongoGetNotesRepository();

    const getNotesController = new GetNotesController(mongoGetNotesRepository);

    const {body, statusCode} = await getNotesController.handle();
    res.status(statusCode).send(body);
}

export const DeleteNoteFunction = async (req:any, res:any) =>{
    const mongoDeleteNoteRepository = new MongoDeleteNoteRepository();

    const deleteNoteRepository = new DeleteNoteController(
        mongoDeleteNoteRepository
    );

    const {statusCode, body} = await deleteNoteRepository.handle({
        params: req.params,
    });

    return res.status(statusCode).send(body);
}