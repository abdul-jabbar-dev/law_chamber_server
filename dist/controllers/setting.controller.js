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
exports.updateSettings = exports.getSettings = void 0;
const setting_model_1 = __importDefault(require("../models/setting.model"));
const getSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let settings = yield setting_model_1.default.findOne();
        if (!settings) {
            settings = yield setting_model_1.default.create({});
        }
        res.status(200).json({ success: true, data: settings });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getSettings = getSettings;
const updateSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { socialLinks, officeInfo, chamberInfo, timeSlots } = req.body;
        let settings = yield setting_model_1.default.findOne();
        if (settings) {
            settings.socialLinks = socialLinks || settings.socialLinks;
            settings.officeInfo = officeInfo || settings.officeInfo;
            settings.chamberInfo = chamberInfo || settings.chamberInfo;
            settings.timeSlots = timeSlots || settings.timeSlots;
            yield settings.save();
        }
        else {
            settings = yield setting_model_1.default.create({ socialLinks, officeInfo, chamberInfo, timeSlots });
        }
        res.status(200).json({ success: true, data: settings, message: 'Settings updated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateSettings = updateSettings;
