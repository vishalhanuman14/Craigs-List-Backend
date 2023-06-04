import Feedback from "../Entity/FeedbackModel.js";
import Order from "../Entity/OrderModel.js";
import User from "../Entity/UserModel.js";

export const createFeedback = async (body) => {
  const { nfthingUserId, serviceProviderNfthingId, rating, comment } = body;

  const feedback = new Feedback({
    nfthingUserId,
    serviceProviderNfthingId,
    orderNfthingId,
    rating,
    comment
  });

  await feedback.save();
};

export const getFeedbacksByServiceProviderId = async (serviceProviderId) => {
  const feedbacks = await Feedback.find({ serviceProviderNfthingId: serviceProviderId }).exec();
  return feedbacks;
};

export const getFeedbackByOrderId = async(orderId) => {
    const order = Order.exists({orderNfthingId: orderId});
    if(order === null){
      throw new Error("ORDER_NOT_FOUND");
    }
    const feedbacks = await Feedback.find({orderNfthingId: orderId}).exec();
    return feedbacks;
}

export const getFeedbacksByUserId = async (userId) => {
  const user = User.exists({nfthingId: userId});
  if(user === null){
    throw new Error("USER_NOT_FOUND");
  }
  const feedbacks = await Feedback.find({ nfthingUserId: userId }).exec();
  return feedbacks;
};

export const getFeedbackById = async (id) => {
  const feedback = await Feedback.findById(id).exec();
  return feedback;
};

export const updateFeedbackById = async (id, body) => {
  const { rating, comment } = body;

  const updateObj = {
    rating,
    comment,
    updatedAt: new Date()
  };

  await Feedback.findByIdAndUpdate(id, updateObj).exec();
};
