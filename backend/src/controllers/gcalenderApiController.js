import { Router } from "express";
import {
    authCallback,
    authenticate,
    events,
} from "../services/googleApiService.js";

const gcalendarApiRouter = Router();

gcalendarApiRouter.get("/auth/google", authenticate);
gcalendarApiRouter.get("/auth/google/callback", authCallback);
gcalendarApiRouter.get("/events", events);

export default gcalendarApiRouter;
