const { text } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');


app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

let my_data = {};
let users = JSON.parse(fs.readFileSync('users_data.json'));
// login request path
app.use("/login", (req, res) => {
    // get the username and password from the query of the request............................
    let username = req.query.username;
    let password = req.query.password;
    //Check user and password if valid .......................................................
    let isValid = false;
    for (let user of users){
      if (username === user.username && password === user.password){
        isValid = true;
        my_data = user;
      }
    }
    let login = {
      myUser: my_data,
      isValid: isValid
    }
    res.send(login);
 });
// When u register account write on user_data.json ...............................................................................................................
app.post('/register', (req,res) => {
  let signin = req.body;
  let sameName = true;
  if (users.length === 0){
    users.push(signin);
  }else{
    for(let user of users){
      if (user.username === signin.username && user.password === signin.password){
        sameName = false;
      }
    }
    if (sameName){
      users.push(signin);
    }
  }

  fs.writeFileSync('users_data.json', JSON.stringify(users));
  res.send(users);
})
// send all user when client request...................................................................................
app.get('/AllUsers', (req, res) => {
  res.send(users);
})
// when u add more friend.........................................................................................
app.post('/addTofriend', (req,res) =>{
  let Username = req.body.username;
  let Userpass = req.body.password;
  my_data = req.body.my_userData;
  let Friend = {};
  let IsTrue = true;
  // check user to get more data
  for (user of users){
    if (user.username === Username && user.password === Userpass){
      Friend = user;
    }
  }
  // check user to add friend
  for (fri of users){
    if (fri.username === my_data.username && fri.password === my_data.password){
      let friUser = {
        Name: Friend.username,
        color: Friend.color,
        Password: Friend.password,
        url: Friend.url
      }

      if (fri.friends.length === 0){
        fri.friends.push(friUser);
        IsTrue = false;
      }
      for (user of fri.friends){
        if (user.Name === friUser.Name && user.Password === friUser.Password){
          IsTrue = false;
        }
      }
      if (IsTrue){
        console.log(123321);
        fri.friends.push(friUser);
        IsTrue = true;
      }

    }
  }
  // check if we ever chat before get old message to display
  let Usermessage = JSON.parse(fs.readFileSync('user_message.json'));
  let isTrue = true;
  if (Usermessage.length !== 0){
    for (user of Usermessage){
      if (user.user1 === my_data.username && user.user2 === Username || user.user1 === Username && user.user2 === my_data.username){
        fs.writeFileSync('message.json', JSON.stringify(user.messages)); 
        isTrue = false;

      }
    }
  }
  if (isTrue){
    let object = {
      user1: my_data.username,
      user2: Username,
      messages:[]
    }
    let array = JSON.parse(fs.readFileSync('user_message.json'));
    array.push(object)
    fs.writeFileSync('user_message.json', JSON.stringify(array));

  }

  fs.writeFileSync('users_data.json', JSON.stringify(users));

})
// get user name to check friend and send all friend back.......................................................
let fri_data = {};
app.post('/myFri', (req, res) => {
  fri_data = req.body;
  for (user of users){
    if (user.username === fri_data.username && user.password === fri_data.password){
      res.send(user.friends);
    }
  }
})

// check name of chat that we ever chat and write to message.json, read and send old message back.........................
app.post('/checkChat', (req,res)=>{
  let user_infor = req.body;
  let all_message = JSON.parse(fs.readFileSync('user_message.json'));
  for (oldmessage of all_message){
    if (user_infor.user1 === oldmessage.user1 && user_infor.user2 === oldmessage.user2 || user_infor.user1 === oldmessage.user2 && user_infor.user2 == oldmessage.user1){
      fs.writeFileSync('message.json', JSON.stringify(oldmessage.messages));
      console.log(123);
      res.send(JSON.parse(fs.readFileSync('message.json')));
    }
  }
})

// when u send message it will push to your old message.........................................................
app.post('/message', (req, res) =>{
  let Message = req.body;
  let isTrue = true;
  let chatWith = [];
  let Usermessage = JSON.parse(fs.readFileSync('user_message.json'));
  if (Usermessage.length === 0){
    Usermessage.push(Message);
    fs.writeFileSync('message.json', JSON.stringify(Message.messages));
    isTrue = false;
  }else {
    for (user of Usermessage){
      if (user.user1 === Message.user1 && user.user2 === Message.user2 || user.user1 === Message.user2 && user.user2 === Message.user1){
        user.messages.push(Message.messages[0]);
        isTrue = false;
        chatWith = user.messages;
        fs.writeFileSync('message.json', JSON.stringify(user.messages));


      }
    }
  }
  if (isTrue){
    Usermessage.push(Message);
  }
  fs.writeFileSync('user_message.json', JSON.stringify(Usermessage));
  res.send(chatWith);
})
// read message.json for send back to display.................................................................................
app.get('/messages', (req, res) => {
  res.send(JSON.parse(fs.readFileSync('message.json')));
})
// read emoji.json and send back to display emoji..............................................................................
app.get('/emoji', (req, res)=> {
  let sticker = JSON.parse(fs.readFileSync('emoji.json'));
  res.send(sticker);
})
