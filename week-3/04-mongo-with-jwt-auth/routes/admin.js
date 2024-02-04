const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const JWT_SECRET = 'soham'

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username  = req.headers.username;
    const password = req.headers.password;

    await Admin.create({
        username:username,
        password:password
    })

    res.status(200).json({msg:"admin created successfully"})

});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username:username,
        password:password
    })
    if(admin){
        const token = jwt.sign({
            username
        },JWT_SECRET)

        res.json({
            user:admin,
            token:token
        })
    }else{
        res.status(411).json({
            msg:"Wrong password or username"
        })
    }

});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.status(200).json({msg:"course Created sucessfully",courseId:newCourse._id})
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});
    res.status(200).json({courses:response})
});

module.exports = router;