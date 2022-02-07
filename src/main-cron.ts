import "./env-setup";
import syncEezeeCategories from "./cron-jobs/sync-eezee-categories";

// import cronJobExample from "./cron-jobs/cron-jobs-example";

// cronJobExample();

const setupCronJobs = async (): Promise<void> => {

    console.log("SETTING UP CRON JOBS");
    syncEezeeCategories();

};

setupCronJobs();