import express from "express"
import {config} from "dotenv"
import { MongoClient } from "./databases/Mongo";

const main = async () =>{
    
    await MongoClient.connect();

    config();
    const app = express();
    const port = process.env.PORT || 8000;

    app.listen(port, ()=>{
        console.log(`the server started at port ${port}`)
    })

}

main()