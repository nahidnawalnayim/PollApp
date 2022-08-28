var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const morgan = require("morgan");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let formRoute=require('./routes/form')
var app = express();
let pollController=require('./pollcontroller')

app.use(morgan("dev"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/form', formRoute);

app.get('/form',pollController.createpollgetcontroller)
app.post('/form',pollController.createpollpostcontroller)
app.get('/polls', pollController.getAllPolls)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// app.listen(5000,()=>{
//   console.log("server is connected");
// })

mongoose
    .connect("mongodb+srv://nahidnawal:nahidnawalnayim@nahidcluster.gzgxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => {
        app.listen(3000, () => {
            console.log('Application is ready to serve on port 4545')
        })
    })
    .catch(e => {
        console.log(e)
    })

module.exports = app;
