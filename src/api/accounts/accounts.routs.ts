import { Request, Response, Router } from "express";
import { accounts } from "../../../data/accounts";
import {
  getAllAccounts,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByUsername,
  getVipAccounts,
} from "./accounts.controllers";

const accountRoutes = Router();

accountRoutes.get("/", getAllAccounts);

accountRoutes.post("/", createAccount);

accountRoutes.get("/vip", getVipAccounts);

accountRoutes.delete("/:id", deleteAccount);

accountRoutes.put("/:id", updateAccount);

accountRoutes.get("/:username", getAccountByUsername);

export { accountRoutes };
