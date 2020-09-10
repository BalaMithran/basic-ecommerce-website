const  express = require("express")
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var session = require('express-session');


var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.set('viewengine','ejs')
// // middleware to make 'user' available to all templates
// app.use(function(req, res, next) {
//     res.locals.user = req.session.user;
//     next();
//   });

app.get('/',(req,res)=>{
    console.log(session.username)
    res.render('index.ejs',{name :session.username})
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/register',(req,res)=>{
    res.render('register.ejs')
})
app.get('/searchresults',(req,res)=>{
    res.render('searchresults.ejs')
})
app.get('/about',(req,res)=>{
    res.render('about.ejs')
})
app.get('/response',(req,res)=>{
    res.render('response.ejs')
})

app.post('/login',urlencodedParser,(req,res)=>{
    session.username = req.body
    console.log(session.username)
    res.redirect('/')
})
app.post('/register',urlencodedParser,(req,res)=>{
    session.username = req.body
    console.log(session.username)
    res.redirect('/')
})

app.post('/searchresults',urlencodedParser,(req,res)=>{
    session.search = req.body.searchtext
    console.log(req.body);
    console.log(session.search);
    res.render('searchresults.ejs', {data: req.body})
})
// app.post('/about',(req,res)=>{
//     res.redirect('/about')
//})
app.listen(process.env.PORT||3000)