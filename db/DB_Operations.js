const path = require('path');
const sql = require(path.join(__dirname,'db'));
const express = require('express');
const app = express();

const BodyParser = require('body-parser');
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const CreateUser = (req,res)=>{
    if(!req.body) {
        //res.status(400).send("body can't be empty");
        //return;
    }

    // pull info from body into object
    const NewUser = {
        email: req.body.email,
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        birthdate: new Date(req.body.birthdate),
        password: req.body.password
        
                
    };
    // run insert query
    const Q1 = "insert into users set ?";
    sql.query(Q1, NewUser, (err,mysqlres)=>{
        if (err) {
            console.log(err);
            res.render('signUp', { errorMessage: "Sign up failed." });
            //res.status(400).send("Sign up failed");
            return;
        }
        console.log("created new user", req.body);
        res.render("acceptanceSignUp", {V1 :NewUser.name})
        return;
    })};

const CreateNewContactUs = (req,res)=>{
    if(!req.body) {
        //res.status(400).send("body can't be empty");
        //return;
    }

    // pull info from body into object
    const NewContactUs = {
        name: req.body.namec, 
        email: req.body.emailc,
        phone: req.body.phonec,
        problem: req.body.problemc
               
    };
    // run insert query
    const Q1 = "insert into Contact_Us_Requests set ?";
    sql.query(Q1, NewContactUs, (err,mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("Contact Us failed");
            return;
        }
        console.log("created new Contact Us", req.body);
        res.redirect('/');
        return;
    })};


const ValidateUser = (req, res) => {
    const { email_logging, password_email_logging } = req.body;

    const Q2 = 'SELECT count(*) AS count, name, email FROM Users WHERE email=? AND password=?';
    const values = [email_logging, password_email_logging];

    sql.query(Q2, values, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        const count = mysqlres[0].count;
        if (count === 1) {
            const user = {
                name: mysqlres[0].name,
                email: mysqlres[0].email
            };

            const userJSON = JSON.stringify(user);

            res.cookie('LogedUserName', userJSON);
            res.redirect('/');
        } else {
            res.clearCookie('LogedUserName');
            res.render('signIn', { errorMessage: "Email or password is incorrect! Please try again." });
        }
    });
};

const RegisterUserToLesson = (req,res)=>{

    if(!req.body) {
        //res.status(400).send("body can't be empty");
        //return;
    }

    if(req.cookies.selectedGroup == -1)
    {
        let lessonStr = 'Already registered';
        res.render('acceptanceGroup', {V1:lessonStr});
        return;
    }

    const user = JSON.parse(req.cookies.LogedUserName);
    const lesson = JSON.parse(req.cookies.selectedGroup);

    const NewLesson = {

        user_email: user.email,
        Lesson_id: lesson
    };

    // run insert query
    let Q1 = "insert into lessons_selected set ?";
    sql.query(Q1, NewLesson , (err,mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("Register to Group failed");
            return;
        }
    });

    res.setHeader('Set-Cookie', 'selectedGroup=-1');

    Q1 = "select * from lessons where ID = ?";
    sql.query(Q1, lesson, (err, mysqlres)=>{
        if (err) {
            console.log(err);
            //res.status(400).send("GetUserProfileData failed");
            return;
        }
        
        let lessonStr = mysqlres[0].day + ' ' + mysqlres[0].time;
        res.render('acceptanceGroup', {V1:lessonStr});
    });

};

const RentKayakToUser = (req,res)=>{

    if(!req.body) {
        //res.status(400).send("body can't be empty");
        //return;
    }

    if(req.cookies.selectedKayak == -1)
    {
        let msgStr = 'Already registered';
        res.render('acceptanceKayak', {V1:msgStr});
        return;
    }

    const user = JSON.parse(req.cookies.LogedUserName);    
    const kayak = JSON.parse(req.cookies.selectedKayak);
    const date = new Date(req.cookies.rentedDate);

    const NewRented = {

        date: date,
        user_email: user.email,
        Kayak_id: kayak                
    };

    // run insert query
    let Q1 = "insert into Kayaks_Selected set ?";
    sql.query(Q1, NewRented , (err,mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("this trial of rent a kayak failed");
            return;
        }
        //return;
    })
    
    res.setHeader('Set-Cookie', 'selectedKayak=-1');

    Q1 = "select * from kayaks where ID = ?";
    //let kayakId = JSON.parse(req.cookies.selectedKayak);
    
    sql.query(Q1, kayak, (err, mysqlres)=>{
        if (err) {
            console.log(err);
            return;
        }
        
        let kayakStr = `${mysqlres[0].kayak} on ${date.toDateString()}`;
        res.render('acceptanceKayak', {V1:kayakStr});
    });        
};
    
