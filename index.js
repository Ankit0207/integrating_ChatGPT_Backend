const express = require('express');
const cors = require('cors');
const { OpenAIApi, CreateCompletionRequest } = require('openai'); // Updated import

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAIApi({ key: process.env.OPENAI_API_KEY }); // Updated API initialization

app.post('/generate_content', async (req, res) => {
  // Get the user's input from the request
  const { keyword, category } = req.body;
  console.log(keyword, category);

  // Use GPT-3 to generate a response
  if (!keyword) {
    return res.status(400).json({ error: "keyword is missing" });
  } else if (!category) {
    return res.status(400).json({ error: "category is missing" });
  } else {
    let prompt = `act as you are an expert in ${category} telling, Generate a ${category} about ${keyword}.`;
    
    const completionRequest = new CreateCompletionRequest({ // Updated request creation
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const chatCompletion = await openai.createCompletion(completionRequest); // Updated API method

    res.send({ "msg": chatCompletion.choices[0].message.content });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
