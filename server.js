const { query } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');


app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

let data = {};
let users = JSON.parse(fs.readFileSync('users_data.json'));
// login request path
app.use("/login", (req, res) => {
    //TODO: 
    //1. try to get the username and password from the query of the request.
    let username = req.query.username;
    let password = req.query.password;
    //2. Check user and password if valid return true otherwise return false.
    let isValid = false;
    for (let user of users){
      if (username === user.username && password === user.password){
        isValid = true;
        data = user;
      }
    }
    res.send(isValid);
  });

app.post('/register', (req,res) => {
    users.push(req.body);
    
    fs.writeFileSync('users_data.json', JSON.stringify(users));
})
 
app.get('/users', (req, res) => {
  res.send(data);
})

app.get('/AllUsers', (req, res) => {
  res.send(users);
})

app.post('/addTofriend', (req,res) =>{
  let Username = req.body.username;
  let Userpass = req.body.password;
  // let Userurl = req.body.url;
  console.log(req.body);
  let Friend = {};
  let IsTrue = true;
  for (user of users){
    if (user.username === Username && user.password === Userpass){
      Friend = user;
    }
  }
  for (fri of users){
    if (fri.username === data.username && fri.password === data.password){
      let friUser = {
        Name: Friend.username,
        Password: Friend.password,
        url: Friend.url
      }
      for (user of fri.friends){
        if (user.Name === friUser.Name && user.Password === friUser.Password){
          IsTrue = false;
        }
      }
      if (IsTrue){
        fri.friends.push(friUser);

      }
      console.log(fri.friends);

    }
  }
  fs.writeFileSync('users_data.json', JSON.stringify(users));

})

let Data = {};
app.post('/myFri', (req, res) => {
  Data = req.body;
  
})
app.get('/myFri', (req,res) =>{
  for (user of users){
    if (user.username === Data.username && user.password === Data.password){
      res.send(user.friends);
    }
  }
})

let Chating = {};
app.post('/chating', (req, res) => {
  Chating = req.body;
})
app.get('/chating', (req, res) => {
  res.send(Chating);
})


app.post('/message', (req, res) =>{
  let Message = req.body;
  let Usermessage = JSON.parse(fs.readFileSync('user_message.json'));
  if (Usermessage.length === 0){
    Usermessage.push(Message);
  }
  fs.writeFileSync('user_message.json', JSON.stringify(Usermessage));

})