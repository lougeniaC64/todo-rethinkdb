const express = require('express'),
  app = express(),
  r = require('rethinkdb')
var config = require('./config'),
  connection = null

app.use('/todo', function(req, res, next) {
  res.send('this todo rocks!')
  next();
});

app.get('/todos/', getTodos)

app.get('/todo/', getTodo)

app.listen(config.express.port, function() {
    console.log('Listening on port ' + config.express.port)
})

function getTodos (req, res) {
  r.connect(config.rethinkdb, function(err, conn) {
    if (err) throw err;
    connection = conn
    sendAllTodos(r, connection, res)
  })
}

function getTodo (req, res) { }

function sendAllTodos (r, connection, res) {
  r.table('todo').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          res.send(JSON.stringify(result, null, 2))
      });
  });
}
