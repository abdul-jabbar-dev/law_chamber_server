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
exports.updateTeamMemberOrder = exports.deleteTeamMember = exports.updateTeamMember = exports.getTeamMemberById = exports.getAllTeamMembers = exports.createTeamMember = exports.uploadImageToCloudinary = void 0;
const teamMember_model_1 = __importDefault(require("../models/teamMember.model"));
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
const createTeamMember = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const member = new teamMember_model_1.default(data);
    return yield member.save();
});
exports.createTeamMember = createTeamMember;
const getAllTeamMembers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMember_model_1.default.find().sort({ order: 1, createdAt: -1 });
});
exports.getAllTeamMembers = getAllTeamMembers;
const getTeamMemberById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMember_model_1.default.findById(id);
});
exports.getTeamMemberById = getTeamMemberById;
const updateTeamMember = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMember_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
});
exports.updateTeamMember = updateTeamMember;
const deleteTeamMember = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield teamMember_model_1.default.findByIdAndDelete(id);
});
exports.deleteTeamMember = deleteTeamMember;
const updateTeamMemberOrder = (updates) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = updates.map(update => ({
        updateOne: {
            filter: { _id: update.id },
            update: { $set: { order: update.order } }
        }
    }));
    return yield teamMember_model_1.default.bulkWrite(operations);
});
exports.updateTeamMemberOrder = updateTeamMemberOrder;
