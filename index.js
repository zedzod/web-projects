var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    topic = require('./modules');
const CONFIG = require('./config').events;
var handler = [];

for (let i = 0; i < 10; i++) //Creating 10 topics
    handler.push(topic({ topic: `Topic number: ${i}`, votes: 0 }));

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
        <title>votes</title>
    </head>
    <body>
    ${LOG}
    </body>
    </html>`);
});

app.listen(port);
console.log(`listening on port ${port}`);