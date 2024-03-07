import dbUsers from "../database/users.json";
import fs from "node:fs";

abstract class UserModel {
  static getAllUsers = () => {
    const users = dbUsers.users;
    return users;
  };

  static getUserById = (id: string) => {
    const user = dbUsers.users.find((user: any) => user.id === id);
    return user;
  };

  static createUser = (newUser: any) => {
    dbUsers.users.push(newUser);
    try {
      fs.writeFileSync("./src/database/users.json", JSON.stringify(dbUsers));
    } catch (error) {
      return new Error();
    }
    return newUser;
  };

  static updateUser= (objUser: any) => {
    const { id, name, email} = objUser;

    const user = dbUsers.users.find((user) => user.id === id)
  

    if (!user) {
      return { error: "User not found!!" };
    }

    if (name) user.name = name;
    if (email) user.email = email;
    

    try {
      fs.writeFileSync("./src/database/users.json", JSON.stringify(dbUsers));
    } catch (error) {
      return new Error();
    }
    return { message: "Successfully modified User!" };
  }; 

  static deleteUser = (id: string) => {
    const indexUser =  dbUsers.users.findIndex((user) => user.id === id);

    if (indexUser === -1) return { error: "User not found!" };

    dbUsers.users.splice(indexUser, 1);

    try {
      fs.writeFileSync("./src/database/users.json", JSON.stringify(dbUsers));
    } catch (error) {
      return new Error();
    }
    return { message: "Successfully deleted user!" };
  };
}

export default UserModel;
