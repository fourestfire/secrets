const express = require('express');
const router = express.Router();
module.exports = router;

const models = require('../db/models');
const Secret = models.Secret;
const Comment = models.Comment;

router.get('/', function (req, res, next) {
  Secret.findAll({ }).then(function(data) {
    res.render('index', {
      secrets: data
    });
  });
});

router.get('/add', function (req, res, next) {
  res.render('add');
});

router.get('/:secretId', function (req, res, next) {
  // var secret = Secret.findById(req.params.secretId);
  // var comments = Comment.findAll({
  //   // where: {
  //   //   secretId: req.params.secretId
  //   // }
  // });
  //   Promise.all([secret, comments]).then(function(secret, comments) {
  //     console.log(secret)
  //     console.log(comments)
  //       res.render('secret', {
  //         secret: secret,
  //         comments: comments
  //       });
  //   });

  Secret.findOne({
    where: {
      id: req.params.secretId
    },
    include: [
        {model: Comment, as: 'comments'}
    ]
  }).then(function(data) {
    res.render('secret', {
      secret: data
    });
  }).catch(next);
});


router.post('/', function (req, res, next) {
    Secret.create({
      text: req.body.text
    });
  res.redirect('/secrets')
});

router.use('/:secretId/comments', require('./comments-subrouter'));
