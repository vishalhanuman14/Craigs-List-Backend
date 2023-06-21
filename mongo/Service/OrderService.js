import { makeWalletAddress } from "../../utils.js";
import Order from "../Entity/OrderModel.js";
import _ from "lodash";
import User from "../Entity/UserModel.js";

export const createNewOrder = async (body) => {
  const {
    userNfthingId,
    serviceProviderId,
    typeOfService,
    scheduledDate,
    price,
    paymentMethod,
    tokenId,
  } = body;

  const order = new Order({
    orderNfthingId: makeWalletAddress(),
    userNfthingId: userNfthingId,
    serviceProviderId: serviceProviderId,
    typeOfService: typeOfService,
    scheduledDate: scheduledDate,
    price: price,
    paymentMethod: paymentMethod
  });

  await order.save();
  return order.orderNfthingId
};

export const updateOrderById = async (body) => {
  const { updateObj, updateOrderId } = body;
  try {
    let order = await Order.exists({ orderNfthingId: updateOrderId });
    if (order === null) {
      throw new Error("Order not found");
    }
    await Order.updateOne({ orderNfthingId: updateOrderId }, { $set: updateObj });
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

export const deleteOrderById = async (id) => {
        
};

export const getOrderById = async (id) => {
  const order = await Order.findOne(
    { orderNfthingId: id },
    "orderNfthingId userNfthingId serviceProviderId typeOfService scheduledDate price paymentMethod status tokenId"
  ).exec();
  return order;
};

export const getOrderByUserId = async (userId) => {
  const user = await User.exists({nfthingId: userId});
  if(user === null){
    throw new Error("USER_NOT_FOUND");
  }
  const orders = await Order.find(
    { userNfthingId: userId },
    "orderNfthingId userNfthingId serviceProviderId typeOfService scheduledDate price paymentMethod status tokenId"
  ).exec();
  return orders;
};

export const getOrderByServiceProviderId = async (serviceProviderId) => {
  const orders = await Order.find(
    { serviceProviderId: serviceProviderId },
    "orderNfthingId userNfthingId serviceProviderId typeOfService scheduledDate price paymentMethod status tokenId"
  ).exec();
  return orders;
};