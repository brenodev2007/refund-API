import express, { json } from "express";
import cors from "cors";
import { errorHandling } from "./middlewares/errorHandling";
import { routes } from "./routes";

const app = express();
app.use(cors());
app.use(routes);
app.use(errorHandling);
app.use(express.json());

export { app };
