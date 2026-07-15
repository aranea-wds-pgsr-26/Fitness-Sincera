import { createExpressApp } from "../server/app";

const appPromise = createExpressApp({ clientMode: "none" }).then(({ app }) => app);

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  return app(req, res);
}
