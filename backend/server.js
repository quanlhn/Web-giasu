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
   password: "123",
   database: "signup",
   port:'8111'
})

db.connect(function(err) {
   if (err) throw err;
   console.log("Connected");

 });

app.post('/api/register',(req,res) =>{
   
   const { name, email, phone, password, role, gender, birth } = req.body;

   const sql = "INSERT INTO login (name, email, phone, password, role, gender, birth) VALUES (?, ?, ?, ?, ?, ?, ?)";
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

app.listen(3000, () =>{
   console.log("listening")
})