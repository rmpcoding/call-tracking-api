import "dotenv/config";

const {
  NODE_HOST_LOCAL,
  NODE_HOST_DEV,
  NODE_HOST_PROD,
  NODE_PORT_LOCAL,
  NODE_PORT_DEV,
  NODE_PORT_PROD,
} = process.env;

const handlePort = () => {
  const nodePort = NODE_PORT_PROD
    ? NODE_PORT_PROD
    : NODE_PORT_DEV
      ? NODE_PORT_DEV
      : NODE_PORT_LOCAL;

  const port = Number(nodePort);

  if (port < 1 || port > 65535 || !nodePort) {
    throw new Error(
      `NODE_PORT must be an integer between 0 and 65535, got ${port} instead.`,
    );
  }

  return port;
};

const handleHost = () => {
  const nodeHost = NODE_HOST_PROD
    ? NODE_HOST_PROD
    : NODE_HOST_DEV
      ? NODE_HOST_DEV
      : NODE_HOST_LOCAL;

  if (!nodeHost) {
    throw new Error(`NODE_HOST must be a string, got ${nodeHost} instead.`);
  }

  return `${nodeHost}`;
};

const config = {
  port: handlePort(),
  host: handleHost(),
} as const;

Object.freeze(config);

export default config;
