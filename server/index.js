import express from 'express';
import { join } from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, '../client/dist')));
app.use(cors()); // Enable CORS

// Connect to MongoDB (using Atlas URI as an example)
const mongoURI = 'mongodb+srv://abhir7116:Master.12345@cluster0.s18tc.mongodb.net/LADAI';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// MongoDB Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', ContactSchema);

// Register API
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists!' });

    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ success: true, message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login API
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User does not exist!' });

    if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

    // Here you would usually generate a token (JWT), but we'll just return user info for simplicity.
    res.json({ success: true, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact Us API
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Contact information saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting contact information' });
    console.error(err);
  }
});

// Image Generation Routes
import prodia from '@api/prodia';
prodia.auth('009f6d76-fa52-4c23-b785-a93b6654e31d');

app.get('/api/generate-image', (req, res) => {
  const text = req.query.prompt || 'a rainy evening in the city';
  let job;
  console.log('Generating image with prompt:', text);
  prodia.generate({ prompt: text })
    .then(({ data }) => job = data.job)
    .catch(err => res.status(500).json({ error: err.message, reason: "Enqueue" }));

  const checkJobStatus = setInterval(() => {
    prodia.getJob({ jobId: job })
      .then(({ data }) => {
        if (data.status === 'succeeded') {
          clearInterval(checkJobStatus);
          res.json({ imageUrl: data.imageUrl });
        }
      })
      .catch(err => {
        clearInterval(checkJobStatus);
        res.status(500).json({ error: err.message });
      });
  }, 5000);

  res.on('close', () => {
    clearInterval(checkJobStatus);
  });
});

// Image Transformation (img2img)
app.post('/api/img2img', (req, res) => {
  let text = req.body.prompt || 'a rainy evening in the city';
  let image = req.body.image;
  let job;
  console.log('Transforming image with prompt:', text);
  prodia.transform({ prompt: text, imageData: image })
    .then(({ data }) => job = data.job)
    .catch(err => {
      res.status(500).json({ error: err.message, reason: "Enqueue" });
      console.error(err.message);
      console.error(image);
      console.error(text);
    });

  const checkJobStatus = setInterval(() => {
    prodia.getJob({ jobId: job })
      .then(({ data }) => {
        if (data.status === 'succeeded') {
          clearInterval(checkJobStatus);
          res.json({ imageUrl: data.imageUrl });
        } else if (data.status === 'failed') {
          clearInterval(checkJobStatus);
          console.error(data);
          console.error(image.substring(0, 100));
          console.error(image.substring(image.length - 100));
          res.status(500).json({ error: "Job failed" });
        }
      })
      .catch(err => {
        clearInterval(checkJobStatus);
        res.status(500).json({ error: err.message });
      });
  }, 5000);

  res.on('close', () => {
    clearInterval(checkJobStatus);
  });
});

// Catch all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
