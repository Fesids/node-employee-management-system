import express from 'express';
import { CreateNoteFunction, DeleteNoteFunction, GetNotesFunction, Teste } from './NotesFunctions';

const NotesRouter = express.Router();

NotesRouter.get("/teste", Teste);
NotesRouter.post("/new", CreateNoteFunction);
NotesRouter.get("/all", GetNotesFunction)
NotesRouter.post("/delete/:id", DeleteNoteFunction)
export default NotesRouter