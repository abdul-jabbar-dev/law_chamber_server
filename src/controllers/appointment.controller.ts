import { Request, Response } from "express";
import Appointment from "../models/appointment.model";

export const createAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullName, phone, email, preferredDate, preferredTime, practiceArea, contactOption, notes } = req.body;
    
    if (!fullName || !phone || !contactOption) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    const newAppointment = await Appointment.create({
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      practiceArea,
      contactOption,
      notes
    });

    res.status(201).json({ success: true, data: newAppointment, message: 'Appointment created successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAppointments = async (req: Request, res: Response): Promise<any> => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: appointments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { status } = req.body;
    if (status !== "Pending" && status !== "Reviewed") {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAppointment = async (req: Request, res: Response): Promise<any> => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
