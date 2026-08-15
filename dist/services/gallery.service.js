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
exports.deleteGalleryItem = exports.getAllGalleryItems = exports.createGalleryItem = exports.deleteImageFromCloudinary = exports.uploadImageToCloudinary = void 0;
const gallery_model_1 = __importDefault(require("../models/gallery.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// Reuse upload stream logic
const uploadImageToCloudinary = (fileBuffer, folder) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({ folder }, (error, result) => {
            if (error)
                return reject(error);
            if (result)
                return resolve(result.secure_url);
        });
        uploadStream.end(fileBuffer);
    });
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const deleteImageFromCloudinary = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regex = /\/v\d+\/(.+)\.\w+$/;
        const match = imageUrl.match(regex);
        if (match && match[1]) {
            const publicId = match[1];
            yield cloudinary_1.default.uploader.destroy(publicId);
        }
    }
    catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
    }
});
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
const createGalleryItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const item = new gallery_model_1.default(data);
    return yield item.save();
});
exports.createGalleryItem = createGalleryItem;
const getAllGalleryItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield gallery_model_1.default.find().sort({ createdAt: -1 });
});
exports.getAllGalleryItems = getAllGalleryItems;
const deleteGalleryItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield gallery_model_1.default.findById(id);
    if (!item)
        return null;
    if (item.image) {
        yield (0, exports.deleteImageFromCloudinary)(item.image);
    }
    return yield gallery_model_1.default.findByIdAndDelete(id);
});
exports.deleteGalleryItem = deleteGalleryItem;
