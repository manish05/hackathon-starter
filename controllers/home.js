/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.gods = function(req, res) {
  res.render('gods', {
    title: 'Gods'
  });
};
exports.gurus = function(req, res) {
  res.render('gurus', {
    title: 'Gurus'
  });
};
exports.donate = function(req, res) {
  res.render('donate', {
    title: 'Donate'
  });
};
