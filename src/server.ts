import Fastify, { type FastifyInstance } from "fastify";

import routes from "./routes/index.ts";

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

// start server
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
