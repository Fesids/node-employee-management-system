import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { EmployeeRouters } from './routers/EmployeeRouters/EmployeeRouters';
import { MongoAuthUserRouter } from './routers/AuthRouters/AuthRouter';
import { MongoClient } from './databases/MongoDb';
import cookieParser from 'cookie-parser'
const main = () =>{

    config();
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser())
    app.use("/api/employee", EmployeeRouters);
    app.use("/api/users", MongoAuthUserRouter);
    MongoClient.connect()
    const port = process.env.PORT || 8000


    app.listen(port, ()=>{
        console.log("server is working!!!")
    })
}

main()