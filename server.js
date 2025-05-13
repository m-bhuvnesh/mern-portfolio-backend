const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin:", origin); // Logs the frontend origin
      const allowedOrigins = ["http://localhost:5173", "https://bhuvneshdev.netlify.app"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true,
  })
);


app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Server is live!");
});
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
