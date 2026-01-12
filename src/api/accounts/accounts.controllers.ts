import { Request, Response } from "express";
import { accounts } from "../../../data/accounts";
import Account from "../../models/Account";

export const getAllAccounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Account.find().select("-createdAt -updatedAt");
    res.status(200).json(allAccounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching accounts", error });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const newAccount = new Account(req.body);
    newAccount.funds = 0;
    const savedAccount = await newAccount.save();
    res.status(201).json(savedAccount);
  } catch (error) {
    res.status(500).json({ message: "Error creating account", error });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const accountId = req.params.id;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    await account.deleteOne();
    res.status(204).json(account);
  } catch (error) {
    res.status(500).json({ message: "Error deleting account", error });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const updatedData = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(204).json({ message: "Account not found" });
    }

    const updatedAccount = await account.updateOne(updatedData);

    res.status(204).json(updatedAccount);
  } catch (error) {
    res.status(404).json({ message: "Error updating account", error });
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  const username = req.params.username.toString().trim();

  // console.log(Account.findOne({ username: username }));

  try {
    const account = await Account.findOne({
      username: new RegExp(`^${username}$`, "i"),
    })
      .select("-createdAt -updatedAt")
      .lean();

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (req.query.currency === "usd") {
      const usdFunds = account.funds * 0.27;
      return res.status(200).json({ ...account, funds: usdFunds });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Error fetching account", error });
  }
};

export const getVipAccounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Account.find().select("-createdAt -updatedAt");
    const vipAccounts = allAccounts.filter(
      (account) => account.funds >= Number(req.query.amount)
    );
    res.status(200).json(vipAccounts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching VIP accounts", error });
  }
};
