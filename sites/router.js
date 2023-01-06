const router = require("express").Router();
var fs = require("fs");
const data = require("../data");

const read = () => {
  let json = fs.readFileSync(data.sites.path);
  readData = JSON.parse(json);
  return readData;
};

const write = (payload) => {
  let newData = JSON.stringify(payload);
  fs.writeFileSync(data.sites.path, newData);
};

let sites = read();

router.get("/", (req, res, next) => {
  try {
    res.status(200).json(sites);
  } catch (error) {
    next(`Error fetching sites: ${error}`);
  }
});

router.get("/:id", (req, res, next) => {
  const siteId = req.params.id;
  const site = sites.find((item) => item.id == siteId);
  try {
    res.json(site);
  } catch {
    next(`Error siteId ${siteId} doesn't exist: ${error}`);
  }
});

router.post("/add", (req, res, next) => {
  try {
    sites.push(req.body);
    write(sites);
    res.status(200).send(sites);
  } catch (error) {
    next(`Error adding site: ${error}`);
  }
});

const updateSite = (id, data) => {
  const index = sites.findIndex((obj) => obj.id == id);
  sites[index] = data;
  return sites;
};

router.put("/edit/:id", (req, res, next) => {
  const siteId = req.params.id;
  try {
    updateSite(siteId, req.body);
    write(sites);
    res.status(200).send(sites);
  } catch (error) {
    next(`Error updating site: ${error}`);
  }
});

const removeObjectWithId = (arr, id) => {
  const objWithIdIndex = arr.findIndex((obj) => obj.siteId === id);
  arr.splice(objWithIdIndex, 1);
  return arr;
};

router.delete("/remove/:id", (req, res, next) => {
  const { id } = req.params;
  try {
    removeObjectWithId(sites, id);
    write(sites);
    res.status(200).send(`Site Removed`);
  } catch (error) {
    next(`Error removing site: ${error}`);
  }
});

module.exports = router;
