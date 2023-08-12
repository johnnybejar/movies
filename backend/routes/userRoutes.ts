import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/getUser", getUser);

export default router;
