const express = require('express');
const app = express();
const router = express.Router();

const { isLoggedIn, catchAsync, isAdmin } = require('../middleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const dbURL = process.env.DBURL || 'mongodb://localhost:27017/nvcti';
const path = require('path');
const { MongoClient } = require("mongodb");
const client = new MongoClient(dbURL);
const database = client.db("nvcti");
const collection = database.collection("event");
const eventController = require('../controllers/eventFormControllers');

router.route('/:id/makeForm')
    .get( isLoggedIn, (req, res) => {
        if (req.user && req.user.isAdmin === true) {
            res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
        } else {
            res.send("You are not allowed to view this page");
        }
    }); // admin

router.route('/:id/submit')
    .post(isLoggedIn, (req, res) => {
        if (req.user && req.user.isAdmin === true) {
            collection.findOne({ "Event": req.params.id }).then((resp) => {
                resp["comps"] = req.body.comps;
                collection.findOneAndReplace({ "Event": req.params.id }, resp).then((resp) => {
                    res.redirect("/allevents");
                })
            })
        } else {
            res.send("You are not allowed to view this page");
        }
    }); //admin
 
router.route('/:id/formData') // admin & student
    .get(catchAsync(isLoggedIn, (req, res) => {
        collection.findOne({ "Event": req.params.id }).then((resp) => {
            resp["eventID"] = req.params.id;
            res.send(resp);
        }).catch((error) => {
            console.error(error);
            res.send("err404")
        })
    }));

router.route('/:id/apply')
    .get(isLoggedIn, (req, res) => {
        res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
    }); // student

router.route('/:id/submitForm')
    .post(catchAsync(isLoggedIn, upload.any(), async (req, res) => {

        for (var key of Object.keys(req.body)) {
            if (key != "files" && req.body[key].trim() == "") {
                eFlag = 1;
                return res.send("error, fill all fields corectly and apply again");
            }
        }
    
        let data = {}
        let files = {}
    
        for (var f of req.files) {
            files[f["fieldname"]] = f["filename"];
        }
    
        const curruser = await User.findById(req.user.id);
        
        let alreadyEnrolled = 0;
        for(let c in curruser.enrolledEvents){
            if(c==req.params.id) {
                alreadyEnrolled = 1;
                break;
            }
        }
    
        if(alreadyEnrolled){
            return res.redirect('/home');
        }
        
        let l=0;
    
        await collection.findOne({ "Event": req.params.id }).then((resp) => {
            data = resp;
            if (!data["applicants"]) {
                data["applicants"] = []
            }
            req.body["files"] = files;
            req.body["status"] = "pending";
            data["applicants"].push(req.body);
    
            l = data["applicants"].length-1;
            console.log(l);
            collection.findOneAndReplace({ "Event": req.params.id }, data).then((resp) => {
            })
        })
    
        const temp = req.params.id + ' ' + l;
    
        curruser.enrolledEvents.push(temp);
        await curruser.save();
        return res.redirect("/allevents");
    })); // student


router.route('/:id/view')
    .get(isLoggedIn, (req, res) => {
        if (req.user && req.user.isAdmin === true) {
            res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
        } else {
            res.send("You are not allowed to view this page");
        }
    })

router.route('/:id/updatestatus')
    .post(isLoggedIn, (req, res) => {
        if (req.user && req.user.isAdmin === true) {
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

router.route('/')
    .get((req, res) => {
        res.sendFile("index.html", { root: path.join(__dirname, "../build/") });
    })

module.exports = router;