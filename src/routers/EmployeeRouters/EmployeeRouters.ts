import express from 'express';
import { AddNewEmployee, DeleteEmployee, GetAllEmployee, teste, UpdateEmployee } from './EmployeeRoutersFunctions';

const router = express.Router();

router.get("/teste", teste);
router.post("/new", AddNewEmployee);
router.get("", GetAllEmployee);
router.delete("/:id", DeleteEmployee),
router.patch("/:id", UpdateEmployee)


export const EmployeeRouters = router;

