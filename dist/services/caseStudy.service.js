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
exports.updateCaseStudyOrder = exports.deleteCaseStudy = exports.updateCaseStudy = exports.getCaseStudyBySlug = exports.getAllCaseStudies = exports.createCaseStudy = exports.uploadImageToCloudinary = void 0;
const caseStudy_model_1 = __importDefault(require("../models/caseStudy.model"));
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
const createCaseStudy = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const caseStudy = new caseStudy_model_1.default(data);
    return yield caseStudy.save();
});
exports.createCaseStudy = createCaseStudy;
const getAllCaseStudies = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield caseStudy_model_1.default.find().sort({ order: 1, createdAt: -1 });
});
exports.getAllCaseStudies = getAllCaseStudies;
const getCaseStudyBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield caseStudy_model_1.default.findOne({ slug });
});
exports.getCaseStudyBySlug = getCaseStudyBySlug;
const updateCaseStudy = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield caseStudy_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateCaseStudy = updateCaseStudy;
const deleteCaseStudy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield caseStudy_model_1.default.findByIdAndDelete(id);
});
exports.deleteCaseStudy = deleteCaseStudy;
const updateCaseStudyOrder = (updates) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = updates.map(update => ({
        updateOne: {
            filter: { _id: update.id },
            update: { $set: { order: update.order } }
        }
    }));
    return yield caseStudy_model_1.default.bulkWrite(operations);
});
exports.updateCaseStudyOrder = updateCaseStudyOrder;
