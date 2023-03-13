import express from 'express';
import { CreateNoteFunction, GetNotesFunction, Teste, DeleteNoteFunction } from './NotesFunctions';

const NotesRouter = express.Router();

NotesRouter.get("/teste", Teste);
NotesRouter.post("/new", CreateNoteFunction);
NotesRouter.get("/all", GetNotesFunction)
NotesRouter.delete("/delete/:id", DeleteNoteFunction)
export default NotesRouter