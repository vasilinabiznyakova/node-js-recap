const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

//this way we could chain all the http methods we would like to provide for this route
router
  .route('/')
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(
    verifyRoles(ROLES_LIST.Admin),
    employeesController.deleteEmployee
  );

// this router will have the parameter in url
router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
