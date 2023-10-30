
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/get-response', async (req, res) => {
  try {
    const { category, keyword } = req.body;
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: `Act as you are expert in ${category} generator, generate a ${category} about ${keyword}`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response)

    const result = response.data.choices[0].text.trim();
    res.json({ result });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

