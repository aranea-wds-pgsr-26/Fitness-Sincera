import express from "express";
import apiRouter from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { requestId } from "./middleware/requestId";

const app = express();

app.disable("x-powered-by");
app.use(requestId);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

// Middleware para rotas inexistentes
app.use(notFound);

// Middleware global de tratamento de erros (sempre por último)
app.use(errorHandler);

export default app;
