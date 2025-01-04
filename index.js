require("dotenv").config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const { checkCookieForAuthentication } = require('./middlewares/auth')
const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
const rootRoute = require('./routes/root')
const UserRoute = require('./routes/user');
const BlogRoute = require('./routes/blog');

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(checkCookieForAuthentication('token'))
app.use(express.static(path.resolve('./public')))   //middleware to access static files


app.use('/', rootRoute);
app.use('/user', UserRoute);
app.use('/blog', BlogRoute);

app.listen(PORT, () => console.log(`Server started on port:${PORT}`))