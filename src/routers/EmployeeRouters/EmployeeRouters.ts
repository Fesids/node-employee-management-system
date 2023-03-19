import express from 'express';
import { teste } from './EmployeeRoutersFunctions';

const router = express.Router();

router.get("/teste", teste)


export const EmployeeRouters = router;

