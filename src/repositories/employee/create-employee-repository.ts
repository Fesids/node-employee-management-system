import { CreateEmployeeParams, ICreateEmployeeRepository } from "../../controllers/employee/EmployeeCreateController/protocols";
import DB from "../../databases/MysqlDb";
import { Employee } from "../../models/Employee";

export class MysqlCreateEmployeeRepository implements ICreateEmployeeRepository{
    async create(params: CreateEmployeeParams): Promise<Employee> {
       let q = 'insert into employees(`first_name`, `last_name`, `email`, `img`) values (?)';

       const values = [
        params.first_name,
        params.last_name,
        params.img,
        params.email
       ]

       DB.query(q, [values])

       
    }
    
}