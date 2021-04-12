const http = require('http');
const express = require('express');
const port = 3000;
const app = express();
const axios = require('axios');
const strapi = 'http://localhost:1337';
const token = '6db795f5-e703-42b9-84c0-d8b41ae7a5b8';

app.get('/check-if-user-exists', async (req, res) => {
  if (!req.query.email) return res.sendStatus(500);
  try {
    const response = await axios(`${strapi}/users?email=${req.query.email}`, {
      headers: {
        token: token,
      },
    });
    res.send(response.data && response.data.length > 0);
  } catch (error) {
    console.log(error.response.data);
    res.sendStatus(error.response.data.statusCode);
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
