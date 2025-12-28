const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

//this way we could chain all the http methods we would like to provide for this route
router
  .route('/')
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

// this router will have the parameter in url
router.route('/:id').get((req, res) => {
  res.json({ id: req.params.id });
});


module.exports = router;
