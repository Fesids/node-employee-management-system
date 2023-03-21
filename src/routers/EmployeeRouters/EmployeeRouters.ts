import express from 'express';
import { AddNewEmployee, DeleteEmployee, GetAllEmployee, teste } from './EmployeeRoutersFunctions';

const router = express.Router();

router.get("/teste", teste);
router.post("/new", AddNewEmployee);
router.get("", GetAllEmployee);
router.delete("/:id", DeleteEmployee)


export const EmployeeRouters = router;

