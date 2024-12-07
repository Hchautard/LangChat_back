import express, { json } from 'express';
import cors from 'cors';
import { CohereClientV2 } from 'cohere-ai';
const app = express();

app.use(json());

// No cors needed
app.use(cors());

const COHERE_API_KEY = "j6Evj0Huzg5AIEhqFsZAgkmwmurdG6jsbDoYDor5"

const cohere = new CohereClientV2({
    token: COHERE_API_KEY,
  });

app.get('/', async (req, res) => {

    try {

        const msg = await cohere.chat({
            model: "command-r-plus",
            messages: [{ role: "user", content: "Hello, Cohere !" }],
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
