import express from "express";
import { auth, Login, Logout, register } from "./AuthRouterFunction";

const router = express.Router();

router.post("/register", register);
router.post("/login",Login);
router.post("/logout", Logout);
router.get("/auth", auth)
//router.get("/tooken", authorize)

export const MongoAuthUserRouter = router;