import express from 'express';
import { join } from 'path';
import prodia from '@api/prodia';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the Vite build directory
app.use(express.static(join(__dirname, '../client/dist')));

// Catch all route to serve the index.html file
prodia.auth('009f6d76-fa52-4c23-b785-a93b6654e31d');
app.get('/generate-image', (req, res) => {
    const text = req.query.prompt || 'a rainy evening in the city';
    let job;
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

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/index.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});