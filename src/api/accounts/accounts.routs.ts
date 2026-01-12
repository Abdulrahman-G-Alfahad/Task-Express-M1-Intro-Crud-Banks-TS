import { Request, Response, Router } from "express";
import { accounts } from "../../../data/accounts";
import {
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByUsername,
} from "./accounts.controllers";

const accountRoutes = Router();

const accountsArray = accounts;

interface Account {
  id: number;
  username: string;
  funds: number;
}

accountRoutes.get("/", getAllAccounts);

accountRoutes.post("/", createAccount);

accountRoutes.delete("/:id", deleteAccount);

accountRoutes.put("/:id", updateAccount);

accountRoutes.get("/:username", getAccountByUsername);

export { accountRoutes };
