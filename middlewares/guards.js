function isUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
     ('red is user')
      res.redirect('/auth/login');
    }
  };
}
function isGuest() {
  return (req, res, next) => {
    if (!req.user) {
      next();
    } else {
        ('red isGuest')
      res.redirect('/');
    }
  };
}

module.exports = { isUser, isGuest };
