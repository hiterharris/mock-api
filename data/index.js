const sites = require("./sites.json");
const users = require("./users.json");

// const data = {
//   users: users,
//   sites: sites,
// };

const data = {
  users: {
    data: users,
    path: "/Users/henryharrisiv/Desktop/Projects/grapesjs/mock-api/data/users.json"
  },
  sites: {
    data: users,
    path: "/Users/henryharrisiv/Desktop/Projects/grapesjs/mock-api/data/sites.json"
  },
};

// const usersPath = "/Users/henryharrisiv/Desktop/Projects/grapesjs/mock-api/data/users.json";
// const sitesPath = "/Users/henryharrisiv/Desktop/Projects/grapesjs/mock-api/data/sites.json";

module.exports = data;
