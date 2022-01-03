const db = require("../models");
const Phone = db.phones;
const Op = db.Sequelize.Op;

// Create and Save a new Phone
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Phone
  const phone = {
    model: req.body.model,
    color: req.body.color,
    memory: req.body.memory,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image_url: req.body.image_url,
    numUnits: req.body.numUnits,
   // published: req.body.published ? req.body.published : false
  };

  // Save Phone in the database
  Phone.create(phone)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Phone."
      });
    });
};

// Retrieve all Phones from the database.
exports.findAll = (req, res) => {
  const model = req.query.model;
  const category = req.query.category;
  const price = req.query.price;
  let condition = model ? { model: { [Op.like]: `%${model}%` } } : null;
  if(!condition)
    condition = category ? { category: { [Op.like]: `%${category}%` } } : null;
  if(!condition)
    condition = price ? { price: { [Op.lte]: `${price}` } } : null;

  Phone.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving phones."
      });
    });
};

// Find a single Phone with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Phone.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Phone with id=" + id
      });
    });
};

// Update a Phone by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Phone.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Phone was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Phone with id=${id}. Maybe Phone was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Phone with id=" + id
      });
    });
};

// Delete a Phone with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Phone.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Phone was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Phone with id=${id}. Maybe Phone was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Phone with id=" + id
      });
    });
};

// Delete all Phones from the database.
exports.deleteAll = (req, res) => {
  Phone.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Phones were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all phones."
      });
    });
};


// find all published Phone
/*
exports.findAllPublished = (req, res) => {
  Phone.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving phones."
      });
    });
};
*/