var jwt = require('jsonwebtoken');
const  { LocalStorage } = require ("node-localstorage")
global.localStorage = new LocalStorage('./scratch');

// TOKEN VERIFY
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.token;
    // console.log(authHeader);
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
            console.log(err) // bar
            // console.log(user) 
            req.user = user,
                next()
        });
    }
}


// VERIFY THE USER
const verifyUser = (req, res, next) => {
    // const config = {
    //     headers: { token: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
    // };
    // console.log(config)    
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
          next();
        } else {
          res.status(403).json("You are not verified");
        //   console.log(req.user.id)
        //   console.log(req.params.id)
        }
      });
};

// VERIFY ADMIN
const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
            console.log(res)
        } else {
            return next(createError(403, "You are not admin!"));
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }