var connect = require('connect');

connect.createServer(connect.static("frontend")).listen(5000);