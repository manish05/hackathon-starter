/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.mannat = function(req, res) {
  res.render('mannat', {
    title: 'Mannat'
  });
};

exports.testimonials = function(req, res) {
  res.render('testimonials', {
    title: 'Testimonials'
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
