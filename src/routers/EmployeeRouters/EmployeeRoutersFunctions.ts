import DB from "../../databases/MysqlDb";

export const teste = (req:any, res:any) =>{
    res.send("teste ta xinxa");
}

export const AddNewEmployee = (req:any, res:any) =>{
    let q = 'insert into employees(`first_name`, `last_name`, `email`, `img`, `department`) values (?)';

    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.img,
        req.body.email,
        req.body.department
    ]

    DB.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.json("Post has been created")
    })


}

export const GetAllEmployee = (req:any, res:any) =>{
    const q = req.query.position?
    "select * from employees where position=?": "select * from employees";

    DB.query(q, [req.query.posistion], (err, data)=>{
        if(err) return res.json("deu ruim");
        return res.json(data);
    })
}

export const DeleteEmployee = (req:any, res:any) =>{
    const emp_id = req.params.id;

    const q = 'delete from employees where id_employee=?';

    DB.query(q, [emp_id], (err, data)=>{
        if (err) return res.json(err)
        return res.json("post deleted")
    })
}

export const UpdateEmployee = (req:any, res:any) =>{
    const emp_id = req.params.id;
    let q = "select * from employees where id_employee=?"
    DB.query(q, [emp_id], (err, data)=>{
        if (err) return res.status(404).send(data);
        else{

            const fields_to_update = [
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                req.body.img,
                req.body.department

            ]
            q = "update employees set first_name=?, last_name=?, email=?, img=?, department=?";

            DB.query(q, fields_to_update, (err, data)=>{
                if (err) res.status(404).send("failed to update");
                res.status(200).send(data);
            })

        }
    })


}

