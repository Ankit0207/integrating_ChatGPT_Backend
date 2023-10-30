require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/get-response', async (req, res) => {
  const { category, keyword } = req.body;


  if (!keyword) {
    return res.status(400).json({ error: "keyword is missing" });
  } else if (!category) {
    return res.status(400).json({ error: "category is missing" });
  } else {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: `Act as you are expert in ${category} generator.` },
        { role: "user", content: `Generate a ${category} about ${keyword}.` },
      ],
      model: "gpt-3.5-turbo",
    });

    return res.status(200).send({ response: response.choices[0].message.content });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});