import express from "express";
import cookieParser from "cookie-parser";

import {
    corsMiddleware,
    errorHandlerMiddleware,
    sessionMiddlewareV1
} from "./routes/v1/middleware";

import routesV1 from "./routes/v1/index";

const app = express();
const port = process.env.PORT || 8080;

export const setupHttpServer = async (): Promise<void> => {
    return new Promise((resolve) => {

        console.log("[HTTP-SERVER] Started Setup");

        console.log("[HTTP-SERVER] Setting up cookie-parser");
        app.use(cookieParser([ "2d208cbb-a1e3-46df-a71d-40803876b756" ]));

        console.log("[HTTP-SERVER] Setting up CORS Middleware");
        app.use(corsMiddleware);

        console.log("[HTTP-SERVER] Setting up Session Middleware v1");
        app.use(sessionMiddlewareV1);

        console.log("[HTTP-SERVER] Setting up JSON parser");
        app.use(express.json());

        console.log("[HTTP-SERVER] Setting up application/x-www-form-urlencoded parser");
        app.use(express.urlencoded({
            extended: true
        }));

        console.log("[HTTP-SERVER] Setting up Routes v1");

        app.use("/api/v1", routesV1);

        console.log("[HTTP-SERVER] Setting up Error Handler");
        app.use(errorHandlerMiddleware);

        console.log("[HTTP-SERVER] Setting Up Port Listening");
        app.listen(port, () => {
            console.log(`[HTTP-SERVER] HTTP Server listening on ${port}`);
            resolve();
        });

    });
};

export default app;