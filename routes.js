'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator/check');
// This array is used to keep track of user records
// as they are created.
const users = [];

// Construct a router instance.
const router = express.Router();

// Route that returns a list of users.
router.get('/users', (req, res) => {
  res.json(users);
});

/*
// Route that creates a new user.
// to configure the validation chain to consider null and falsy values (e.g. "", 0, false, null) as
//non-existent values, pass the checkNull and checkFalsy options into the exists() method call:
// const nameValidationChain = check('name')
//   .exists({ checkNull: true, checkFalsy: true })
//   .withMessage('Please provide a value for "name"');
// not now needed as called with check within post call
// would of put router.post('/users', nameValidationChain, (req, res) => {
// with this
*/

router.post('/users', [
  check('name')
    .exists()
    .withMessage('Please provide a value for "name"'),
  check('email')
    .exists()
    .withMessage('Please provide a value for "email"'),
], (req, res) => {
  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);

  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);

    // Return the validation errors to the client.
    res.status(400).json({ errors: errorMessages });
  } else {
    // Get the user from the request body.
    const user = req.body;

    // Add the user to the `users` array.
    users.push(user);

    // Set the status to 201 Created and end the response.
    res.status(201).end();
  }
  // const errors = [];

  // // Validate that we have a `name` value.
  // if (!user.name) {
  //   errors.push('Please provide a value for "name"');
  // }

  // // Validate that we have an `email` value.
  // if (!user.email) {
  //   errors.push('Please provide a value for "email"');
  // }

  // // If there are any errors...
  // if (errors.length > 0) {
  //   // Return the validation errors to the client.
  //   res.status(400).json({ errors });
  // } else {
  //   // Add the user to the `users` array.
  //   users.push(user);

  //   // Set the status to 201 Created and end the response.
  //   res.status(201).end();
  // }
});

module.exports = router;


/**
 *Exercise: Going Further with a Data Validation Library
Now that we've recreated the required value validations for the name and email fields, we're ready to implement the rest of our validation rules. As a reminder, here are the expanded data validation requirements for creating new user accounts:

When creating a new user account, the following fields are required:
name - The user's full name (i.e. first and last name)
email - The user's email address
birthday - The user's birthday
password - The user's password
passwordConfirmation - The user's password confirmation
Additionally, the following rules should be adhered to:
The birthday string value should be a valid date
The email string value should be a valid email address (format only)
The password string value should between 8 and 20 characters in length
The password and passwordConfirmation string values should match
To give you practice with what you've learned in this lesson, go ahead and try to implement the remaining validation rules using the express-validator library.

For guidance, here's a high level overview of what needs to be done:

In the POST /api/users route (defined in the routes.js file), add three additional calls to the express-validator check() method—once each for the birthday, password, and passwordConfirmation fields.

Add additional method calls to the validation chains to validate specific aspects of a field.

For example, to validate that the email field is in fact a valid email address, chain a call to the isEmail() method:
check('email')
  .exists({ checkNull: true, checkFalsy: true })
  .withMessage('Please provide a value for "email"')
  .isEmail()
  .withMessage('Please provide a valid email address for "email"')
The express-validator uses the validator library to validate data. Any of the validator library methods can be chained onto an express-validator validation chain. For a complete list of the available validator methods see the documentation for validator.

Create a custom validator method to validate that the password and passwordConfirmation field values match. See this page in the express-validator documentation for more information about custom validators.
Good luck with this exercise! Do your best to complete as much of it as possible. When you're ready, a link to a completed solution is available in the next section.

Completed Example
The source code for a completed example is available in this GitHub repo:

https://github.com/treehouse-projects/rest-api-validation-with-express
 *
 */
