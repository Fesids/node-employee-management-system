import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { EmployeeRouters } from './routers/EmployeeRouters/EmployeeRouters';

const main = () =>{

    config();
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use("/api/employee", EmployeeRouters)

    const port = process.env.PORT || 8000


    app.listen(port, ()=>{
        console.log("server is working!!!")
    })
}

main()