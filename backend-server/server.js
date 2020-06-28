let express = require('express'),
    app = express(), 
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.connect('mongodb://localhost:27017/todoBackendServer', {});
mongoose.Promise = global.Promise; //Global is implicit object in nodejs, where you can use implicit objects

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Enabling CORS (Cross origin request sharing) // tell the server to run even if request come from different domain
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//const routes = require('./app/routes/index');
//routes(app);

// var cors = require('cors')
// app.use(cors()) 

const initApp = require('./app/app');
initApp(app);

app.listen(port);
console.log('Todo RESTful API server started on: ' + port);