const express = require('express')
const app = express()
const expressPort = 3000

var r = require('rethinkdb')
const config = { rethinkdb: { host: 'localhost', port: 8080} }



app.use(createConnection);

app.get('/todo/get', get);

app.use(closeConnection);

r.connect(config.rethinkdb , function(err, conn) {
    if (err) {
        console.log("Could not open a connection to initialize the database");
        throw err;
    }

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
  res.send(['me', 'you', 'them'])
}

function startExpress() {
    app.listen(expressPort);
    console.log('Listening on port ' + expressPort);
}
// app.get('/', function (request, response) {
//   response.send('Hello from Express!')
// })
//
// app.get('/todos', function (request, response) {
//   response.send(['this', 'that', 'the other'])
// })
//
// app.listen(expressPort, function (err) {
//   if (err) {
//     return console.log('something bad happened', err)
//   }
//
//   console.log('server is listening on ' + port)
// })
