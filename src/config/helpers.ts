export const handlePort = (nodePort: string | undefined) => {
  const port = Number(nodePort);

  if (port < 1 || port > 65535 || !Number.isInteger(port)) {
    throw new Error(
      `NODE_PORT must be an integer between 1 and 65535, got ${nodePort} instead.`,
    );
  }

  return port;
};

export const handleHost = (nodeHost: string | undefined) => {
  if (!nodeHost) {
    throw new Error(`NODE_HOST must be defined, got ${nodeHost} instead.`);
  }

  return nodeHost;
};

interface ConfigEnv {
  NODE_PORT?: string;
  NODE_HOST?: string;
}

export const handleEnv = (envObj: ConfigEnv) => {
  const port = handlePort(envObj.NODE_PORT);
  const host = handleHost(envObj.NODE_HOST);

  return { host, port } as const;
};
