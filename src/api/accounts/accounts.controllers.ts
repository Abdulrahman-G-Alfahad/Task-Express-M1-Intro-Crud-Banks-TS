import { Request, Response } from "express";
import { accounts } from "../../../data/accounts";

export const getAllAccounts = (req: Request, res: Response) => {
  res.status(200).json(accounts);
};

export const createAccount = (req: Request, res: Response) => {
  const newAccount = req.body;
  newAccount.id = Date.now();
  newAccount.funds = 0;
  accounts.push(newAccount);
  res.status(201).json(newAccount);
};

export const deleteAccount = (req: Request, res: Response) => {
  const accountId = req.params.id;

  const index = accounts.findIndex(
    (account) => account.id === parseInt(accountId.toString())
  );
  if (index !== -1) {
    const deletedAccount = accounts.splice(index, 1)[0];
    res.status(200).json(deletedAccount);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

export const updateAccount = (req: Request, res: Response) => {
  const accountId = req.params.id;
  const updatedData = req.body;

  const account = accounts.find(
    (acc) => acc.id === parseInt(accountId.toString())
  );

  if (account) {
    account.username = updatedData.username ?? account.username;
    account.funds = updatedData.funds ?? account.funds;

    res.status(200).json(account);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

export const getAccountByUsername = (req: Request, res: Response) => {
  const username = req.params.username;

  const account = accounts.find((acc) => acc.username === username);

  if (account) {
    if (req.query.currency === "usd") {
      const usdFunds = account.funds * 0.27;
      return res.status(200).json({ ...account, funds: usdFunds });
    }
    res.status(200).json(account);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};
