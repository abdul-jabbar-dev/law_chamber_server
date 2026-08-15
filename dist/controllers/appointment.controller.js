"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointmentStatus = exports.getAppointments = exports.createAppointment = void 0;
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, phone, email, preferredDate, preferredTime, practiceArea, contactOption, notes } = req.body;
        if (!fullName || !phone || !contactOption) {
            return res.status(400).json({ success: false, message: 'Required fields are missing' });
        }
        const newAppointment = yield appointment_model_1.default.create({
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
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createAppointment = createAppointment;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_model_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: appointments });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAppointments = getAppointments;
const updateAppointmentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        if (status !== "Pending" && status !== "Reviewed") {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }
        const appointment = yield appointment_model_1.default.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        res.status(200).json({ success: true, data: appointment });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.updateAppointmentStatus = updateAppointmentStatus;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_model_1.default.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteAppointment = deleteAppointment;
