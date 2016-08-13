const express = require('express'),
  app = express(),
  r = require('rethinkdb')
var config = require('./config'),
  tableList = []

app.use(createConnection);

app.get('/todo/get', get);

app.use(closeConnection);

r.connect(config.rethinkdb , function(err, conn) {
    if (err) {
        console.log('Could not open a connection to initialize the database');
        throw err;
    }
    tableList = r.db('test').tableList().run(conn)
    startExpress()
    // r.table('todo').indexWait('createdAt').run(conn).then(function(err, result) {
    //     console.log("Table and index are available, starting express...");
    //     startExpress();
    // }).error(function(err) {
    //   // r.db('test').tableCreate('todo').run(conn, function(err, result) {
    //   //   if (err) {
    //   //     throw err;
    //   //   }
    //   //
    //   //   startExpress()
    //   //   console.log(JSON.stringify(result, null, 2));
    //   // })
    // });
})

function createConnection(req, res, next) {
    r.connect(config.rethinkdb).then(function(conn) {
        req._rdbConn = conn;
        next();
    });//.error(handleError(res));
}

function closeConnection(req, res, next) {
    req._rdbConn.close();
}

function get(req, res) {
  res.send(tableList)
}

function startExpress() {
    app.listen(config.express.port);
    console.log('Listening on port ' + config.express.port);
}
