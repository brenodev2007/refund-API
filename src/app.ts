import express, { json } from "express";

const app = express();

app.use(express.json());

export { app };
