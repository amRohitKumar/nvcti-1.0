const User = require('./models/user');
const isLoggedIn = (req,res,next) => {
     if(!req.isAuthenticated()){ // for this to work as expected we need to do app.use(passport.session()); 
        // req.flash('error', 'You must be signed in!'); 
        return res.redirect('/auth/login');
     } 
     next();
}
module.exports.isLoggedIn = isLoggedIn;


const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req,res,next).catch(e => next(e));
    }
}
module.exports.catchAsync = catchAsync;

module.exports.isAdmin = async(req, res) =>{
    const id = req.user.id;
    const currUser = await User.findById(id);
    if(currUser.isAdmin===true) return 1;
    return 0;
}   