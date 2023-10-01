import express from "express";
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from "../controllers/listController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").post(protect, updateList).delete(protect, deleteList);

export default router;
