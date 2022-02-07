import dotenv from "dotenv";

/* GET CORRECT DOTENV_PATH BASED ON NODE_ENV */
let DOTENV_PATH: ".env" | ".env.development" = ".env.development";
if ( (process.env.NODE_ENV?.toLowerCase()) === "production") {
    DOTENV_PATH = ".env";
}

dotenv.config({
    path: DOTENV_PATH,
});