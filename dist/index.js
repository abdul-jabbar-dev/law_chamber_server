"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const blog_route_1 = __importDefault(require("./routes/blog.route"));
const gallery_routes_1 = __importDefault(require("./routes/gallery.routes"));
const caseStudy_routes_1 = __importDefault(require("./routes/caseStudy.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const teamMember_routes_1 = __importDefault(require("./routes/teamMember.routes"));
const inquiry_routes_1 = __importDefault(require("./routes/inquiry.routes"));
const testimonial_routes_1 = __importDefault(require("./routes/testimonial.routes"));
const setting_routes_1 = __importDefault(require("./routes/setting.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const env_1 = __importDefault(require("./env"));
const app = (0, express_1.default)();
const PORT = env_1.default.PORT;
// Middleware 
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
const MONGODB_URI = env_1.default.MONGODB_URI;
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Successfully connected to MongoDB.');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
// API Routes
app.use('/api/blogs', blog_route_1.default);
app.use('/api/gallery', gallery_routes_1.default);
app.use('/api/case-studies', caseStudy_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
app.use('/api/team-members', teamMember_routes_1.default);
app.use('/api/inquiries', inquiry_routes_1.default);
app.use('/api/testimonials', testimonial_routes_1.default);
app.use('/api/settings', setting_routes_1.default);
app.use('/api/appointments', appointment_routes_1.default);
// Health check Route
app.get('/', (req, res) => {
    res.send('Server is running and MVC architecture is active!');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
