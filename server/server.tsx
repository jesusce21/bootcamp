import { initProviders } from "./container";

const port = parseInt(process.env.PORT!, 10) || 3000;

(async () => {
  const { server, nextServer, logger } = await initProviders();
  await nextServer.prepare();

  console.log(server);
  console.log()

  logger.info(
    `> Server listening at http://localhost:${port} as ${process.env.NODE_ENV}`,
  );
  server.listen(port);

})();
