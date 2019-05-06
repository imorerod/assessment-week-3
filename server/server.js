const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const todo = require('./routes/todo.router');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/todo', todo);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

module.exports = app;