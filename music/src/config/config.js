import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
};

export default Object.freeze(_config);
