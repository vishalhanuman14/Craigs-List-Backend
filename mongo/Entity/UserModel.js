import { Schema, model } from 'mongoose';

const userSchema = new Schema({    
    nfthingId: String,
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    tokenId: Number,
    createdAt: Date,
    updatedAt: Date,
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = model('User', userSchema);
export default User;

