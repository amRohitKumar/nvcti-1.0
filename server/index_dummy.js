if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

//SET-UP
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');

// FORM
const { MongoClient } = require("mongodb");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, '../build/static')));

const mongoose = require('mongoose');
const { sendMail } = require('./utilities/mailsender');
const jwt = require('jsonwebtoken');


mongoose.Promise = global.Promise;

const dbURL = process.env.DBURL || 'mongodb://localhost:27017/nvcti';

mongoose.connect(dbURL, {
    useNewUrlParser: true,
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const client = new MongoClient(dbURL);
const database = client.db("nvcti");
const collection = database.collection("event");

// SECURITY
const mongoSanitize = require('express-mongo-sanitize');
app.use(
    mongoSanitize({
        replaceWith: ' ',
    }),
);

const secret = process.env.SECRET || 'asecrethere';

const MongoStore = require('connect-mongo');
const store = new MongoStore({
    mongoUrl: dbURL, // link to db where we want to store these sessions
    secret: secret,
    touchAfter: 24 * 3600 // (in sec) this Avoids unnecessary update of data. If the data is changed it will be updated, but if it is not changed it will not be updated(i.e. even if we send requests to update it will not be updated, will be done after every 24hrs here)
})

store.on("error", function (e) {
    console.log("Session store error!!!", e);
})

const sessionConfiguration = {
    store: store, // now mongo will be used to store sessions.
    name: 'nvcti', // we use this name to set the name to our cookie instead of using 'connect.sid' which is default.
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 365 * 24 * 60 * 60 * 1000,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,// so not accessible through js
        // secure: true // Only work over http secured servers(https), but in localhost(http) we don't get desired results as it is not secured(https). HTTPS is far more secure than HTTP
    }
}

app.use(session(sessionConfiguration));

const User = require('./models/user');
const { isLoggedIn } = require('./middleware');

const passport = require('passport');
const passportLocal = require('passport-local');
const MagicLinkStrategy = require('passport-magic-link').Strategy;

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session()); //this should be used only after 'app.use(session())'
passport.use(new passportLocal(User.authenticate())); // this authenticate method, serializeUser, deserializeUser is added by passport.local.mongoose to User.
passport.serializeUser(User.serializeUser()); // store in a session. serializeUser(): Generates a function that is used by Passport to serialize users into the session.
passport.deserializeUser(User.deserializeUser()); // unstore in a session


app.use((req, res, next) => { // we should do this before any of the route handlers and only after app.use for session and flash(as they( flash and session ) are needed to run flash)
    res.locals.currentUser = req.user;
    next();
}) // this should be places after above authentication part to add req.user into locals.

const user = 'admin';

app.get('/home', isLoggedIn, (req, res) => {
    return res.render('home');
})


const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

// app.get('/auth/register', (req, res) => {
//     return res.render('auth/register');
// })

// app.post('/auth/register', async (req, res, next) => {
//     try {
//         const { username, email, password } = req.body;
//         // console.log(username, password);
        
//         const alreadyExists = await User.findOne({ email: email });
//         // console.log(alreadyExists);
//         if (alreadyExists) {
//             console.log("A user with the given mail already exists");
//             return res.redirect('/auth/register');
//         }

//         const usernameExists = await User.findOne({username});
//         if(usernameExists){
//             console.log("A user with the given username already exists");
//             return res.redirect('/auth/register');
//         }

//         //sending verification email
//         let emailToken = jwt.sign(
//             {
//                 email, username, password
//                 // this whole object is payload
//             }, process.env.EMAIL_VERIFY_TOKEN_SECRET,
//             {
//                 expiresIn: '1d',
//             }
//         );
//         // console.log(emailToken);

//         const url = `${process.env.CLIENT_ADDRESS2}/auth/verify-email/${emailToken}`;

//         const textmsg = `Hi, ${email} Click on the given link to confirm your email ${url}`;


//         const htmlmsg = `<div>
//                             <h1>
//                                 Hi, ${email}<br> Click on the given link to confirm your email
//                             </h1>
//                             <h1>
//                                 Link is valid for only 24 hours <a href=${url}>Click here to verify your email</a>
//                             </h1>
//                         </div>`;

//         await sendMail({ to_email: email, subject_email: "Verify Your Email", text_email: textmsg, html_email: htmlmsg });

//         return res.render('auth/verify');
//     }
//     catch (e) {
//         // req.flash('error', e.message);
//         console.log(e.message);
//         return res.redirect('/auth/register');
//     }
// });

// app.get('/auth/verify-email/:emailToken', async (req, res) => {

//     try {
//         const emailToken = req.params.emailToken;
//         // console.log(emailToken);

//         const { email, username, password } = jwt.verify(emailToken, process.env.EMAIL_VERIFY_TOKEN_SECRET);
//         // if the token is generated using the secret given, it will return the entire payload
        
//         const alreadyUser = await User.findOne({email});
//         if(alreadyUser){
//             console.log("ALREADY VERIFIED");
//             return res.redirect('/auth/login');
//         }
        
//         const makeUser = new User({ username, email, isVerified: true });
//         const result = await User.register(makeUser, password); // auto saved

//         req.login(result, err => { // login after registering
//             if (err) return next(err);
//             // req.flash('success', 'Welcome to CampIt!');
//             return res.redirect('/home');
//         })
//     }
//     catch(e){
//         console.log(e.message);
//         return res.redirect('/auth/register');
//     }
// })


