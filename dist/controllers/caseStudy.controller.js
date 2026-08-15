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
exports.reorderCaseStudies = exports.updateCaseStudy = exports.deleteCaseStudy = exports.getCaseStudyBySlug = exports.getAllCaseStudies = exports.createCaseStudy = void 0;
const caseStudyService = __importStar(require("../services/caseStudy.service"));
const createCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, clientName, practiceArea, challenge, solution, result, featured } = req.body;
        if (!title || !practiceArea || !challenge || !solution || !result) {
            return res.status(400).json({ success: false, message: 'All required fields must be provided.' });
        }
        let imageUrl = '';
        if (req.file) {
            imageUrl = yield caseStudyService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/case_studies');
        }
        else {
            return res.status(400).json({ success: false, message: 'Image is required for a case study.' });
        }
        const newCaseStudy = yield caseStudyService.createCaseStudy({
            title,
            clientName,
            practiceArea,
            challenge,
            solution,
            result,
            featured: featured === 'true' || featured === true,
            image: imageUrl
        });
        res.status(201).json({ success: true, data: newCaseStudy });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createCaseStudy = createCaseStudy;
const getAllCaseStudies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const caseStudies = yield caseStudyService.getAllCaseStudies();
        res.status(200).json({ success: true, data: caseStudies });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAllCaseStudies = getAllCaseStudies;
const getCaseStudyBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const caseStudy = yield caseStudyService.getCaseStudyBySlug(slug);
        if (!caseStudy) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.status(200).json({ success: true, data: caseStudy });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getCaseStudyBySlug = getCaseStudyBySlug;
const deleteCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedItem = yield caseStudyService.deleteCaseStudy(id);
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.status(200).json({ success: true, message: 'Case study deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteCaseStudy = deleteCaseStudy;
const updateCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let updateData = Object.assign({}, req.body);
        // Handle image update if present
        if (req.file) {
            const imageUrl = yield caseStudyService.uploadImageToCloudinary(req.file.buffer, 'case-studies');
            updateData.image = imageUrl;
        }
        if (updateData.featured === 'true' || updateData.featured === true) {
            updateData.featured = true;
        }
        else {
            updateData.featured = false;
        }
        const updatedCaseStudy = yield caseStudyService.updateCaseStudy(id, updateData);
        if (!updatedCaseStudy) {
            return res.status(404).json({ success: false, message: 'Case study not found' });
        }
        res.status(200).json({ success: true, data: updatedCaseStudy });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateCaseStudy = updateCaseStudy;
const reorderCaseStudies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updates } = req.body; // Expects an array of { id, order }
        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: 'Updates must be an array' });
        }
        yield caseStudyService.updateCaseStudyOrder(updates);
        res.status(200).json({ success: true, message: 'Case studies reordered successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.reorderCaseStudies = reorderCaseStudies;
