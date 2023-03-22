import express from "express";
import { register } from "./AuthRouterFunction";

const router = express.Router();

router.post("/register", register);

export const MongoAuthUserRouter = router;