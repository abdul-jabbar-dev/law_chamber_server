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
exports.deleteInquiry = exports.updateInquiryStatus = exports.getInquiries = exports.createInquiry = void 0;
const inquiry_model_1 = __importDefault(require("../models/inquiry.model"));
const createInquiry = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const inquiry = new inquiry_model_1.default(data);
    return yield inquiry.save();
});
exports.createInquiry = createInquiry;
const getInquiries = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield inquiry_model_1.default.find().sort({ createdAt: -1 });
});
exports.getInquiries = getInquiries;
const updateInquiryStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inquiry_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
});
exports.updateInquiryStatus = updateInquiryStatus;
const deleteInquiry = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield inquiry_model_1.default.findByIdAndDelete(id);
});
exports.deleteInquiry = deleteInquiry;
