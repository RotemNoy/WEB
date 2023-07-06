///// import modules
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const CreatDB_CRUD = require(path.join(__dirname,'db/CreateDB_CRUD'));
const DB_OP = require(path.join(__dirname,'db/DB_Operations'));

app.use(express.static(path.join(__dirname, "static")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const BodyParser = require('body-parser');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

////// routes

// index
app.get('/', (req,res)=>{
    res.render('index');    
});

// about us
app.get('/aboutUs', (req,res)=>{
    res.render('aboutUs');
});

// sign up
app.get('/signUp', (req,res)=>{

    if(req.cookies.LogedUserName != null){
        res.redirect('myProfile');
    }
    else 
       res.render('signUp')});

// sign in
app.get('/signIn', (req,res)=>{  

    if(req.cookies.LogedUserName != null){
        res.clearCookie('LogedUserName')
        res.redirect('/');
    }
    else 
       res.render('signIn')
});

// profile
app.get('/myProfile', (req,res)=>{

    const cookie = req.cookies.LogedUserName
    DB_OP.GetUserProfileData(req,res);
    
});

// select date
app.get('/selectDate', (req,res)=>{    
    res.render('selectDate');
});

// select kayak after select date
app.get('/selectKayak', (req,res)=>{    
    DB_OP.GetAllKayaks(req,res);
});

// select group
app.get('/selectGroup', (req,res)=>{    
    DB_OP.GetAllLessons(req,res);
});

// contact us
app.get('/contactUs', (req,res)=>{
    
    res.render('contactUs');
});

// accept group
app.get('/acceptanceGroup', (req,res)=>{    
    DB_OP.RegisterUserToLesson(req,res);
});

// accept kayak
app.get('/acceptanceKayak', (req,res)=>{    
    DB_OP.RentKayakToUser(req,res);
});

// after select date - display available kayaks
app.post('/processDate', (req,res)=>{
    res.cookie('rentedDate', req.body.selectedDate);    
    res.redirect('/selectKayak')
});


app.post('/CreateNewCustomer', DB_OP.CreateUser);
app.post('/ValidateUser', DB_OP.ValidateUser);
app.post('/ContactUs', DB_OP.CreateNewContactUs);
app.post('/updateDetails',DB_OP.UpdateUserProfile);
app.post('/UnregisterFromLesson',DB_OP.UnregisterFromLesson);
app.post('/UnregisterKayak',DB_OP.UnregisterKayak);


/////// Init the DB
app.get('/createDB', CreatDB_CRUD.CreateDB);
app.get('/dropDB', CreatDB_CRUD.DropDB);

// SET UP LISTEN
app.listen(port, ()=>{
    console.log("server is running on port ", port);
});

