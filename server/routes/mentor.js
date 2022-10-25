const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, catchAsync } = require('../middleware');

const mentorCollection = database.collection("mentors");

router.route('/:id/view')
    .get(isLoggedIn, (req, res) => {
        const mentorID = req.params.id;
        mentorCollection.findOne({ "id": mentorID }).then((resp) => {
            res.json(resp);
        })
    })

router.route('/:id/update')
    .post((req, res) => {
        const applicantID = req.body.applicantID;
        
        mentorCollection.findOne({ "id": req.params.id }).then((resp) => {
            resp.applicants[applicantID].status = req.body.status;
            mentorCollection.findOneAndReplace({ "id": req.params.id }, resp).then((resp) => {
                res.send(resp);
            })
        })
    })


module.exports = router;