import "dotenv/config";

const { NODE_HOST, NODE_PORT } = process.env;

const varToNumber = (port: string | undefined) => {
  if (typeof port === "undefined") {
    throw new Error(
      `NODE_PORT must be an integer, got ${typeof port} instead.`,
    );
  }

  return Number(port) || 8080;
};

const varToString = (host: string | undefined) => {
  if (typeof host === "undefined") {
    throw new Error(`NODE_HOST must be a string, got ${typeof host} instead.`);
  }

  return `${host}` || "0.0.0.0";
};

const config = {
  port: varToNumber(NODE_PORT),
  host: varToString(NODE_HOST),
};

Object.freeze(config);

export default config;
