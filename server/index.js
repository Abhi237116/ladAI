import express from 'express';
import { join } from 'path';
import cors from 'cors';
import { User, Contact } from './database.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, '../client/dist')));
app.use(cors()); // Enable CORS


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

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User does not exist!' });

    if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ success: true, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/contact', async (req, res) => {
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

import prodia from '@api/prodia';
prodia.auth('009f6d76-fa52-4c23-b785-a93b6654e31d');

function pollJob(data, res) {
  let job = data.job;
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
}

app.get('/api/generate-image', (req, res) => {
  const text = req.query.prompt || 'a rainy evening in the city';
  console.log('Generating image with prompt:', text);
  prodia.generate({ prompt: text })
    .then(({ data }) => pollJob(data, res))
    .catch(err => res.status(500).json({ error: err.message, reason: "Enqueue" }));

});

app.post('/api/img2img', (req, res) => {
  let text = req.body.prompt || 'a rainy evening in the city';
  let image = req.body.image;
  console.log('Transforming image with prompt:', text);
  prodia.transform({ prompt: text, imageData: image })
    .then(({ data }) => pollJob(data, res))
    .catch(err => {
      res.status(500).json({ error: err.message, reason: "Enqueue" });
    });
});

app.post('/api/upscale', (req, res) => {
  let image = req.body.image;
  console.log("Upscaling image");
  prodia.upscale({ resize: 2, model: 'ESRGAN_4x', imageData: image })
    .then(({ data }) => pollJob(data, res))
    .catch(err => {
      res.status(500).json({ error: err.message, reason: "Enqueue" });
    });
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
