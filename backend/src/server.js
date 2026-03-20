import "./config/env.js";

import express from "express";
import cors from "cors";
import gcalendarApiRouter from "./controllers/gcalenderApiController.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/gcalendar", gcalendarApiRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
