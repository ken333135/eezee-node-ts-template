let APP_ENV: "PRODUCTION" | "STAGING" | "" = "",
    FRONTEND_URL: string,
    EEZEE_API_URL: string,
    EEZEE_API_KEY: string,
    MICROSOFT_APP_ENDPOINT_AUTH: string,
    MICROSOFT_APP_ENDPOINT_LOGOUT: string,
    MICROSOFT_APP_ENDPOINT_TOKEN: string,
    MICROSOFT_APP_CLIENT_ID: string,
    MICROSOFT_APP_DIRECTORY_ID: string,
    MICROSOFT_APP_CLIENT_SECRET: string,
    MICROSOFT_APP_REDIRECT_URL: string;

if (process.env.APP_ENV) {
    APP_ENV = process.env.APP_ENV.toUpperCase() as "PRODUCTION" | "STAGING";
}

switch (APP_ENV) {

case "PRODUCTION":

    /* FRONTEND */
    FRONTEND_URL = "https://pim.eezee.co";

    /* EEZEE */
    EEZEE_API_URL = "https://api.eezee.sg";
    EEZEE_API_KEY = "31c54684-cf70-4f93-80bf-d524eff263ba";

    /* MICROSOFT */
    MICROSOFT_APP_CLIENT_ID = "d1c5536d-2c89-4598-9e5e-4fe0bfd3ec08";
    MICROSOFT_APP_DIRECTORY_ID = "848fb22b-e1b1-4b2f-a820-c38ea45a3ee4";
    MICROSOFT_APP_CLIENT_SECRET = "LGB7Q~iu5wE1PUaeJNsmNr1Td4RK4Y~Ix9B-O";

    MICROSOFT_APP_REDIRECT_URL = "https://apiseller.eezee.co/api/v1/microsoft-oauth/validate";

    MICROSOFT_APP_ENDPOINT_TOKEN = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/token`;
    MICROSOFT_APP_ENDPOINT_AUTH = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/authorize?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code&redirect_uri=${MICROSOFT_APP_REDIRECT_URL}`;
    MICROSOFT_APP_ENDPOINT_LOGOUT = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/logout?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code`;

    break;

case "STAGING":

    /* FRONTEND */
    FRONTEND_URL = "https://pim.eezee.dev";

    /* EEZEE */
    EEZEE_API_URL = "https://api.eezee.dev";
    EEZEE_API_KEY = "850a85df-16e6-4da4-84bd-1a8b1019b9d9";

    /* MICROSOFT */
    MICROSOFT_APP_CLIENT_ID = "b93c8ec4-5c57-46ae-b48e-51593ceb4894";
    MICROSOFT_APP_DIRECTORY_ID = "848fb22b-e1b1-4b2f-a820-c38ea45a3ee4";
    MICROSOFT_APP_CLIENT_SECRET = "xfs7Q~~Ok49BKbwHk6Oo3vR3VyzaSBLloIxqv";

    MICROSOFT_APP_REDIRECT_URL = "https://apiseller.eezee.dev/api/v1/microsoft-oauth/validate";
    
    MICROSOFT_APP_ENDPOINT_TOKEN = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/token`;
    MICROSOFT_APP_ENDPOINT_AUTH = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/authorize?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code&redirect_uri=${MICROSOFT_APP_REDIRECT_URL}`;
    MICROSOFT_APP_ENDPOINT_LOGOUT = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/logout?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code`;

    break;

default:

    /* FRONTEND */
    FRONTEND_URL = "http://localhost:3000";

    /* EEZEE */
    EEZEE_API_URL = "https://api.eezee.dev";
    EEZEE_API_KEY = "850a85df-16e6-4da4-84bd-1a8b1019b9d9";    

    /* MICROSOFT */
    MICROSOFT_APP_CLIENT_ID = "b93c8ec4-5c57-46ae-b48e-51593ceb4894";
    MICROSOFT_APP_DIRECTORY_ID = "848fb22b-e1b1-4b2f-a820-c38ea45a3ee4";
    MICROSOFT_APP_CLIENT_SECRET = "xfs7Q~~Ok49BKbwHk6Oo3vR3VyzaSBLloIxqv";

    MICROSOFT_APP_REDIRECT_URL = "http://localhost:8080/api/v1/microsoft-oauth/validate";
    
    MICROSOFT_APP_ENDPOINT_TOKEN = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/token`;
    MICROSOFT_APP_ENDPOINT_AUTH = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/authorize?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code&redirect_uri=${MICROSOFT_APP_REDIRECT_URL}`;
    MICROSOFT_APP_ENDPOINT_LOGOUT = `https://login.microsoftonline.com/${MICROSOFT_APP_DIRECTORY_ID}/oauth2/v2.0/logout?client_id=${MICROSOFT_APP_CLIENT_ID}&scope=User.Read&response_type=code`;
    
    break;

}

export {
    APP_ENV,
    EEZEE_API_KEY,
    EEZEE_API_URL,
    FRONTEND_URL,
    MICROSOFT_APP_CLIENT_ID,
    MICROSOFT_APP_CLIENT_SECRET,
    MICROSOFT_APP_ENDPOINT_AUTH,
    MICROSOFT_APP_ENDPOINT_LOGOUT,
    MICROSOFT_APP_ENDPOINT_TOKEN,
    MICROSOFT_APP_REDIRECT_URL
};