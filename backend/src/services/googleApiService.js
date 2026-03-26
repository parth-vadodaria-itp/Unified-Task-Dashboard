import { google } from "googleapis";
import { retrieveDecryptedToken, storeEncryptedToken } from "./tokenService.js";
import jwt from "jsonwebtoken";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const authenticate = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: !req.session.user ? "consent" : undefined,
        scope: ["openid", "https://www.googleapis.com/auth/calendar.readonly"],
    });
    res.redirect(url);
};

const authCallback = async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        const decodedIdToken = jwt.decode(tokens.id_token);
        if (tokens.refresh_token)
            storeEncryptedToken(decodedIdToken.sub, {
                refresh_token: tokens.refresh_token,
            });
        req.session.user = { sub: decodedIdToken.sub };
        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Session save error");
            }

            res.redirect(FRONTEND_URI);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Auth Error");
    }
};

const events = async (req, res) => {
    try {
        if (!req.session.user) {
            res.status(401).json("User not authenticated!");
        } else {
            const sub = req.session.user.sub;
            const refreshToken = retrieveDecryptedToken(sub);
            oauth2Client.setCredentials(refreshToken);
            const calendar = google.calendar({
                version: "v3",
                auth: oauth2Client,
            });

            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);

            const response = await calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                timeMax: nextWeek.toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime",
            });
            const events = response.data.items.map((event) => {
                return {
                    title: event.summary,
                    start: event.start,
                    end: event.end,
                    link: event.htmlLink,
                };
            });

            res.json(events);
        }
    } catch (err) {
        console.error("Error fetching events: ", err);
        res.status(500).send("Error fetching events");
    }
};

export { authenticate, authCallback, events };
