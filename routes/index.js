var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Fact = mongoose.model('Fact');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/facts', function(req, res, next) {
  Fact.find(function(err, facts){
    if(err){ return next(err); }

    res.json(facts);
  });
});

// curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
router.post('/facts', function(req, res, next) {
  var fact = new Fact(req.body);

  fact.save(function(err, fact){
    if(err){ return next(err); }

    res.json(fact);
  });
});

router.get('/facts/:fact', function(req, res) {
  req.fact.populate('comments', function(err, fact) {
    if (err) { return next(err); }

    res.json(fact);
  });
});

router.param('fact', function(req, res, next, id) {
  var query = Fact.findById(id);

  query.exec(function (err, fact){
    if (err) { return next(err); }
    if (!fact) { return next(new Error('can\'t find fact')); }

    req.fact = fact;
    return next();
  });
});

router.put('/facts/:fact/upvote', function(req, res, next) {
  req.fact.upvote(function(err, fact){
    if (err) { return next(err); }

    res.json(fact);
  });
});

router.param('comment', function(req, res, next, commentBody) {
  req.body = commentBody;
});

router.param('tags', function(req, res, next, tags) {
  req.tags = tags.split(',');
});

// curl --data '' http://localhost:3000/facts/57fc0411840b162362dab894/comments/oooobakbak.kultur/addcomment
// curl --data 'body=yorum&author=memyselfandi' http://localhost:3000/facts/57fc0411840b162362dab894/addcomment
router.post('/facts/:fact/addcomment', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.tags = [];
  comment.fact = req.fact;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.fact.comments.push(comment);
    req.fact.save(function(err, fact) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

module.exports = router;
