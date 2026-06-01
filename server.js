const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { z, success } = require('zod');

const app = express();

app.use(express.json());
app.use(cors());

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log('Connection error: ', err);
  }
}

connectDb();

const MessageSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  message: String,
  query: String,
  consent: String,
});

const Message = mongoose.model('Message', MessageSchema);

const messageSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  query: z.string(),
  consent: z.string(),
});

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: result.error.issues,
      });
    }

    res.body = result.data;
    next();
  };
}

app.get('/', (req, res) => {
  res.send('Hello there, this is server');
});

app.post('/contact_messages', validate(messageSchema), async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);

    res.status(201).json({
      success: true,
      message: 'New message added',
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
});

app.get('/contact_messages', async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json({
      success: true,
      message: 'All messages',
      data: allMessages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
