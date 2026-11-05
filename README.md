# call-tracking-api

This is the call tracking api.

## Installation

Running locally, use `npm run dev` to start the app.

Docker, use `docker compose up --build`.

Required environment variables:

`NODE_HOST` ex `localhost`, `0.0.0.0`, etc...

`NODE_PORT` ex `8080`, `3001`, etc...

## Tests

Run `npm test` to run test and enter watch mode.

### Why Vitest

On why I chose Vitest as a test runner, it handles TypeScript out of the box with great documentation. This one is very TypeScript forward. Node's built in test runner was a candidate; however, it does not support TypeScript out of the box and needs a loader/build step for it. Moreover, Vitest has a very robust, Jest-like ecosystem. The tradeoff is overhead as Vitest must be maintained while node:test is zero-dependency and ultrafast because of it. This is fine. For the DX alone, Vitest was chosen as the test runner here.
