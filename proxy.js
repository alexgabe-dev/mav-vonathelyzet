const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // vagy 'https://vonat.pry.hu' ha csak magadnak akarod
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/trains.json', async (req, res) => {
  try {
    const response = await fetch('https://b.vonatterkep.hu/trains.json');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 