"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadInlineImage = exports.deleteBlog = exports.updateBlog = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = void 0;
const blogService = __importStar(require("../services/blog.service"));
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogData = Object.assign({}, req.body);
        // Parse JSON strings back to arrays if sent as FormData
        if (typeof blogData.takeaways === 'string') {
            try {
                blogData.takeaways = JSON.parse(blogData.takeaways);
            }
            catch (e) {
                blogData.takeaways = [blogData.takeaways];
            }
        }
        // Convert string 'true'/'false' to boolean for featured
        if (typeof blogData.featured === 'string') {
            blogData.featured = blogData.featured === 'true';
        }
        if (req.file) {
            const imageUrl = yield blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/blogs');
            blogData.image = imageUrl;
        }
        else if (!blogData.image) {
            return res.status(400).json({ success: false, message: 'Image is required for the blog.' });
        }
        const newBlog = yield blogService.createBlog(blogData);
        res.status(201).json({ success: true, data: newBlog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createBlog = createBlog;
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogService.getAllBlogs();
        res.status(200).json({ success: true, data: blogs });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
        const blog = yield blogService.getBlogBySlug(slug);
        if (!blog)
            return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, data: blog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getBlogBySlug = getBlogBySlug;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateData = Object.assign({}, req.body);
        if (typeof updateData.takeaways === 'string') {
            try {
                updateData.takeaways = JSON.parse(updateData.takeaways);
            }
            catch (e) {
                updateData.takeaways = [updateData.takeaways];
            }
        }
        if (typeof updateData.featured === 'string') {
            updateData.featured = updateData.featured === 'true';
        }
        if (req.file) {
            const imageUrl = yield blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/blogs');
            updateData.image = imageUrl;
        }
        const updatedBlog = yield blogService.updateBlogBySlug(req.params.slug, updateData);
        if (!updatedBlog)
            return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, data: updatedBlog });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBlog = yield blogService.deleteBlogBySlug(req.params.slug);
        if (!deletedBlog)
            return res.status(404).json({ success: false, message: 'Blog not found' });
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteBlog = deleteBlog;
// Dedicated endpoint for Rich Text Editor inline image uploads
const uploadInlineImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image provided' });
        }
        const imageUrl = yield blogService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/inline_images');
        res.status(200).json({ success: true, url: imageUrl });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.uploadInlineImage = uploadInlineImage;
