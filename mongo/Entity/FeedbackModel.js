import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  nfthingUserId: {
    type: String,
    required: true
  },
  serviceProviderNfthingId: {
    type: String,
    required: true,
  },
  orderNfthingId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false
  },
}, { timestamps: true });

const Feedback = model('Feedback', feedbackSchema);
export default Feedback;