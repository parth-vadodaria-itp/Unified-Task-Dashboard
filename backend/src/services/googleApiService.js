import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

let refreshToken = null;

const authenticate = (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: refreshToken == null ? "consent" : undefined,
        scope: ["https://www.googleapis.com/auth/calendar.events.readonly"],
    });
    res.redirect(url);
};

const authCallback = async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code);
        refreshToken = tokens;
        res.redirect(FRONTEND_URI); // React route
    } catch (err) {
        console.error(err);
        res.status(500).send("Auth Error");
    }
};

const events = async (req, res) => {
    try {
        if (refreshToken == null) {
            res.status(401).json("User not authenticated!");
        } else {
            oauth2Client.setCredentials(refreshToken);
            const calendar = google.calendar({
                version: "v3",
                auth: oauth2Client,
            });
            const response = await calendar.events.list({
                calendarId: "primary",
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime",
            });

            res.json(response.data.items);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching events");
    }
};

export { authenticate, authCallback, events };
