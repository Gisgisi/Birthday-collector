// middleware/route-guard.js

const Logged = (req, res) => {
  if (req.session.User) {
    res.redirect('/profile/:id')    
  } else
  res.redirect('/login');
}
module.exports = {
  Logged
};
