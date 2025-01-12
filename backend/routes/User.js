import express from "express"
const router = express.Router();

import { login,signup,sendotp } from "../controllers/Auth.js";

router.post("/login",login)

router.post("/signup",signup)

router.post("/sendotp",sendotp)

export default router