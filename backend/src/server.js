const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const challengeRoutes = require("./routes/challengeRoutes");
app.use("/api", challengeRoutes);

const calendarRoutes = require("./routes/calendarRoutes");
app.use("/api", calendarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});