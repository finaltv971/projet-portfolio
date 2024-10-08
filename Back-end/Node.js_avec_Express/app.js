var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config()



mongoose.connect(process.env.uri).then( ()=>{
    console.log('db connect OK.')
}).catch( (err)=>{
  console.error(err)
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var produitRouter = require('./routes/produit');
var panierRouter = require('./routes/panier');
var commandeRouter = require('./routes/commande');

 
const { log } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter); 
app.use('/api/users', usersRouter);
app.use('/api/produits', produitRouter);
app.use('/api/paniers', panierRouter);
app.use('/api/commandes', commandeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
