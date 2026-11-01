import "dotenv/config";

const { NODE_HOST, NODE_PORT } = process.env;

const handlePort = () => {
  const port = Number(NODE_PORT);

  if (port < 1 || port > 65535 || !port) {
    throw new Error(
      `NODE_PORT must be an integer between 1 and 65535, got ${NODE_PORT} instead.`,
    );
  }

  return port;
};

const handleHost = () => {
  if (!NODE_HOST) {
    throw new Error(`NODE_HOST must be a string, got ${NODE_HOST} instead.`);
  }

  return NODE_HOST;
};

const config = {
  port: handlePort(),
  host: handleHost(),
} as const;

Object.freeze(config);

export default config;
