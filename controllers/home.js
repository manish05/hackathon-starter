/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.index = function(req, res) {
  res.render('gurus', {
    title: 'Gurus'
  });
};
