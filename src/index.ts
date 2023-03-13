import express from "express"
import {config} from "dotenv"
import { MongoClient } from "./databases/Mongo";
import NotesRouter from "./routers/notes/NotesRouter";
import cors from 'cors'

const main = async () =>{
    
    await MongoClient.connect();

    config();
    const app = express();
    app.use(express.json())
    app.use(cors())
    app.use("/api/notes",NotesRouter)
    
    
    const port = process.env.PORT || 8000;

    app.listen(port, ()=>{
        console.log(`the server started at port ${port}`)
    })

}

main()