const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const { generateSongInfo } = require('./openai');

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'OMG JACK IS SOOOOO COOL AND FUNNY!!!!' });
});

// new endpoint for ChatGPT
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  
  const result = await generateSongInfo(prompt);
  res.json(result); // return JSON response
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});