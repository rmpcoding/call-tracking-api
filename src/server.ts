import Fastify, { type FastifyInstance } from "fastify";
import "dotenv/config";

import routes from "./routes/index.ts";

const { NODE_HOST, NODE_PORT } = process.env;

const server: FastifyInstance = Fastify({
  logger: true,
});

/*
Loading order of plugins 
    └── plugins (from the Fastify ecosystem)
    └── your plugins (your custom plugins)
    └── decorators
    └── hooks
    └── your services
https://fastify.dev/docs/latest/Guides/Getting-Started/#loading-order-of-your-plugins
*/

server.register(routes);

console.log(`${NODE_HOST}`, Number(NODE_PORT));

// start server
server.listen(
  { port: Number(NODE_PORT), host: `${NODE_HOST}` },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
