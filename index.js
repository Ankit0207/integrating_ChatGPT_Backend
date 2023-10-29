const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

const OpenAI = require('openai');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ key: apiKey });

app.post('/', async (req, res) => {
  // Get the user's input from the request
  const userInput = req.body.input;
  const type = req.body.type;
  
  // Use GPT-3 to generate a response
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: `You are a ${type} generator.` },
      { role: "user", content: `Generate a ${type} about ${userInput}.` },
    ],
    model: "gpt-3.5-turbo",
  });
  
  res.send({ response: response.choices[0].message.content });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});