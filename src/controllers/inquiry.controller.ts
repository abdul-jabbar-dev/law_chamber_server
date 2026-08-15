import { Request, Response } from "express";
import * as inquiryService from "../services/inquiry.service";

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await inquiryService.getInquiries();
    res.status(200).json({ success: true, data: inquiries });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (status !== "Pending" && status !== "Reviewed") {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }
    const inquiry = await inquiryService.updateInquiryStatus(req.params.id as string, status as "Pending" | "Reviewed");
    if (!inquiry) {
      return res.status(404).json({ success: false, error: "Inquiry not found" });
    }
    res.status(200).json({ success: true, data: inquiry });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await inquiryService.deleteInquiry(req.params.id as string);
    if (!inquiry) {
      return res.status(404).json({ success: false, error: "Inquiry not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
