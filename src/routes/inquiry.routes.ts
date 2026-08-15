import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiry.controller";

const router = Router();

router.post("/", createInquiry);
router.get("/", getInquiries);
router.patch("/:id", updateInquiryStatus);
router.delete("/:id", deleteInquiry);

export default router;
