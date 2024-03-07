import { Request, Response } from "express";
import crypto from "node:crypto";
import UserModel from "../model/user-model";
import { validateUser, validatePartialUser } from "../validator/validatorUsers";

abstract class UserController {
  static getAllUsers = (req: Request, res: Response) => {
    //  const querys = req.query;

    const users = UserModel.getAllUsers();
    if (!users) return res.status(500).json({ error: "Server Error" });
    res.json(users);
  };

  static getUserById = (req: Request, res: Response) => {
    const { id } = req.params;
    const user = UserModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "Server Error" });
    res.json(user);
  };

static createUser = async (req: Request, res: Response) => {

  const responseValidator = validateUser(req.body);

  if (!responseValidator.success) {
    return res.status(400).send(responseValidator.error);
  }

   const { name, email } = req.body;

   const id = crypto.randomUUID();

   const newUser = {
     id,
     name,
     email,
   };

   try {
     const createdUser = UserModel.createUser(newUser);
     return res.json(createdUser);
   } catch (error) {
     console.error(error);
     return res.status(500).json({ error: "Error creating user in the database" });
   }
 };

 static updateUser = (req:Request, res: Response)=>{
    
  const responseValidator = validatePartialUser(req.body);

  if (!responseValidator.success) {
    return res.status(400).send(responseValidator.error);
  }

  const { id } = req.params;
  const { name, email}  = req.body;

  const objUser = { id, name, email};

  const response = UserModel.updateUser(objUser);

  if (!response.message) {
    res.status(400).json({ error: "Error to update Chart!" });
  }

  return res.json(response);

}

 static deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = UserModel.deleteUser(id);
  if (!response.message) {
    res.status(400).json({ error: "Error to delete user." });
  }

  return res.json(response);
};

}

export default UserController;