// app.get('/auth/login', (req, res) => {
//     return res.render('auth/login');
// })

// app.post('/auth/login', passport.authenticate('local', { failureFlash: false, failureRedirect: '/auth/login' }), (req, res) => {
//     // req.flash('success', `Welcome back ${req.user.username}`);
//     res.redirect('/home');
// });

// app.get('/auth/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.redirect('/auth/login');
//     });
// });



// EVENT

// const eventRoute = require('./routes/event');
// app.use('/event', eventRoute);


/*--changes done here---*/

// app.get('/event', isLoggedIn, (req, res) => { // admin
//    res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
// });


// app.get('/event/:id/makeForm', (req, res) => {
//     if (user == "admin") {
//         res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
//     } else {
//         res.send("You are not allowed to view this page");
//     }
// });

// app.post("/event/submit", isLoggedIn, (req, res) => { // admin
//     if (!req.body){
//         req.body = {};
//     }
//     req.body["Event"] = "1";
//     // console.log(req.body);
//     collection.findOneAndReplace({ "Event": "1" }, req.body).then((resp) => {
//         res.send(resp);
//     })
// })

app.post("/event/:id/submit",  async (req, res) => {
    if (user == "admin") {
       collection.findOne({ "Event": req.params.id }).then((resp) => {
            resp["comps"] = req.body.comps;
            collection.findOneAndReplace({ "Event": req.params.id }, resp).then((resp) => {
                return res.redirect("/allevents");
            })
        })
    } else {
        res.send("You are not allowed to view this page");
    }
})

// app.get("/event/formData", isLoggedIn, (req, res) => {
//     collection.findOne({ "Event": "1" }).then((resp) => {
//         res.send(resp);
//     })
// })
app.get("/event/:id/formData", (req, res) => {
    collection.findOne({ "Event": req.params.id }).then((resp) => {
        resp["eventID"] = req.params.id;
        res.send(resp);
    }).catch((error) => {
        console.error(error);
        res.send("err404")
    })
})


// app.get("/event/apply", isLoggedIn, (req, res) => { // student
//     return res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
// })
app.get("/event/:id/apply", (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
})


// app.post("/event/submitForm", isLoggedIn, upload.array("files", 10), (req, res) => { // student
//     let data = {}
//     console.log(req.body);
//     collection.findOne({ "Event": "1" }).then((resp) => {
//         data = resp;
//         if (!data["applicants"]) {
//             data["applicants"] = []
//         }
//         data["applicants"].push(req.body);
//         collection.findOneAndReplace({ "Event": "1" }, data).then((resp) => {
//             res.send("form submitted");
//         })
//     })
// })
app.post("/event/:id/submitForm", upload.any(), (req, res) => {
    let data = {}
    let files = {}
    
    for (var f of req.files) {
        files[f["fieldname"]] = f["filename"];
    }

    collection.findOne({ "Event": req.params.id }).then((resp) => {
        data = resp;
        if (!data["applicants"]) {
            data["applicants"] = []
        }
        req.body["files"] = files;
        req.body["status"] = "pending";
        data["applicants"].push(req.body);
        collection.findOneAndReplace({ "Event": req.params.id }, data).then((resp) => {
            res.send(resp);
        })
    })
})



///// new //////

//ADMIN
app.get("/event/:id/view", (req, res) => {
    if (user == "admin") {
        res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
    } else {
        res.send("You are not allowed to view this page");
    }
})

//ADMIN
app.get("/event/:id/data", (req, res) => {
    if (user == "admin") {
        collection.findOne({ "Event": req.params.id }).then((resp) => {
            res.json(resp);
        })
    } else {
        res.send("You are not allowed to view this page");
    }
})

//ADMIN
app.get('/createEvent', (req, res) => {
    if (user == "admin") {
        res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
    } else {
        res.send("You are not allowed to view this page");
    }
})

//ADMIN
app.post("/createEvent", (req, res) => {
    if (user == "admin") {
        collection.countDocuments({ "_id": { "$exists": true } }).then((resp) => {
            req.body["Event"] = (resp + 1).toString();
            req.body["isOngoing"] = false;
            req.body["comps"] = {"elements": {}};
            collection.insertOne(req.body).then(() => {
                return res.redirect('/allevents');
            })
        })
    } else {
        res.send("You are not allowed to view this page");
    }
})

//ADMIN
app.post("/event/:id/updatestatus", (req, res) => {
    if (user == "admin") {
        collection.findOne({ "Event": req.params.id }).then((resp) => {
            resp.applicants[req.body.studId].status = req.body.status;
            collection.findOneAndReplace({ "Event": req.params.id }, resp).then((resp) => {
                res.send("Updated");
            })
        })
    } else {
        res.send("You are not allowed to view this page");
    }
})

app.get("/event", (req, res) => {
    res.sendFile("index.html", {root: path.join(__dirname, "../build/")});
})

app.get("/allevents", (req, res) => {
    collection.find({}).toArray((err, result) => {
        fResult = {};
        for(var i = 0; i < result.length; i++) {
            temp = {}
            temp["Name"] = result[i].eventName;
            temp["Organizer"] = result[i].eventOrganizer;
            temp["EventID"] = result[i].Event;
            fResult[i] = temp;
        }
        res.json(fResult);
    });
})

app.use((err, req, res, next) => {
    if (!err.status) err.status = 500;
    if (!err.message) err.message = 'Something went wrong!';
    res.render('error.ejs', { err });
})


const port = process.env.PORT || 3000;
app.listen(port);

