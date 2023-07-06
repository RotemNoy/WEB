const path = require('path');
const sql = require(path.join(__dirname,'db'));
const fs = require('fs');
const csv = require('csv-parser');
const { application } = require('express');

const AddUser = (email, id, name, phone, birthdate, password)=>{
    var Q1 = 'INSERT into users set email="' + email + '", id="' + id + '", name="'+ name + '", phone="'+ phone + '", birthdate="'+ birthdate + '", password="'+ password + '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    

}

const AddLesson = (difficulty, day, time)=>{
    var Q1 = 'INSERT into lessons set difficulty="' + difficulty + '", day="' + day + '", time="'+ time + '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    
}

const AddKayak = (kayak, vendor, model, weight)=>{
    var Q1 = 'INSERT into Kayaks set kayak="' + kayak + '", vendor="' + vendor + '", model="'+ model + '", weight="' +weight+ '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    
}

const AddLessonSelected = (user_email, lesson_id)=>{
    var Q1 = 'INSERT into lessons_selected set user_email="' + user_email + '", lesson_id="' + lesson_id + '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    
}

const AddKayakSelected = (date, user_email, kayak_id)=>{
    var Q1 = 'INSERT into kayaks_selected set date="' + date + '", user_email="' + user_email + '", kayak_id="'+ kayak_id + '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    
}

const AddContactUs = (name, email, phone, problem)=>{
    var Q1 = 'INSERT into contact_us_requests set name="' + name + '", email="' + email + '", phone="'+ phone + '", problem="'+ problem + '";';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });        
}


const CreateDB = (req,res)=>{

    var Q1 = 'CREATE TABLE IF NOT EXISTS `Users` (email varchar(255) NOT NULL PRIMARY KEY, id int(11) NOT NULL, name varchar(255) NOT NULL, phone long NOT NULL, birthdate date NOT NULL, password varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    Q1 = 'CREATE TABLE IF NOT EXISTS `Lessons` (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, difficulty varchar(255) NOT NULL, day varchar(255) NOT NULL, time varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });    

    Q1 = 'CREATE TABLE IF NOT EXISTS `Lessons_Selected` (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, user_email varchar(255), Lesson_id int, FOREIGN KEY (user_email) REFERENCES Users(email), FOREIGN KEY (Lesson_id) REFERENCES Lessons(ID)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    
    });
    
    Q1 = 'CREATE TABLE IF NOT EXISTS `Kayaks` (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, kayak varchar(255), vendor varchar(255), model varchar(255), weight float) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });
    
    Q1 = 'CREATE TABLE IF NOT EXISTS `Kayaks_Selected` (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, date date, user_email varchar(255), kayak_id int, FOREIGN KEY (user_email) REFERENCES Users(email), FOREIGN KEY (kayak_id) REFERENCES Kayaks(ID)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    Q1 = 'CREATE TABLE IF NOT EXISTS `Contact_Us_Requests` (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, email varchar(255) NOT NULL, phone long, problem varchar(1500)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    fs.createReadStream(path.join(__dirname,'Users.csv'))
    .pipe(csv())
    .on('data', (row) => {
        AddUser(row.email, row.id, row.name, row.phone, row.birthdate, row.password);
    });
    
    fs.createReadStream(path.join(__dirname,'Lessons.csv'))
        .pipe(csv())
        .on('data', (row) => {
            AddLesson(row.difficulty, row.day, row.time);
        });
    
    fs.createReadStream(path.join(__dirname,'Kayaks.csv'))
        .pipe(csv())
        .on('data', (row) => {
            AddKayak(row.kayak,row.vendor,row.model,row.weight);
        });
        
    fs.createReadStream(path.join(__dirname,'Lessons_selected.csv'))
        .pipe(csv())
        .on('data', (row) => {
            AddLessonSelected(row.user_email, row.lesson_id);
        }); 
        
    fs.createReadStream(path.join(__dirname,'Kayaks_selected.csv'))
        .pipe(csv())
        .on('data', (row) => {
            AddKayakSelected(row.date, row.user_email, row.kayak_id);
        }); 
        
    fs.createReadStream(path.join(__dirname,'ContactUs.csv'))
        .pipe(csv())
        .on('data', (row) => {
            AddContactUs(row.name, row.email, row.phone, row.problem);
        }); 
        
    res.send('All Tables created')
};

const DropDB = (req,res)=>{
    
    var Q1 = 'DROP TABLE IF EXISTS Lessons_Selected';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    Q1 = 'DROP TABLE IF EXISTS Kayaks_Selected';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });
    
    Q1 = 'DROP TABLE IF EXISTS Users';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;        
    });

    Q1 = 'DROP TABLE IF EXISTS Lessons';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    Q1 = 'DROP TABLE IF EXISTS Kayaks';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });

    Q1 = 'DROP TABLE IF EXISTS Contact_Us_Requests';
    sql.query(Q1, (err, mysqlres)=>{
        if (err) throw err;
    });
    
    if(req != 0)
        res.send('All Tables dropped')
};

module.exports={CreateDB, DropDB}