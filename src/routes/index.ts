import type { FastifyInstance, FastifyPluginOptions } from "fastify";

const routes = (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get("/", (request, reply) => {
    return {
      salutations: "hello",
    };
  });
};

export default routes;
