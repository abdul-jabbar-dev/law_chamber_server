import { Router } from "express";
import { createAppointment, getAppointments, updateAppointmentStatus, deleteAppointment } from "../controllers/appointment.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id", updateAppointmentStatus);
router.delete("/:id", deleteAppointment);

export default router;
