import { client } from "../database/client";
import {
  usersTableQuery,
  postsTableQuery,
  commentsTableQuery,
  likesTableQuery,
} from "../database/schema";

client.connect(() => {
  client.query(usersTableQuery, (err, _res) => {
    if (err) throw err;
    console.log("Таблица users создана (если не существует)");
  });

  client.query(postsTableQuery, (err, _res) => {
    if (err) throw err;
    console.log("Таблица posts создана (если не существует)");
  });

  client.query(commentsTableQuery, (err, _res) => {
    if (err) throw err;
    console.log("Таблица comments создана (если не существует)");
  });

  client.query(likesTableQuery, (err, _res) => {
    if (err) throw err;
    console.log("Таблица likes создана (если не существует)");
    client.end();
  });
});
