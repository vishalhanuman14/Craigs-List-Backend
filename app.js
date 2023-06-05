import express from 'express';
import { API_PREFIX } from './constants.js';
import mongoose from 'mongoose';
import { createNewUser, getUserById, updateUserById } from './mongo/Service/UserService.js';
import _ from 'lodash';
import {
  createNewOrder,
  getOrderById,
  getOrderByServiceProviderId,
  getOrderByUserId,
  updateOrderById,
} from "./mongo/Service/OrderService.js";
import {
  createFeedback,
  getFeedbackByOrderId,
  getFeedbacksByServiceProviderId,
  getFeedbacksByUserId,
} from "./mongo/Service/FeedbackService.js";

const app = express();
app.use(express.json());

app.get(API_PREFIX, (req, res) => {
  res.send("craig's");
});

app.get(API_PREFIX + "/user", async (req, res) => {
  res.send(await getUserById(req.query.id));
});

app.post(API_PREFIX + "/user", async (req, res) => {
  createNewUser(req.body).catch((e) => console.log(e));
  res.send("Created!").status(201);
});

app.put(API_PREFIX + "/user", async (req, res) => {
  try {
    console.log(req.body)
    await updateUserById(req.body);
    res.status(204);
  } catch (error) {
    res.status(404);
    res.send(_.get(error, "message"));
  }
});

app.post(API_PREFIX + "/orders", async (req, res) => {
  try {
    const { body } = req;
    await createNewOrder(body);
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create the order" });
  }
});

app.put(API_PREFIX + "/orders", async (req, res) => {
  try {
    await updateOrderById(req.body);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the order" });
  }
});

app.get(API_PREFIX + "/orders", async (req, res) => {
  try {
    const orderId = req.query;
    const order = await getOrderById(orderId);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get order" });
  }
});

app.get(API_PREFIX + "/users/orders", async (req, res) => {
  try {
    const userId = req.query;
    const orders = await getOrderByUserId(userId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get orders" });
  }
});

app.get(API_PREFIX + "/serviceproviders/orders", async (req, res) => {
  try {
    const serviceProviderId = req.query;
    const orders = await getOrderByServiceProviderId(serviceProviderId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get orders" });
  }
});

app.post(API_PREFIX +'/feedbacks', async (req, res) => {
  try {
    await createFeedback(req.body);
    res.status(201).json({ message: 'Feedback created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// Get all feedbacks by service provider ID
app.get(API_PREFIX +'/serviceproviders/feedbacks', async (req, res) => {
  try {
    const { serviceProviderId } = req.query;
    const feedbacks = await getFeedbacksByServiceProviderId(serviceProviderId);
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get feedbacks' });
  }
});

app.get(API_PREFIX + '/order/feedbacks', async(req, res) => {
  try {
    const { orderId } = req.query;
    const feedbacks = await getFeedbackByOrderId(orderId);
    res.json(feedbacks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error : "Failed to get feedbacks" });
  }
})

// Get all feedbacks by user ID
app.get(API_PREFIX +'/users/feedbacks', async (req, res) => {
  try {
    const { userId } = req.query;
    const feedbacks = await getFeedbacksByUserId(userId);
    res.json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get feedbacks' });
  }
});

// Get a feedback by ID
app.get(API_PREFIX +'/feedbacks', async (req, res) => {
  try {
    const { feedbackId } = req.query;
    const feedback = await getFeedbackById(feedbackId);
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get feedback' });
  }
});

// Update a feedback by ID
app.put(API_PREFIX +'/feedbacks', async (req, res) => {
  try {
    const { rating, comment, feedbackId } = req.body;
    await updateFeedbackById(feedbackId, { rating, comment });
    res.json({ message: 'Feedback updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
});

app.listen(3001, () => {
  console.log("Booting on 3001");
  mongoose.connect("mongodb://127.0.0.1:27017").catch((e) => {
    console.log(e);
  });
});