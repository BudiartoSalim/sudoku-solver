const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const router = require('./routes/index.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)

app.listen(PORT, () => {
  console.log(`App at http://localhost:${PORT}`)
})