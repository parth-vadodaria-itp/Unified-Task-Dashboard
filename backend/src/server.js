import "./config/env.js";

import express from "express";
import cors from "cors";
import gcalendarApiRouter from "./controllers/gcalenderApiController.js";
import session from "express-session";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URI,
        credentials: true,
    })
);
app.use(express.json());

app.set("trust proxy", 1);
app.use(
    session({
        name: "calendar_session",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        },
    })
);

app.use("/gcalendar", gcalendarApiRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
