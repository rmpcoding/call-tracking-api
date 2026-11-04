import { handleEnv } from "./helpers.ts";

const config = handleEnv(process.env);

Object.freeze(config);

export default config;
