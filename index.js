const mongoose = require('mongoose');
var bp=require('body-parser');
require('./views/Users')
mongoose.connect('mongodb+srv://abc:abc123456@cluster0-6kppu.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var Users = mongoose.model('Users');
var express=require('express');
var app=express()
app.use(bp.json())
app.set("view-engine","ejs")
app.get('/',(req,res)=>{
    res.render("google.ejs")
})
app.get('/success2',(req,res)=>{
  res.render("success2.ejs",{status:google})
})
app.get('/register',(req,res)=>{
  res.render("register.ejs")
})
app.post('/signup',(req,res)=>{
  console.log(req.body)
      Users.find({email: req.body.email},(err,docs)=>{
          if(docs.length==0){
              var user = new Users();
              user.name = req.body.name;
              user.password = req.body.password;
              user.email = req.body.email;
              user.save((err, doc) => {
                    if (err) {
                        console.log(err);
                         
                     }
                     else
                     {console.log('Inserted');}
              })
              p= {"status":'Inserted'}
             // res.redirect('success2',{user:req.body})
              res.send(p);
          }else{
              res.send({"status":'Account Already Exists'});
          }
      })
  })

  
util = require('util'),
session = require('express-session'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
router = express.Router(),
//app = express();
// package related to passport and oauth2.0
passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
 
// session related task & passport intiallization...
app.use(session({ secret: 'dboxsecretkey'}));
app.use(passport.initialize());
app.use(passport.session());
 
// Passport session setup, Passport needs to serialize and deserialize user instances from a session store to support login sessions. 
passport.serializeUser(function(user, done) {
done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
done(null, obj);
});
 
 
passport.use(new LinkedInStrategy({
clientID: '81jrnhheazautz',
clientSecret: 'i7P3aoxv9Yda7DUV',
callbackURL: "http://localhost:5000/callback/",
scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
// asynchronous verification, for effect...
process.nextTick(function () {
// To keep the example simple, the user's LinkedIn profile is returned to
// represent the logged-in user. In a typical application, you would want
// to associate the LinkedIn account with a user record in your database,
// and return that user instead.
return done(null, profile);
});
}));
 
// Using FacebookStrategy within Passport here to perform the actual task...
/* GOOGLE ROUTER */
var flaf
var google
app.get("/temp",(req,res)=>{
  flaf="register";
  res.redirect('/linkedin');
});
app.get("/temp1",(req,res)=>{
  flaf="login";
  res.redirect('/linkedin');
});

app.post("/google1",(req,res)=>{
  flaf="login";
  google=req.body 
  console.log(google)
  Users.find({email: req.body.email},(err,docs)=>{
    
    if(docs.length!=0){
        res.send({"status":"present"});
    }
    else{
      res.send({"status":"not present"});
    }
})

});
app.post("/google2",(req,res)=>{
  console.log(req.body);
  console.log("#########################################");
  Users.find({email: req.body.email},(err,docs)=>{
    if(docs.length==0){
      var user = new Users();
      user.name = req.body.name;
      user.password = req.body.email;
      user.email = req.body.email;
      user.save((err, doc) => {
            if (err) {
                console.log(err);
             }
             else
             {console.log('Inserted now');}
      })
        res.send({"status":"added"});
        google=req.body;
    }
    else{
      res.send({"status":"not added"});
    }
})
});
app.get("/getdata",(req,res)=>{
  
  res.send({"status":google});
});
app.get('/linkedin',
passport.authenticate('linkedin'));
// callback method which linkedin will hit after successfull login of user
app.get('/callback/',
passport.authenticate('linkedin', { failureRedirect: '/login' }),
function(req, res) {
  if(flaf=="login"){
  Users.find({email: req.user.emails[0].value},(err,docs)=>{
    
    if(docs.length!=0){
        console.log('already Inserted***********');
        res.render('index.ejs', { user: req.user });
    }
    else{
      res.redirect('/register'); 
    }
})
  }
  else{
    Users.find({email: req.user.emails[0].value},(err,docs)=>{
    
      if(docs.length==0){
          var user = new Users();
          user.name = req.user.displayName;
          user.password = req.user.emails[0].value;
          user.email = req.user.emails[0].value;
          user.save((err, doc) => {
                if (err) {
                    console.log(err);
                     
                 }
                 else
                 {console.log('Inserted now');}
          })
          
      }
  })
  
  res.render('index.ejs', { user: req.user });
  }
});





//method to load index.ejs file on base path
// app.get('/', function(req, res){
// res.render('index.ejs', { user: req.user });
// });
// function ensureAuthenticated(req, res, next) {
// if (req.isAuthenticated()) { return next(); }
// res.redirect('/login')
// }
// Method to logout
// app.get('/logout', async (req, res) => {
//     req.session.destroy();req.cookies.clear;
//     req.logout();
//     //req.session = null;
//     // res.clearCookie("test")
//     // res.clearCookie("test.sig")
//     res.redirect('/')
//   })
app.get('/logout', function (req, res) {
    
    req.session.cookie.expires = true;

    req.session.cookie.maxAge = 0;
    req.logout();
    res.status(200).clearCookie('connect.sid', {
      path: '/'
    });
    res.status(200).clearCookie('G_AUTHUSER_H', {
      path: '/'
    });
    req.session.destroy(function (err) {
     // res.redirect('/callback/login')
      res.render('google.ejs');
    });
  });
// app.get('/logout', function(req, res) {
//     req.session.destroy(function(e){
//         req.logout(true);
//         res.redirect('/');
//     });
// });
app.listen(5000,()=>{
    console.log("Server Running on 5000")
});