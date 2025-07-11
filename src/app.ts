import express, { json } from "express";
import cors from "cors";
import { errorHandling } from "./middlewares/errorHandling";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandling);
export { app };
