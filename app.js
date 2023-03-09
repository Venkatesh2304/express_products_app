
import express from "express"
import  usersRouter from  './routes/users.js'
import  prodRouter from  './routes/products.js'

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/products', prodRouter);
app.use('/users', usersRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen( 5000 , () => {
	console.log("a")
});