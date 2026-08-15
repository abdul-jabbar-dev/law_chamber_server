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
exports.reorderTeamMembers = exports.deleteTeamMember = exports.updateTeamMember = exports.getTeamMember = exports.getAllTeamMembers = exports.createTeamMember = void 0;
const teamMemberService = __importStar(require("../services/teamMember.service"));
const createTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role, isKeyPartner } = req.body;
        if (!name || !role) {
            return res.status(400).json({ success: false, message: 'Name and role are required.' });
        }
        let imageUrl = '';
        if (req.file) {
            imageUrl = yield teamMemberService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/team');
        }
        else {
            return res.status(400).json({ success: false, message: 'Image is required for a team member.' });
        }
        const data = Object.assign(Object.assign({}, req.body), { isKeyPartner: isKeyPartner === 'true' || isKeyPartner === true, image: imageUrl });
        const newMember = yield teamMemberService.createTeamMember(data);
        res.status(201).json({ success: true, data: newMember });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.createTeamMember = createTeamMember;
const getAllTeamMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield teamMemberService.getAllTeamMembers();
        res.status(200).json({ success: true, data: members });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getAllTeamMembers = getAllTeamMembers;
const getTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const member = yield teamMemberService.getTeamMemberById(String(id));
        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, data: member });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getTeamMember = getTeamMember;
const updateTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let updateData = Object.assign({}, req.body);
        if (req.file) {
            const imageUrl = yield teamMemberService.uploadImageToCloudinary(req.file.buffer, 'law_chamber/team');
            updateData.image = imageUrl;
        }
        if (updateData.isKeyPartner !== undefined) {
            updateData.isKeyPartner = updateData.isKeyPartner === 'true' || updateData.isKeyPartner === true;
        }
        const updatedMember = yield teamMemberService.updateTeamMember(String(id), updateData);
        if (!updatedMember) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, data: updatedMember });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateTeamMember = updateTeamMember;
const deleteTeamMember = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield teamMemberService.deleteTeamMember(String(id));
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.status(200).json({ success: true, message: 'Team member deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deleteTeamMember = deleteTeamMember;
const reorderTeamMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updates } = req.body;
        if (!Array.isArray(updates)) {
            return res.status(400).json({ success: false, message: 'Updates must be an array' });
        }
        yield teamMemberService.updateTeamMemberOrder(updates);
        res.status(200).json({ success: true, message: 'Order updated successfully' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.reorderTeamMembers = reorderTeamMembers;
