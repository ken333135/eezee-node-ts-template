/* STANDARD NODE MODULES */
import express from "express";

/* ROUTES */

/* MIDDLEWARE */
import { csrfGuardMiddleware, isAuthenticatedMiddleware } from "./middleware";

/**
 * PUBLIC APIS
 */
const publicApis = express.Router();

/**
 * PRIVATE APIS
 */
const privateApis = express.Router();

/**
 * COMBINE PUBLIC & PRIVATE APIS
 */
const router = express.Router();
router.use("/", publicApis);
router.use("/", csrfGuardMiddleware, isAuthenticatedMiddleware, privateApis);


// router.use("/", csrfGuardMiddleware, privateApis);

export default router;
