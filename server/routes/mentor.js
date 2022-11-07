const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require('../middleware');
const catchAsync = require("../utilities/catchAsync");
const Form = require("../models/form");
const mentorCollection = require("../models/mentor");
const { default: mongoose } = require('mongoose');

router.route('/:id/applicants')
    .get(isLoggedIn, isAdmin, catchAsync(async (req, res) => {
        const mentorID = req.params.id;
        const mentor = await mentorCollection.findById(mentorID).populate("applicants");
        res.status(200).send(mentor.applicants);
    })
);

router.route('/:id/update')
    .post(isLoggedIn, isAdmin, catchAsync(async (req, res) => {
        const mentor = await mentorCollection.findById(req.params.id);
        const applicant = Form.findById(mentor.applicants[mongoose.Types.ObjectId(req.body.applicantId)]);
        applicant.status = req.params.status;
        await applicant.save();
        return res.status(200).send({msg: "status updated successfully"});
    })
);

module.exports = router;