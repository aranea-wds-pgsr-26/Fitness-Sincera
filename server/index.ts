import { createExpressApp, log } from "./app";

(async () => {
  const { httpServer } = await createExpressApp();
  const port = parseInt(process.env.PORT || "3000", 10);

  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
