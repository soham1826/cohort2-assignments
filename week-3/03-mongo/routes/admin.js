const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require("../db")
const mongoose = require("mongoose");

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.headers.username
    const password = req.headers.password

    await Admin.create({
        username:username,
        password:password
    })
    res.json({message:"Admin created successfully"})

});

router.post('/courses', adminMiddleware, async(req, res) => {
    const title = req.body.title;
    const description= req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    // should check here with zod

    const newCourse = await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })

    res.status(200).json({msg:'Course Created Sucessfully',courseId:newCourse._id})
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})

    res.status(200).json({courses:response})
});

module.exports = router;