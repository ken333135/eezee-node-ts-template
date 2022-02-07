import {
    CronJob
} from "cron";

import prisma from "../db";

export default (): void => {

    let i = 0;

    new CronJob(

        // "0 */6 * * *",
        "*/5 * * * * *",
        async () => {

            console.log("RUNNING CRON JOB", i);

            i++;

            /* FETCH CONTENTS FROM EEZEE MAIN SERVER'S API ENDPOINT */

            /* SAVE TO DB */

            // await prisma.testHuiJie.create({
            //     data: {
            //         i: `${i}`
            //     }
            // });

            // const _testHuiJies = await prisma.testHuiJie.findMany({
            // });

            // console.log(JSON.stringify(_testHuiJies, null, 2));
            // console.log("CRON JOB DONE");

        },
        null,
        true,
        "Asia/Singapore"
    );

};