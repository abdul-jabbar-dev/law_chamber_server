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
exports.updateProfile = exports.getProfile = void 0;
const profileService = __importStar(require("../services/profile.service"));
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield profileService.getProfile();
        // If no profile found, return a default one
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        res.status(200).json({ success: true, data: profile });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateData = Object.assign({}, req.body);
        // Parse JSON strings back to arrays/objects if they come from formData
        if (updateData.keyExpertise && typeof updateData.keyExpertise === 'string') {
            updateData.keyExpertise = JSON.parse(updateData.keyExpertise);
        }
        if (updateData.keyAchievements && typeof updateData.keyAchievements === 'string') {
            updateData.keyAchievements = JSON.parse(updateData.keyAchievements);
        }
        if (updateData.qualifications && typeof updateData.qualifications === 'string') {
            updateData.qualifications = JSON.parse(updateData.qualifications);
        }
        if (updateData.services && typeof updateData.services === 'string') {
            updateData.services = JSON.parse(updateData.services);
        }
        if (updateData.chamberInfo && typeof updateData.chamberInfo === 'string') {
            updateData.chamberInfo = JSON.parse(updateData.chamberInfo);
        }
        // Handle image update if present
        if (req.file) {
            const imageUrl = yield profileService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/profile');
            updateData.image = imageUrl;
        }
        const updatedProfile = yield profileService.updateProfile(updateData);
        res.status(200).json({ success: true, data: updatedProfile });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateProfile = updateProfile;
