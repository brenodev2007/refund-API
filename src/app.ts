import express, { json } from "express";
import cors from "cors";
import { errorHandling } from "./middlewares/errorHandling";

const app = express();
app.use(cors());
app.use(errorHandling);
app.use(express.json());

export { app };
