export enum Edepartment{
    MARKETING,
    HUMAN_RESOURCES,
    IT
}
export interface Employee{
    id_employee: number,
    first_name: string,
    last_name: string,
    email: string,
    img: string,
    department: Edepartment
}