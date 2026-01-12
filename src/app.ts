import express, { Request, Response, Router } from "express";
import { accountRoutes } from "./api/accounts/accounts.routs";

const app = express();

app.use(express.json());
app.use("/api/accounts", accountRoutes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
