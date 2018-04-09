var mongoose = require('mongoose');
var bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;
//My Schema for the database not the best way of doing it
var userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  password: {type: String},
  firstname: String,
  lastname: String,
  posttitle: String,
  postdescription: String,
  date: { type: Date, default: Date.now },
  posttitle1: String,
  postdescription1: String,
  date1: { type: Date, default: Date.now },
  posttitle2: String,
  postdescription2: String,
  date2: { type: Date, default: Date.now },
  posttitle3: String,
  postdescription3: String,
  date3: { type: Date, default: Date.now },
  posttitle4: String,
  postdescription4: String,
  date4: { type: Date, default: Date.now },
  posttitle5: String,
  postdescription5: String,
  date5: { type: Date, default: Date.now }
});

//This function is for hashing the password so no one can read
//it as this would be a problem 
userSchema.pre('save', function(next){
  var user = this;

  if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt){
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash){

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch){
    callback(undefined, isMatch);
  });
}

var User = mongoose.model('myuser', userSchema);
module.exports = User;
