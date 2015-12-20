module.exports = {
  one: function(req,res, next){
    console.log("#1: I'm middleware number one.");
    res.write("#1: I'm middleware number one.\n");
    next();
  },

  two: function(req,res, next){
    console.log("#2: I'm middleware number two.");
    res.write("#2: I'm middleware number two.\n");
    next();
  },

  three: function (req, res, next) {
    console.log("#3: I'm middleware number three.");
    res.write("#3: I'm middleware number three.\n");
    next();
  }
};
