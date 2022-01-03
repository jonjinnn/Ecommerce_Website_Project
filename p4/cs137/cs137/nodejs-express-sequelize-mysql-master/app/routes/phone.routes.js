module.exports = app => {
  const phones = require("../controllers/phone.controller.js");

  let router = require("express").Router();

  // Create a new Phone
  router.post("/", phones.create);

  // Retrieve all Phones
  router.get("/", phones.findAll);

  /*
  // Retrieve all published Phones
  router.get("/published", phones.findAllPublished);
  */

  // Retrieve a single Phone with id
  router.get("/:id", phones.findOne);

  // Update a Phone with id
  router.put("/:id", phones.update);

  // Delete a Phone with id
  router.delete("/:id", phones.delete);

  // Delete all Phones
  router.delete("/", phones.deleteAll);

  app.use('/api/phones', router);
};
