import express from "express";

/* SERVICES */
import LoginSessionSvc from "../../services/login-session";
import UserSvc from "../../services/user";


/* UTILS & CONFIG */
import BaseError from "../../utils/error";

import { FRONTEND_URL, MICROSOFT_APP_ENDPOINT_AUTH } from "../../config";
import { LoginSession } from "@prisma/client";

export const corsMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const allowedOrigins = [
        FRONTEND_URL,
        "http://teezee.sg:3005",
        "https://eezee.sg",
        "https://eezee.dev",
        "https://eezee.co.id",
        "https://eezee.com.my"
    ];

    const origin = req.headers.origin as string;
    if (allowedOrigins.indexOf(origin) === -1) {
        return next();
    }

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-EEZEE-CSRF");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
};

export const csrfGuardMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const csrfToken = req.headers["x-eezee-csrf"];

    if (!csrfToken) {
        return next(
            new BaseError({
                description: "req.headers[\"X-EEZEE-CSRF\"] is required"
            })
        );
    }

    if (csrfToken !== "EEZEE") {
        return next(
            new BaseError({
                description: "Invalid Csrf Token"
            })
        );
    }

    next();

};

export const errorHandlerMiddleware = (err: Error | BaseError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof BaseError && err.data) {
        return res.status(500).json(err);
    }

    console.log(err);
    return res.status(500).send(err);
};

export const isAuthenticatedMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const user = req.user;

        if (!user) {
            const error = new BaseError({
                description: "User not authenticated",
                data:        {
                    redirectUrl: MICROSOFT_APP_ENDPOINT_AUTH
                }
            });

            return next(error);
        }

        next();

    } catch (e) {
        next(e);
    }

};

export const sessionMiddlewareV1 = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const sessionCookieName = LoginSessionSvc.getCookieName("v1");

    try {

        /* CHECK FOR SESSION ID EXISTENCE */
        const loginSessionId: LoginSession["id"] = req.signedCookies[sessionCookieName];
        if (!loginSessionId) {
            return next();
        }

        /* GET LOGIN SESSION */
        const _loginSession = await LoginSessionSvc.getById(loginSessionId);
        if (!_loginSession) {
            res.clearCookie(sessionCookieName);
            return next();
        }

        /* CHECK LOGIN SESSION EXPIRY */
        const _loginSessionSvc = new LoginSessionSvc(_loginSession);
        if (_loginSessionSvc.isExpired()) {
            res.clearCookie(sessionCookieName);
            return next();
        }

        /* RENEW SESSION EXPIRY DATE */
        await _loginSessionSvc.renewExpiryDate();

        /* GET USER */
        const _user = await UserSvc.getById(_loginSession.userId);
        if (!_user) {
            res.clearCookie(sessionCookieName);
            return next();
        }

        /* SET USER TO REQ */
        req.user = _user;

        return next();


    } catch (e) {
        res.clearCookie(sessionCookieName);
        return next(e);
    }

};
