module.exports.homeStats = async (req, res) => {
  var events = [];
  const cursor = collection.find({}).toArray((err, result) => {
    for (let i of result) events.push(i);
    // return res.render('home', { events });
    return res.send(200).json({});
  });
  return;
};
