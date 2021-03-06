const express = require('express'),
  app = express(),
  r = require('rethinkdb')
var config = require('./config'),
  connection = null

// app.get('/', sendIndexTemplate)

app.get('/todos/', getTodos)

app.post('/todo/create', createTodo)

app.get('/todo/:todoId', getTodo)

app.listen(config.express.port, writePortNumberToConsole)

// function sendIndexTemplate (req, res) {
//   res.sendFile(__dirname + '/index.html')
// }

function writePortNumberToConsole () {
  console.log('Listening on port ' + config.express.port)
}

function createTodo (req, res) {
  req.body = { testValue: 'tada'}
  res.send(req.body)
}

function getTodos (req, res) {
  r.connect(config.rethinkdb, function(err, conn) {
    if (err) throw err;
    connection = conn
    sendAllTodos(r, connection, res)
  })
}

function getTodo (req, res) {
  res.send(req.params)
}

function sendAllTodos (r, connection, res) {
  r.table('todo').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          res.send(JSON.stringify(result, null, 2))
      });
  });
}
