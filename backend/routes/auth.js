const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User using POST "api/auth/createuser" No Login
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
    //Bad Request then return Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {


        //Check whetehr User Exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry User with this Credentials already exsit' });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: "Please enter Unique Values", message: err.message })
        // });
        res.json({ "Welcome": req.body.name })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Some Error Occured');
    }
})

module.exports = router;