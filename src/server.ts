import Fastify from "fastify";

const server = Fastify({
  logger: true,
});

// placeholder route
server.get("/", async (req, res) => {
  res.send({
    salutation: "hello",
  });
});

// start server
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
