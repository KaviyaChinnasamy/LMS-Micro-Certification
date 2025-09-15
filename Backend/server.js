const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// --- Your routes here ---
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/result", require("./routes/result"));
app.use("/api/cert", require("./routes/certificate"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error", err));

// ✅ THIS LINE KEEPS SERVER RUNNING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on ${PORT}`);
});
