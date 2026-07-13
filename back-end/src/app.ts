import express from "express";
import apiRouter from "./routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

// Middleware para rotas inexistentes
app.use(notFound);

// Middleware global de tratamento de erros (sempre por último)
app.use(errorHandler);

export default app;