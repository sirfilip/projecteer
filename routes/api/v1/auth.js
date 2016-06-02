var router = require('express').Router();
var indicative = require('indicative');
var User = require('../../../models/user');
var jwt = require('../../../services/jwt');

var UserRegistrationValidator = {
  rules: {
    username: 'required|max:256',
    email: 'required|email',
    password: 'required|min:4|max:256'
  },
  messages: {
    'username.required': 'Username is required.',
    'username.max': 'Username cannot be longer then 256 characters.',
    'username.alphanum': 'Username can contain only letters and numbers.',
    'email.required': 'Email is required.',
    'email.email': 'Email must be a valid email.',
    'password.required': 'Password is required.',
    'password.min': 'Password must be atleast 4 characters long.',
    'password.max': 'Password cannot be longer then 256 characters.'
  }
};

var UserLoginValidator = {
  rules: {
    email: 'required',
    password: 'required'
  },
  messages: {
    'email.required': 'Email is required.',
    'password.required': 'Password is required.'
  }
};


router.post('/register', function(req, res, next) {
  indicative.validate(req.body, UserRegistrationValidator.rules, UserRegistrationValidator.messages).then(function() {
    next();
  }).catch(function(err) {
    res.status(400).json({error: err});
  });
}, function(req, res) {
  User.register(req.body).then(function(user){
    res.json({error: null, data: 'User Created Successfully'});
  }).catch(function(error) {
    res.json({error: error, data: 'Failed to create user'});
  });
});

router.post('/login', function(req, res, next) {

  indicative.validate(req.body, UserLoginValidator.rules, UserLoginValidator.messages).then(function() {
    next();
  }).catch(function(error) {
    res.json({error: error});
  });

},function(req, res) {
  User.login(req.body.email, req.body.password).then(function(user) {
    var token = jwt.generateTokenFor({
      user_id: user._id
    });
    res.json({error: null, data: {
      token: token,
      message: 'Login successful.'
    }});
  }).catch(function(err) {
    console.log(err);
    res.json({error: 'Wrong email and password combination'});
  });
});


module.exports = router;
