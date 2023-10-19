const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "web",
   port:'3307'
})

db.connect(function(err) {
   if (err) throw err;
   console.log("Connected");

 });

app.post('/api/register',(req,res) =>{
   const { name, email, phone, password, role, gender, birth } = req.body;
  

   const sql = "INSERT INTO user (name, email, phone, password, role, gender, birth) VALUES (?, ?, ?, ?, ?, ?, ?)";
   const values = [name, email, phone, password, role, gender, birth];
   
   db.query(sql, values, (err, data) => {
  if (err) {
   console.error(err);
   return res.status(500).json({ message: 'Error occurred during signup' });
 } else {
   return res.status(200).json({ message: 'Signup successful' });
 }
});

})

app.post('/api/login', (req, res) => {
   const {  password, username } = req.body;

   db.query('SELECT * FROM user WHERE email = ?', [username], (err, results) => {
     if (err) {
       console.error(err);
       return res.status(500).json({ message: 'Error occurred during login' });
     }

     if (results.length === 0 || results[0].password !== password) {
       return res.status(401).json({ message: 'Invalid email or password' });
     }

     return res.status(200).json({ message: 'Login successful' });
   });
 });


app.post('/api/tutorregister',(req,res) =>{
   
   const { userId, school,	specialized, job, expTeach, subjectRange, classRange, skillRange,	schedule, description, role, roleId } = req.body;
  

   const sql = "INSERT INTO tutor (userId, school,	specialized, job, expTeach, subjectRange, classRange, skillRange,	schedule, description, role, roleId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
   const values = [userId, school,	specialized, job,   expTeach,	subjectRange,	classRange,	skillRange,	schedule,	description, role, roleId];
   
   db.query(sql, values, (err, data) => {
  if (err) {
   console.error(err);
   return res.status(500).json({ message: 'Error occurred during signup' });
 } else {
   return res.status(200).json({ message: 'Signup successful' });
 }
});
/*JSON sample
{
  "userId": "123456789",
  "school": "ABC School",
  "specialized": "Mathematics",
  "job": "Teacher",
  "expTeach": 1,
  "subjectRange":"",
  "classRange": "Grade 9",
  "skillRange": "",
  "schedule": "",
  "description": "I have been teaching for 5 years and specialize in Mathematics. I can teach Math and Science to students in Grade 9 and Grade 10. I have strong communication and problem-solving skills. My availability is Monday to Friday, 9am to 5pm.",
  "role": "Teacher",
  "roleId": 1
}


*/



})

app.listen(3000, () =>{
   console.log("listening")
})
