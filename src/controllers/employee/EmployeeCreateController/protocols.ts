import { Employee } from "../../../models/Employee";

export interface CreateEmployeeParams extends Omit<Employee, "id_employee">{

}

export interface ICreateEmployeeRepository{
    create(params: CreateEmployeeParams): Promise<Employee>;
}