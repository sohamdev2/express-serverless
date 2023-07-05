// temp json db
const fs = require("fs");
const path = require("path");
const jsonPath = path.join(__dirname, "db.json");

try {
  if (!fs.existsSync(jsonPath)) writeJson([]);
} catch (e) {}

function readJson() {
  try {
    return JSON.parse(fs.readFileSync(jsonPath));
  } catch (e) {
    return [];
  }
}

function writeJson(json) {
  fs.writeFileSync(jsonPath, JSON.stringify(json));
}

module.exports = {
  getUsers: () => Promise.resolve(readJson()),
  addUser: async (name) => {
    const users = readJson();
    if (users.find((e) => e.name === name)) throw new Error("User exists!");
    const user = { name };
    users.push(user);
    writeJson(users);
    return user;
  },
  deleteUser: async (name) => {
    let users = readJson();
    if (!users.find((e) => e.name === name)) throw new Error("User not found!");
    users = users.filter((e) => e.name !== name);
    writeJson(users);
  },
};
