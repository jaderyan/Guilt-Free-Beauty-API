const app = require('./server');
const PORT = require('./config');

let port = process.env.PORT || PORT.PORT[process.env.NODE_ENV];

app.listen(port, function () {
    console.log(`listening on port ${port}`);
});