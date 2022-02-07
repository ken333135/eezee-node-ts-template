import "./env-setup";
import { setupDbConnection, setupSystemDefaults } from "./db";
import { setupHttpServer } from "./http-server";

(async () => {

    /**
     * Setup Db
     */
    await setupDbConnection();
    await setupSystemDefaults();


    /**
     * Setup Http Server
     */
    await setupHttpServer();

})();
