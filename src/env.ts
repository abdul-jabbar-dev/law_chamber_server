import dotenv from 'dotenv';
dotenv.config();

const env: { MONGODB_URI: string, MONGODB_USERNAME: string, MONGODB_PASSWORD: string, CLOUDINARY_URL: string, PORT: number } = {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://advocarebureau_db_user:2dmN676riltwag4i@cluster0.udrwtvo.mongodb.net",
    MONGODB_USERNAME: process.env.MONGODB_USERNAME || "advocarebureau_db_user",
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || "2dmN676riltwag4i",
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || "cloudinary://832993746449484:-ig35uY-J9JIwxbyDbU46UEueF0@g23pybg8",
    PORT: Number(process.env.PORT) || 5000,

}
export default env
 