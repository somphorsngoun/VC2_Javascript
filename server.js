const { query } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');


app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));


let users = JSON.parse(fs.readFileSync('users_data.json'));
// login request path
app.use("/login", (req, res) => {
    //TODO: 
    //1. try to get the username and password from the query of the request.
    let username = req.query.username;
    let password = req.query.password;
    console.log(username, password);
    //2. Check user and password if valid return true otherwise return false.
    let isValid = false;
    for (let user of users){
      if (username === user.username && password === user.password){
        isValid = true;
      }
    }
    res.send(isValid);
  });

app.post('/register', (req,res) => {
    console.log(req.body);
    users.push(req.body);
    
    fs.writeFileSync('users_data.json', JSON.stringify(users));
})
