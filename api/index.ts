import app from "../back-end/src/app";

// Vercel invokes this same modular API used by the persistent Node server.
export default function handler(req: any, res: any) {
  return app(req, res);
}
