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
exports.deleteTestimonial = exports.getTestimonials = exports.createTestimonial = exports.uploadImageToCloudinary = void 0;
const testimonial_model_1 = __importDefault(require("../models/testimonial.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const uploadImageToCloudinary = (fileBuffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                return reject(error);
            if (result)
                resolve(result.secure_url);
        });
        uploadStream.end(fileBuffer);
    });
};
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const createTestimonial = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield testimonial_model_1.default.create(data);
});
exports.createTestimonial = createTestimonial;
const getTestimonials = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield testimonial_model_1.default.find().sort({ createdAt: -1 });
});
exports.getTestimonials = getTestimonials;
const deleteTestimonial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield testimonial_model_1.default.findByIdAndDelete(id);
});
exports.deleteTestimonial = deleteTestimonial;
