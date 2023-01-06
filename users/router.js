const router = require("express").Router();
var fs = require("fs");
const data = require("../data");

const read = () => {
  let json = fs.readFileSync(data.users.path);
  readData = JSON.parse(json);
  return readData;
};

const write = (payload) => {
  let newData = JSON.stringify(payload);
  fs.writeFileSync(data.users.path, newData);
};

let users = read();

router.get("/", (req, res, next) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    next(`Error fetching users: ${error}`);
  }
});

router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  const user = users.find((item) => item.id == userId);
  try {
    res.status(200).send(user);
  } catch (error) {
    next(`Error userId ${userId} doesn't exist: ${error}`);
  }
});

router.post("/add", (req, res, next) => {
  try {
    users.push(req.body);
    write(users);
    res.status(200).send(req.body);
  } catch (error) {
    next(`Error adding users: ${error}`);
  }
});

const updateUser = (id, data) => {
  const index = users.findIndex((obj) => obj.id == id);
  users[index] = data;
  return users;
};

router.put("/edit/:id", (req, res, next) => {
  const userId = req.params.id;
  try {
    updateUser(userId, req.body);
    write(users);
    res.status(200).send(req.body);
  } catch (error) {
    next(`Error updating user: ${error}`);
  }
});

router.patch("/edit/:id", (req, res, next) => {
  const userId = req.params.id;
  try {
    patchUser(users, userId, req.body);
    // write(users);
    // res.status(200).send(req.body);
  } catch (error) {
    next(`Error updating user: ${error}`);
  }
});

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.userId === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
}

router.delete("/remove/:id", (req, res, next) => {
  const { id } = req.params;
  try {
    removeObjectWithId(users, id);
    write(users);
    res.status(200).send(`User Removed`);
  } catch (error) {
    next(`Error removing user: ${error}`);
  }
});

module.exports = router;
