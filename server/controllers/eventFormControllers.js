// const dbURL = process.env.DBURL || 'mongodb://localhost:27017/nvcti';
// const path = require('path');
// const { MongoClient } = require("mongodb");
// const client = new MongoClient(dbURL);
// const database = client.db("nvcti");
// const collection = database.collection("event");

// module.exports.getEvent = (req, res) => { // admin
//     res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
// };

// module.exports.submitPostByAdmin = async (req, res) => { // admin
//     if (!req.body) {
//         req.body = {};
//     }
//     req.body["Event"] = "1";
//     // console.log(req.body);
//     await collection.findOneAndReplace({ "Event": "1" }, req.body).then((resp) => {
//         res.send(resp);
//     })
// };

// module.exports.getFormData = async (req, res) => { // admin & student
//     await collection.findOne({ "Event": "1" }).then((resp) => {
//         res.send(resp);
//     })
// };

// module.exports.getApply = async (req, res) => { // student
//     return res.sendFile('index.html', { root: path.join(__dirname, '../build/') });
// };

// module.exports.submitFormPostByStudents = async (req, res) => { // student
//     let data = {}
//     console.log(req.body);
//     await collection.findOne({ "Event": "1" }).then((resp) => {
//         data = resp;
//         if (!data["applicants"]) {
//             data["applicants"] = []
//         }
//         data["applicants"].push(req.body);
//         collection.findOneAndReplace({ "Event": "1" }, data).then((resp) => {
//             res.send(resp);
//         })
//     })
// };