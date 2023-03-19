import mysql from 'mysql'

const DB = mysql.createConnection(
    {
        host: "localhost",
        database: "employee_management_node",
        user: "root",
        password: "67890000"
    }
)
export default DB;
