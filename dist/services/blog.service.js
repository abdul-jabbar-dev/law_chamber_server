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
exports.deleteBlogBySlug = exports.updateBlogBySlug = exports.deleteImageFromCloudinary = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = exports.uploadImageToCloudinary = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
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
const createBlog = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = new blog_model_1.default(blogData);
    return yield blog.save();
});
exports.createBlog = createBlog;
const getAllBlogs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.find().sort({ createdAt: -1 });
});
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_model_1.default.findOne({ slug });
});
exports.getBlogBySlug = getBlogBySlug;
const deleteImageFromCloudinary = (imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Cloudinary URLs: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/filename.png
        // We want to extract 'folder/filename'
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
const updateBlogBySlug = (slug, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOne({ slug });
    if (!blog)
        return null;
    // If a new image is being uploaded, delete the old one from Cloudinary
    if (updateData.image && blog.image && updateData.image !== blog.image) {
        yield (0, exports.deleteImageFromCloudinary)(blog.image);
    }
    Object.assign(blog, updateData);
    return yield blog.save();
});
exports.updateBlogBySlug = updateBlogBySlug;
const deleteBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.default.findOne({ slug });
    if (!blog)
        return null;
    if (blog.image) {
        yield (0, exports.deleteImageFromCloudinary)(blog.image);
    }
    // Note: If you also want to parse `blog.contentHtml` to find inline images and delete them, 
    // you can do it here, but typically deleting the cover image is the primary concern.
    return yield blog_model_1.default.findOneAndDelete({ slug });
});
exports.deleteBlogBySlug = deleteBlogBySlug;
