"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_1 = __importDefault(require("../env"));
cloudinary_1.v2.config({
    cloud_name: ((_a = env_1.default.CLOUDINARY_URL) === null || _a === void 0 ? void 0 : _a.split('@')[1]) || 'g23pybg8',
    api_key: ((_b = env_1.default.CLOUDINARY_URL) === null || _b === void 0 ? void 0 : _b.split('//')[1].split(':')[0]) || '832993746449484',
    api_secret: ((_c = env_1.default.CLOUDINARY_URL) === null || _c === void 0 ? void 0 : _c.split(':')[2].split('@')[0]) || '-ig35uY-J9JIwxbyDbU46UEueF0'
});
exports.default = cloudinary_1.v2;
