import { Request, Response, Router } from "express";
import { accounts } from "../../../data/accounts";

const accountRoutes = Router();

const accountsArray = accounts;

interface Account {
  id: number;
  username: string;
  funds: number;
}

accountRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).json(accountsArray);
});

accountRoutes.post("/", (req: Request, res: Response) => {
  const newAccount: Account = req.body;
  newAccount.id = Date.now();
  newAccount.funds = 0;
  accountsArray.push(newAccount);
  res.status(201).json(newAccount);
});

accountRoutes.delete("/:id", (req: Request, res: Response) => {
  const accountId = req.params.id;

  const index = accountsArray.findIndex(
    (account) => account.id === parseInt(accountId.toString())
  );
  if (index !== -1) {
    const deletedAccount = accountsArray.splice(index, 1)[0];
    res.status(200).json(deletedAccount);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
});

accountRoutes.put("/:id", (req: Request, res: Response) => {
  const accountId = req.params.id;
  const updatedData = req.body;

  const account = accountsArray.find(
    (acc) => acc.id === parseInt(accountId.toString())
  );

  //   console.log(updatedData);

  if (account) {
    account.username = updatedData.username ?? account.username;
    account.funds = updatedData.funds ?? account.funds;

    res.status(200).json(account);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
});

accountRoutes.get("/:username", (req: Request, res: Response) => {
  const username = req.params.username;

  const account = accountsArray.find((acc) => acc.username === username);
  if (account) {
    if (req.query.currency === "usd") {
      const usdFunds = account.funds * 0.27;
      return res.status(200).json({ ...account, funds: usdFunds });
    }
    res.status(200).json(account);
  } else {
    res.status(404).json({ message: "Account not found" });
  }
});

export { accountRoutes };
