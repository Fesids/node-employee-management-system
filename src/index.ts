import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'

const main = () =>{

    config();
    const app = express();
    app.use(express.json());
    app.use(cors());


    app.listen(()=>{
        console.log("server is working!!!")
    })
}

main()