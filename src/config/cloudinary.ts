import { v2 as cloudinary } from 'cloudinary';
import env from '../env';



cloudinary.config({
  cloud_name: env.CLOUDINARY_URL?.split('@')[1] || 'g23pybg8',
  api_key: env.CLOUDINARY_URL?.split('//')[1].split(':')[0] || '832993746449484',
  api_secret: env.CLOUDINARY_URL?.split(':')[2].split('@')[0] || '-ig35uY-J9JIwxbyDbU46UEueF0'
});


export default cloudinary;
