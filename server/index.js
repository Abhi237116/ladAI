import express from 'express';
import { join } from 'path';
import prodia from '@api/prodia';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(join(__dirname, '../client/dist')));

function pollJob(job, resolve, reject) {
    prodia.getJob({ jobId: job })
        .then(({ data }) => {
            if (data.status === 'succeeded') {
                resolve(data);
            } else if (data.status === 'failed') {
                reject(data);
            } else {
                setTimeout(() => pollJob(job, resolve, reject), 5000);
            }
        })
        .catch(err => reject(err));
}

function handleJob(job, res) {
    console.log(job);
    new Promise((resolve, reject) => {
        pollJob(job, resolve, reject);
    })
        .then(data => res.json({ imageUrl: data.imageUrl }))
        .catch(err => res.status(500).json({ error: err.message, reason: "Polling" }));
}

prodia.auth('009f6d76-fa52-4c23-b785-a93b6654e31d');
app.get('/api/generate-image', (req, res) => {
    const text = req.query.prompt || 'a rainy evening in the city';
    console.log('Generating image with prompt:', text);
    prodia.generate({ prompt: text })
        .then(({ data }) => handleJob(data.job, res))
        .catch(err => res.status(500).json({ error: err.message, reason: "Enqueue" }));
});

app.post('/api/img2img', (req, res) => {
    let text = req.body.prompt || 'a rainy evening in the city';
    let image = req.body.image;
    console.log('Transforming image with prompt:', text);
    prodia.transform({ prompt: text, imageData: image })
        .then(({ data }) => handleJob(data.job, res))
        .catch(err => res.status(500).json({ error: err.message, reason: "Enqueue" })
        );
});

app.post('/api/upscale', (req, res) => {
    let image = req.body.image;
    console.log('Upscaling image');
    prodia.upscale({ resize: 2, model: 'ESRGAN_4x', imageData: image })
        .then(({ data }) => handleJob(data.job, res))
        .catch(err => res.status(500).json({ error: err.message, reason: "Enqueue" }));
})

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});