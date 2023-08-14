import express from "express";
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from "../controllers/listController";

const router = express.Router();

router.route("/").get(getLists).post(createList);
router.route("/:id").post(updateList).delete(deleteList);

export default router;
