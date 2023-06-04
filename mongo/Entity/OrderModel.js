import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    orderNfthingId: { 
        type:  String,
        required: true 
    },
    userNfthingId: { 
        type: String, 
        required: true,
    },
    serviceProviderId: { 
        type: String,
        required: true,
    },
    typeOfService: String,
    scheduledDate: Date,
    Price: Number,
    PaymentMethod: {
        type: String,
        default: "Cash"
    },
    status: {
        type: String,
        default: "Initialized",
        required: true,
    },
    tokenId : {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false
    } 
}, { timestamps: true });

const Order = model('Order', orderSchema);
export default Order;