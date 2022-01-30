import dotenv from "dotenv";

dotenv.config();

import { routes } from "server/graphql/routes";
import postgraphile from "server/graphql/postgraphile";
import { app } from "app";

app.use(postgraphile);

routes.forEach(({ path, routers }) => {
  routers.forEach((router) => {
    app.use(path, router);
  });
});

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  const address = server.address();
  if (address && typeof address !== "string") {
    const href = `http://localhost:${address.port}/graphiql`;
    console.log(`PostGraphiQL available at ${href} 🚀`);
  } else {
    console.log(`PostGraphile listening on ${address} 🚀`);
  }
});
