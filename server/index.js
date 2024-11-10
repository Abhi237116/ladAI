import express from 'express';
import { join } from 'path';
import prodia from '@api/prodia';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Serve static files from the Vite build directory
app.use(express.static(join(__dirname, '../client/dist')));

// Catch all route to serve the index.html file
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

app.post('/api/img2img', (req, res) => {
    let text = req.body.prompt || 'a rainy evening in the city';
    let image = req.body.image;
    let job;
    console.log('Transforming image with prompt:', text);
    prodia.transform({ prompt: text, imageData: image })
        .then(({ data }) => job = data.job)
        .catch(err => {
            res.status(500).json({ error: err.message, reason: "Enqueue" })
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
                }
                else if (data.status === 'failed') {
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

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});