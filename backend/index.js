const connectToMongo = require("./db");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Connect to MongoDB
connectToMongo();

const port = process.env.PORT || 8000;

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/note', require('./routes/note'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
