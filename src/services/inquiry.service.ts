import Inquiry from "../models/inquiry.model";
import { IInquiry } from "../interfaces/inquiry.interface";

export const createInquiry = async (data: Partial<IInquiry>): Promise<IInquiry> => {
  const inquiry = new Inquiry(data);
  return await inquiry.save();
};

export const getInquiries = async (): Promise<IInquiry[]> => {
  return await Inquiry.find().sort({ createdAt: -1 });
};

export const updateInquiryStatus = async (id: string, status: "Pending" | "Reviewed"): Promise<IInquiry | null> => {
  return await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteInquiry = async (id: string): Promise<IInquiry | null> => {
  return await Inquiry.findByIdAndDelete(id);
};
