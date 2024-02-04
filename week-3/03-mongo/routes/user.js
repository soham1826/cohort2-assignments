const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = await User.create({
        username:username,
        password:password
    })

    res.status(200).json({msg:"User created Successfully",user:newUser})
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({});
    res.status(200).json({courses:allCourses})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const username = req.headers.username;
    const courseId = req.params.courseId;

    await User.updateOne({
        username:username   
    },{"$push":{
        purchasedCourses:courseId
    }})
    res.json({msg:"Course purchased Successfully"})

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const user = await User.findOne({
        username:req.headers.username
    })

    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })

    res.status(200).json({courses:courses})

});

module.exports = router