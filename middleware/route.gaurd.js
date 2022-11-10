// middleware/route-guard.js

const Logged = (req, res, next) => {
  if (req.session.User) {
    next()
  } else {
    res.redirect('/login');
  }
}

const isLogin = (req, res, next) => {
  if (req.session.User) {
    res.redirect('/profile/' + req.session.User.username);
  } else {
    next();
  }
}

module.exports = {
  Logged, isLogin
};
