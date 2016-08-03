const http = require('http')
const port = 7000

const requestHandler = function (request, response) {
  console.log(request.url)
  response.end('Day 2 of 100 commits!')
}

const server = http.createServer(requestHandler)

server.listen(port, function (err) {
  if (err) {
    return console.log('This error occurred: ', err)
  }

  //console.log(`The server is listening on ${port}`)
})
