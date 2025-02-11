const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'OMG JACK IS SOOOOO COOL AND FUNNY!!!!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});