import express from 'express';
import { GetSpecificNoteController } from '../../controllers/notes/get-specific-note-controller/get-specific-note-controller';
import { CreateNoteFunction, GetNotesFunction, Teste, DeleteNoteFunction, GetSpecificNoteFunc } from './NotesFunctions';

const NotesRouter = express.Router();

NotesRouter.get("/teste", Teste);
NotesRouter.post("/new", CreateNoteFunction);
NotesRouter.get("/all", GetNotesFunction)
NotesRouter.delete("/delete/:id", DeleteNoteFunction)
NotesRouter.get("/:id", GetSpecificNoteFunc)
export default NotesRouter