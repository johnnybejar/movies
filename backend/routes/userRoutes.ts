import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUser);

export default router;
