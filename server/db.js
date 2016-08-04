r = require('rethinkdb');

const connection = null;
r.connect( {host: 'localhost', port: 7000}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    r.db('test').tableCreate('todo').run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })

    r.table('todo').insert([
        {
          name: 'clean',
          dueDate: '8/5/16',
          status: 'open'
        },
        {
          name: 'first commit',
          dueDate: '8/1/16',
          status: 'closed'
        }
    ]).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })
})

// r.db('test').tableCreate('todo').run(connection, function(err, result) {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
// })

// r.table('todo').insert([
//     {
//       name: 'clean',
//       dueDate: '8/5/16',
//       status: 'open'
//     },
//     {
//       name: 'first commit',
//       dueDate: '8/1/16',
//       status: 'closed'
//     }
// ]).run(connection, function(err, result) {
//     if (err) throw err;
//     console.log(JSON.stringify(result, null, 2));
// })

module.exports = r;
