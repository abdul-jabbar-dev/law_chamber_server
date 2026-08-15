import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  socialLinks: {
    facebook: string;
    x: string;
    linkedin: string;
  };
  officeInfo: {
    email: string;
    phoneNumber: string;
    telephoneNumber: string;
    whatsappNumber: string;
    chamberLocation: string;
  };

  chamberInfo: {
    lawyerName: string;
    lawyerTitle: string;
    firmName: string;
    chamberHours: string;
    mapEmbedUrl: string;
    mapNavigationUrl: string;
  };
  timeSlots: string[];
}

const SettingSchema: Schema = new Schema({
  socialLinks: {
    facebook: { type: String, default: '' },
    x: { type: String, default: '' },
    linkedin: { type: String, default: '' }
  },
  officeInfo: {
    email: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    telephoneNumber: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },
    chamberLocation: { type: String, default: '' }
  },

  chamberInfo: {
    lawyerName: { type: String, default: '' },
    lawyerTitle: { type: String, default: '' },
    firmName: { type: String, default: '' },
    chamberHours: { type: String, default: '' },
    mapEmbedUrl: { type: String, default: '' },
    mapNavigationUrl: { type: String, default: '' }
  },
  timeSlots: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model<ISetting>('Setting', SettingSchema);
