const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// Routes
const contactRoute = require('./routes/contact');
app.use('/api/contact', contactRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
