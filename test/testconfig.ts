require('dotenv').load();

export const testConfig : any = {
    API_ID: process.env.API_ID,
    API_PRIMARY_KEY: process.env.API_PRIMARY_KEY,
    API_SECONDARY_KEY: process.env.API_SECONDARY_KEY,
    TEST: process.env.TEST,
    PING_TOKEN: process.env.PING_TOKEN,
};