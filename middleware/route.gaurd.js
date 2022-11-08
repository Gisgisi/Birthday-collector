// middleware/route-guard.js

const Logged = (req, res, next) => {
  if (req.session.User) {
    next()
  }else
  res.redirect('/login');  
}
module.exports = {
  Logged
};
