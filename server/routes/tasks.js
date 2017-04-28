var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var config = require('../config');
var db = mongojs(config.get('mongojs:uri'), ['tasks']);

//All tasks
router.get('/tasks', function(req, res, next) {
  db.tasks.find(function(err, tasks) {
    if (err) {
      res.send(err);
    }
    res.send(tasks);
  });
});

//Single task
router.get('/task/:id', function(req, res, next) {
  db.tasks.findOne(
    {_id: mongojs.ObjectId(req.params.id)},
    function(err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
  });
});

//Save task
router.post('/task', function(req, res, next) {
  var task = req.body;
  if (!task.title || !(task.isDone + '')) {
    res.status(400);
    res.send({
      'error': 'Bad data'
    });
  } else {
    db.task.save(task, function (err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
    });
  }
});

//Delete task
router.delete('/task/:id', function(req, res, next) {
  db.tasks.remove(
    {_id: mongojs.ObjectId(req.params.id)},
    function(err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
    });
});

// /Delete task
router.put('/task/:id', function(req, res, next) {
  var task = req.body;
  var updTask = {};

  if (task.isDone) {
    updTask.isDone = task.isDone;
  }

  if (task.title) {
    updTask.title = task.title;
  }

  if (!updTask) {
    res.status(400);
    res.send({
      'error': 'Bad data'
    });
  } else {
    db.tasks.update(
      {_id: mongojs.ObjectId(req.params.id)},
      updTask,
      {},
      function(err, task) {
        if (err) {
          res.send(err);
        }
        res.send(task);
      });
  }

  db.tasks.remove(
    {_id: mongojs.ObjectId(req.params.id)},
    function(err, task) {
      if (err) {
        res.send(err);
      }
      res.send(task);
    });
});

module.exports = router;
