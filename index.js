import express, { json } from 'express';
import cors from 'cors';
import { CohereClientV2 } from 'cohere-ai';
import 'dotenv/config';
const app = express();

app.use(json());

// No cors needed
app.use(cors());

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY
  });

app.post('/api', async (req, res) => {
    console.log( req.body.text, req.body.language);
    try {

        const msg = await cohere.chat({
            model: "command-r-plus",
            messages: [
                { role: "user", content: req.body.text },
                { role: "system", content: req.body.language },
                { role: "assistant", content: "Help Improve Language Speaking"},
            ],
          });

        res.json({ msg });

    } catch (error) {
        console.error(error);
        res.json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
