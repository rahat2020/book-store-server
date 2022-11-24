const router = require('express').Router();
const Books = require('../models/Books');

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
        const data = await new Books.findById(req.params.id)
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

// DELETE DATA TO THE Books
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const data = await Books.findByIdAndDelete(req.params.id);
        res.status(200).json(data)
    } catch (err) {
        next(err);
        console.log(err);
    }
})


module.exports = router