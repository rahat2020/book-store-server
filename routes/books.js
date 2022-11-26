const router = require('express').Router();
const Books = require('../models/Books');
var jwt = require('jsonwebtoken');
const { verifyUser, verifyAdmin, verifyToken } = require('../utils/Verify')


// ADD DATA TO THE Books
router.post('/add', async (req, res, next) => {
    try {
        const data = await new Books(req.body)
        const savedData = await data.save()
        res.status(200).json(savedData)
    } catch (err) {
        next(err);
        console.log(err);
    }
})
// GET ALL DATA TO THE Books
router.get('/get', async (req, res, next) => {
    try {
        const data = await Books.find({})
        res.status(200).json(data)
    } catch (err) {
        next(err);
        console.log(err);
    }
})
// GET Books BY ID
router.get('/get/:id', async (req, res, next) => {
    try {
        const data = await Books.findById(req.params.id)
        res.status(200).json(data)
    } catch (err) {
        next(err);
        console.log(err);
    }
})
// UPDATE DATA
router.put('/update/:id', async (req, res, next) => {
    try {
        const data = await new Books.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(data)
    } catch (err) {
        next(err);
        console.log(err);
    }
})

// DELETE THE AUTHOR BOOKS
router.delete("/:id/:userId", verifyUser, async (req, res) => {

    const userId = req.params.userId;
    // console.log(userId)

    const headerToken = req.headers.token
    const token = headerToken.split(' ')[1]
    // console.log(token)
    const decoded = jwt.decode(token)
    // console.log(decoded.username)

    try {
        // if (decoded.username === req.user.username) {
        //     try {
        //         await Books.findByIdAndDelete(req.params.id);
        //         res.status(200).json("Post has been deleted...");
        //     } catch (err) {
        //         res.status(500).json(err);
        //     }
        // } else {
        //     res.status(401).json("You can delete only your post!");
        // }


        // res.status(200).json('post has been deleted successfully');
        res.status(200).json( decoded.username);
        // console.log(post)
    } catch (err) {
        res.status(500).json(err);
        console.log('err', err);
    }
    // if (req.user.id === req.body.id) {

    // } else {
    //     res.status(401).json("You can delete only your post!"); 
    //     console.log(req.body.id === req.user.id);

    // }
})

// DELETE DATA TO THE Books
router.delete('/delete/:id', verifyAdmin, async (req, res, next) => {
    try {
        const data = await Books.findByIdAndDelete(req.params.id);
        res.status(200).json(data)
    } catch (err) {
        next(err);
        console.log(err);
    }
})


router.get('/tokenverify', verifyToken, (req, res, next) => {
    res.send('token is verified');
})
router.get('/userverify/:id', verifyUser, (req, res, next) => {
    res.send('user is verified');
})

module.exports = router