module.exports = {
  three: function (req, res, next) {
    console.log("#3: I'm middleware number three.");
    res.write("#3: I'm middleware number three.\n");
    next();
  }
};
