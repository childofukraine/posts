import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./router/router";
import { errorHandler } from "./util/errorHandler";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`[server]: Server started at: http://localhost:${PORT}/`);
});