const GetAllLessons = (req,res)=>{
    const user = JSON.parse(req.cookies.LogedUserName);
    const Q1 = `
    SELECT l.*, CASE WHEN ls.user_email IS NULL THEN 0 ELSE 1 END AS registered
    FROM Lessons as l
    LEFT JOIN Lessons_Selected as ls ON l.ID = ls.Lesson_id AND ls.user_email = ?
    ORDER BY l.day`;
    sql.query(Q1, user.email, (err, mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("GetAllLessons failed");
            return;
        }
        res.render('selectGroup',{groups:mysqlres});
    })        
};

const GetAllKayaks = (req,res)=>{

    const date = req.cookies.rentedDate.selectedDate;
    // Subquery to retrieve the booked kayaks for the specified date
    const subquery = "(SELECT kayak_id FROM Kayaks_Selected WHERE date = ?)";

    // Query to get the available kayaks not in the booked kayaks for the specified date
    const query = "SELECT * FROM Kayaks WHERE ID NOT IN " + subquery;

    sql.query(query, [date],(err, mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("GetAllKayaks failed");
            return;
        }
        res.render('selectKayak',{kayaks:mysqlres});
    })        
};

const GetUserProfileData = (req,res)=>{

    var Q1 = "select * from Users where email = ?";
    const user = JSON.parse(req.cookies.LogedUserName);
    
    sql.query(Q1, user.email, (err, mysqlres)=>{
        if (err) {
            console.log(err);
            res.status(400).send("GetUserProfileData failed");
            return;
        }

        Q2 = "select * from lessons as l join lessons_selected as ls on l.ID = ls.Lesson_id where ls.user_email = ?"
        sql.query(Q2, user.email, (err, mysqlres2)=>{
            if (err) {
                console.log(err);
                res.status(400).send("GetUserProfileData failed");
                return;
            }
            
            Q3 = "select *, DATE_FORMAT(date, '%d/%m/%Y') AS formatted_date from Kayaks as k join Kayaks_selected as ks on k.ID = ks.kayak_id where ks.user_email = ?"
            sql.query(Q3, user.email, (err, mysqlres3)=>{
                if (err) {
                    console.log(err);
                    res.status(400).send("GetAllKayaks failed");
                    return;
            }
            //console.log(mysqlres3);
            res.render('myProfile', {userProfile:mysqlres[0], userGroups:mysqlres2, userKayaks: mysqlres3});
        })
    })
})
};

const UpdateUserProfile = (req, res) => {
    const { name, phone, birthdate, password } = req.body;
    const user = JSON.parse(req.cookies.LogedUserName);

    const query = 'UPDATE Users SET name = ?, phone = ?, birthdate = ?, password = ? WHERE email = ?';
    const values = [name, phone, birthdate, password, user.email];
  
    sql.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send('UpdateUserProfile failed');
        return;
      }
      
      let user = JSON.parse(req.cookies.LogedUserName);    
      user.name = name;
      const userJSON = JSON.stringify(user);
      res.cookie('LogedUserName', userJSON);

      // User profile updated successfully
      res.redirect('/myProfile'); // Redirect to the profile page or any other desired location
    });
};


const UnregisterFromLesson = (req, res) => {

    console.log('UnregisterFromLesson');
    console.log(req.body.id);
    const query = 'delete from lessons_selected where id = ?';
    const values = [req.body.id];
    sql.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send('UnregisterFromLesson failed');
          return;
        }    
    });

    res.status(200).json({ message: 'POST request handled successfully' });
}

const UnregisterKayak = (req, res) => {

    console.log('UnregisterKayak');
    console.log(req.body.id);
    const query = 'delete from kayaks_selected where id = ?';
    const values = [req.body.id];
    sql.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send('UnregisterKayak failed');
          return;
        }    
    });

    res.status(200).json({ message: 'POST request handled successfully' });
}


module.exports={CreateUser,CreateNewContactUs,
     ValidateUser, RegisterUserToLesson, RentKayakToUser, 
     GetAllLessons, GetAllKayaks, GetUserProfileData, UpdateUserProfile, UnregisterFromLesson, UnregisterKayak}