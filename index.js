const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000
const BooksRoute = require('./routes/books');
const userRoute = require('./routes/user');
const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vatpd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// console.log(MONGO_URL)

mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('database connection established'))
    .catch(err => console.log('error connecting', err))

app.use(cors())
app.use(express.json());
app.use('/book', BooksRoute)
app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`listening port on http://localhost:${port}`)
})

app.use((err, req, res, next) => {
    const errStatus = err.status  || 500
    const errMessage = err.message || "something went wrong"
    return res.status(errStatus).json(errMessage)
})
