const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');

//this way we could chain all the http methods we would like to provide for this route
router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

// this router will have the parameter in url
router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
