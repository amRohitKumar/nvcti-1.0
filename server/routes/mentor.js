const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn } = require('../middleware');

const mentorCollection = database.collection("mentors");

router.route('/:id/view')
    .get(isLoggedIn, (req, res) => {
        const mentorID = req.params.id;
        mentorCollection.findOne({ "id": mentorID }).then((resp) => {
            // res.json(resp);
            return res.send(200).json({})
        })
    })

router.route('/:id/update')
    .post((req, res) => {
        const applicantID = req.body.applicantID;

        mentorCollection.findOne({ "id": req.params.id }).then((resp) => {
            resp.applicants[applicantID].status = req.body.status;
            mentorCollection.findOneAndReplace({ "id": req.params.id }, resp).then((resp) => {
                // res.send(resp);
                return res.send(200).json({})
            })
        })
    })


module.exports = router;