import { CronJob } from "cron";

import ItemCategorySvc from "../services/item-category";
import ItemCategoryInMarketplaceSvc from "../services/item-category-in-marketplace";

export default (): void => {

    new CronJob(

        // "0 */6 * * *",
        "0 1 * * *",
        async () => {

            try {

                await ItemCategorySvc.syncDataWithEezee();
                await ItemCategoryInMarketplaceSvc.syncDataWithEezee();

            } catch (e) {
                console.log(e);
            }

        },
        null,
        true,
        "Asia/Singapore"
    );

};