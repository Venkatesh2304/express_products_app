
import express from "express"
import  usersRouter from  './routes/users.js'
import  prodRouter from  './routes/products.js'
import  authRouter from  './routes/auth.js'
import bodyparser from "body-parser"
import { verify } from "./auth.js";
import mongoose from "mongoose"
var app = express();


mongoose.connect("mongodb+srv://Baggam_Rakshan_Tej:eZuCVgYtvzF19Wz4@cluster0.1i9omqc.mongodb.net/capstone2?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
// Prompts a message in the terminal once the connection is "open"
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', authRouter);
app.use(verify)
app.use('/users', usersRouter);
app.use('/products', prodRouter);


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