const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "IamGoodBoy";

//ROUTE:1 Create a User using POST "api/auth/createuser" No Login
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

        //Creating hashed passwords

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: "Please enter Unique Values", message: err.message })
        // });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json({ user })
        res.json({ authToken });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//ROUTE:2  Authenticate a User using POST "api/auth/login" No Login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blanh').exists()

], async (req, res) => {
    //Bad Request then return Error
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ error: "Please login with correct credentrials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please login with correct credentrials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json({ user })
        success = true;
        res.json({ success,authToken });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }

});

//ROUTE:3 Get loggedin userdetails using POST "api/auth/getuser" Login Reqd
//fetchuser is a middleware
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;