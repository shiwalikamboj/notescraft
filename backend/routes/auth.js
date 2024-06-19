const express = require('express');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/',[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','email is invalid!').isEmail(),
    body('password','Password must be atleast 8 characters').isLength({ min: 8 })
], (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => { 
        console.log("message: User created successfully!!");
        res.json(user);
    })
      .catch(err => {
        console.log("error: ",err);
        res.json({error: "email already exists!!"});
      });
});

module.exports = router;