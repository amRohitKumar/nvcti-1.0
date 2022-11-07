const express = require('express');
const router = express.Router();

const { isLoggedIn, isAdmin } = require('../middleware');
const catchAsync = require("../utilities/catchAsync");
const Form = require("../models/form");
const Evaluator = require("../models/evaluator");
const User = require("../models/user");
const { default: mongoose } = require('mongoose');

const passGenerator = require("../utilities/generateUID");

router.route('/applicants')
    .get(isLoggedIn, isAdmin, catchAsync(async (req, res) => {
        const mentorID = req.user._id;
        const mentor = await Evaluator.findById(mentorID).populate("applicants");
        res.status(200).send(mentor.applicants);
    })
);

router.route('/update')
    .post(isLoggedIn, isAdmin, catchAsync(async (req, res) => {
        const applicant = Form.findById(req.body.applicantId);
        applicant.status = req.params.status;
        await applicant.save();
        return res.status(200).send({msg: "status updated successfully"});
    })
);

// 1. we will get list of applicants and mail of mentor -> Done
// 2. create random id and password -> Done
// 3. send the creds to mail -> Pending
// 4. create a user with role admin and add applcants to the evaluator schema -> Done
router.route('/forward')
    .post(isLoggedIn, isAdmin, catchAsync(async (req, res) => {
        // applicants = array of applicant id, mails = array of mails
        const { applicants, mails } = req.body;
        for (var mail of mails) {
            const password = passGenerator(16);
            const name = Date.now()
            const evaluator = new User({name: name, password: password, email: mail});
            const evaluatorId = evaluator._id;
            await evaluator.save();
            // mail name and password to the mentor
            const evalList = new Evaluator({userId: mongoose.Types.ObjectId(evaluatorId), applicants: applicants});
            await evalList.save()
        }
        res.status(200).send({msg: "Forwarded successully"});
    })
);

module.exports = router;