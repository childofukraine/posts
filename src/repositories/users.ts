import { pool } from "../database/client";

export class UsersRepo {
  static addUser = async (username: string, password: string) => {
    try {
      const insertUserQuery = `
            INSERT INTO users (name,password)
            VALUES ($1, $2)
        `;
      const insertUserValue = [username, password];
      pool.query(insertUserQuery, insertUserValue, (err, _res) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  static deleteUser = async (username: string) => {
    try {
      const deleteUserQuery = `
        DELETE FROM users
        WHERE name = $1;
      `;
      const deleteUserValue = [username];
      await pool.query(deleteUserQuery, deleteUserValue);
      return { success: true, message: "User deleted" };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error deleting user" };
    }
  };

  static findUser = async (username: string) => {
    try {
      const findUserQuery = `
            SELECT * FROM users WHERE name = $1
        `;
      const findUserValues = [username];
      const { rows: user } = await pool.query(findUserQuery, findUserValues);
      return user;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  static findUserByNameAndPassword = async (
    username: string,
    password: string
  ) => {
    try {
      const findUserQuery = `
            SELECT * FROM users WHERE name = $1 and password = $2
        `;
      const findUserValues = [username, password];
      const { rows: user } = await pool.query(findUserQuery, findUserValues);
      return user;
    } catch (err) {
      console.log(err);
      return [];
    }
  };
}
