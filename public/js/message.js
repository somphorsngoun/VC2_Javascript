
document.body.style.background = 'white';
document.body.style.color = 'black';

let Start = document.querySelector('.start');
let space_Message = document.querySelector('.main');
let user_chatWith = localStorage.getItem('chat_with');

// display name url on your profile......................................................................................
let dataUser = JSON.parse(localStorage.getItem('UserInfo'));
let UserProfile = document.querySelector('.Profile');
let UserName = document.querySelector('#Name');
UserName.textContent = dataUser.username;
UserProfile.src = dataUser.url;

let GET_LOGIN_REQUEST = 'https://letschat-app-vc.herokuapp.com/';
// let GET_LOGIN_REQUEST = 'http://192.168.2.28:5000/';


// display message..............................................................................................................................................

let writeMessage = (Allmessage) => { 
  let fri_user = JSON.parse(localStorage.getItem('messageWith'));
  for (user of Allmessage){
    let spaceMessage = document.querySelector('.spaceMessage');
    let Message = document.createElement('div');
    let FriMessage = document.createElement('div');
    FriMessage.className = 'FriMessage';
    Message.className = 'myMessage';

    let P = document.createElement('p');
    P.textContent = user.message;
    if (user.bold === 'bold'){
      P.style.fontWeight = 'bold';
    }
    if (user.italic === 'italic'){
      P.style.fontStyle = 'italic';
    }
    if (user.underline === 'underline'){
      P.style.textDecoration = 'underline';
    }
    let span = document.createElement('span');
    span.textContent = user.time;
    let onwUser = JSON.parse(localStorage.getItem('UserInfo'));
    if (user.user === onwUser.username){
      if (user.message !== ''){
        Message.appendChild(P);
        Message.appendChild(span);
        spaceMessage.appendChild(Message);
        P.style.background = dataUser.color;
      }

    } else {
      if (user.message !== ''){
        FriMessage.appendChild(P);
        spaceMessage.appendChild(FriMessage);
        FriMessage.appendChild(span);
        P.style.background = fri_user.color;
      }

    }
    in_relation = false;
    lastMessage = user;
  }
  let chatArea = document.querySelector('.spaceMessage');
  chatArea.scrollTop = chatArea.scrollHeight - chatArea.clientHeight;
}
// get message and remove old message..............................................................................................................................................
let refresh = (response) => {
  let Allmessage = response.data;
  let old_message = document.querySelectorAll('.myMessage');
  let old_frimessage = document.querySelectorAll('.FriMessage');
  for (value of old_message){
    value.remove();

  }
  for (value of old_frimessage){
    value.remove();

  }
  writeMessage(Allmessage);
}
// Resuest all message.....................................................................................................................................
let send_message = () =>{
  let Allmessage = GET_LOGIN_REQUEST + 'messages'; 
  axios
    .get(Allmessage)
    .then(refresh)

    
}
// get data friend post server to request old message.....................................................................................................
let ChatWithtFri = (event) => {
    localStorage.setItem('chat_with', false);
    Start.style.display = 'none';
    space_Message.style.display = 'block';
    in_relation = true;
    localStorage.setItem('chat_with', false);
    console.log(event.target.children);

    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;
    let getUsercolor = event.target.children[4].textContent;
    let userIfo = JSON.parse(localStorage.getItem('UserInfo'));
    let Object = {
      user1: userIfo.username,
      user2: getUsername
    };

    let fri_object = {
      username: getUsername,
      url: getUserpic,
      color: getUsercolor
    }
    localStorage.setItem('messageWith', JSON.stringify(fri_object));
    let url = GET_LOGIN_REQUEST + 'checkChat';
    axios.post(url, Object).then(refresh)

    let friProfile = document.querySelector('.user');
    friProfile.src = getUserpic;
    let friName = document.querySelector('#name');
    friName.textContent = getUsername;
    let fripass = document.querySelector('#userPass');
    fripass.textContent = getUserpass;
    let fricolor = document.querySelector('#your_color');
    fricolor.textContent = getUsercolor;

    
    
  }
// get friend from server...................................................................................................
let MyFri = (response) => {
    let Myfriend = response.data;
    let MyFriends = document.querySelector('.MyFriends');
    let Remove = document.querySelectorAll('.MyFriends .OneUser')
    for (fri of Remove){
      fri.remove();
    }
    for (fri of Myfriend){
      let fridata = {
        username: fri.Name,
        password: fri.Password,
        color: fri.color,
        url: fri.url
      }
      MyFriends.appendChild(createFriend(fridata));
    }
    let wantAdd = document.querySelectorAll('.MyFriends .myprofile');
    
    for (let OneOf of wantAdd){
      OneOf.addEventListener('click', ChatWithtFri);

    }
  }
// click on user icon...................................................................................................
let UserFriend = () =>{
    let MyProfile = document.querySelector('.MyProfile');
    MyProfile.style.display = 'block';
    MyProfile.style.display = 'flex';
    let Friends = document.querySelector('.Friends');
    let MyFriends = document.querySelector('.MyFriends');
    MyFriends.style.display = 'block';
    Friends.style.display = 'none';
    let URL = GET_LOGIN_REQUEST + 'myFri';
    let User = JSON.parse(localStorage.getItem('UserInfo'));
    axios.post(URL,User).then(MyFri)
   }
// mode dark.................................................................................................
let selectMode = () =>{
    let start = document.querySelector('#start');

    if (Mymode){
      document.body.style.background = 'black';
      document.body.style.color = 'white';
      start.style.background = "rgba(226, 221, 221, 0.521)";
      Mymode = false;
    } else{
      document.body.style.background = 'White';
      document.body.style.color = 'black';
      Mymode = true;
    }
    
  }
 //Logout...............................................................................................................................
 let acc_logout = () => {
  let comfirm = confirm("Are you sure to logout your account");
   if (comfirm){
    window.location.href = '../index.html';
   }
 } 
 //............................................................................................................................... 
  let Chat = (res) => {
      console.log(123);
  }

// Get data friend when u click and post to server..............................................................................................................................
let selectFri = (event) =>{
    localStorage.setItem('chat_with', false);
    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;
    let getUsercolor = event.target.children[4].textContent;
    let url = GET_LOGIN_REQUEST + 'addTofriend';
    let UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    let Object = {
        my_userData: UserInfo,
        username: getUsername,
        password: getUserpass,
        color: getUsercolor,
        url: getUserpic
    };
   axios.post(url, Object)
   .then(Chat)
   let MyFriends = document.querySelector('.MyFriends');
   MyFriends.appendChild(createFriend(Object));
   localStorage.setItem('messageWith', JSON.stringify(Object));
   
   let main = document.querySelector('.main');
   main.style.display = 'block';
   let start = document.querySelector('.start');
   start.style.display = 'none';
   let friProfile = document.querySelector('.user');
   friProfile.src = getUserpic;
   let friName = document.querySelector('#name');
   friName.textContent = getUsername;
 
  }
// click one user that u want to add to your friend.............................................................................................................
let addTofriend = () =>{
    let wantAdd = document.querySelectorAll('.Friends .myprofile');
    
    for (let OneOf of wantAdd){
      OneOf.addEventListener('click', selectFri);

    }
  }
// Display user...................................................................................................
let createFriend = (user) => {

    let Profile = document.createElement('div');
    Profile.className = 'myprofile';
    let User = document.createElement('div');
    User.className = 'OneUser';
    let ProfileUser = document.createElement('img');
    ProfileUser.className = 'Profile';
    ProfileUser.src = user.url;
    let Password = document.createElement('p');
    Password.id = 'userPass';
    Password.textContent = user.password;
    let Name = document.createElement('p');
    Name.textContent = user.username;
    Name.id = 'Name';
    let pic = document.createElement('p');
    pic.textContent = user.url;
    pic.id = 'image';
    let your_color = document.createElement('p');
    your_color.textContent = user.color;
    your_color.id = 'your_color';
    let Sidebar = document.querySelector('.sidebar')
    Sidebar.appendChild(User);
    User.appendChild(Profile);
    Profile.appendChild(ProfileUser);
    Profile.appendChild(Name);
    Profile.appendChild(Password);
    Profile.appendChild(pic);
    Profile.appendChild(your_color);
    let hr = document.createElement('hr');
    User.appendChild(hr);

    return User;
  }
// get all user from server..........................................................................................................................................
  let AllUser = (response) =>{
    let userInfo = response.data;
    let MyUser = JSON.parse(localStorage.getItem('UserInfo'));
    let Friends = document.querySelector('.Friends');
    let MyFriends = document.querySelector('.MyFriends');
    MyFriends.style.display = 'none';
    Friends.style.display = 'block';

    // Remove old user...........................................................................................
    let Remove = document.querySelectorAll('.Friends .OneUser')
    for (fri of Remove){
      fri.remove();
    }
    // Loop to call createFriend() to display user.............................................................................................
    for (let user of userInfo){
      if (user.username !== MyUser.username || user.password !== MyUser.password){
        Friends.appendChild(createFriend(user));

      }
    
    }
    // call addTofriend() to add to user's friend..............................................................................................
    addTofriend();
  }
// REquest all user from servr...........................................................................................................
  let AddFriend = () => {
    let MyProfile = document.querySelector('.MyProfile');
    MyProfile.style.display = 'none';
    let URL = GET_LOGIN_REQUEST + 'AllUsers';
    axios.get(URL).then(AllUser)
  }

// Show emoji..................................................................................................
let imojis = (response) =>{
    let allSticker = response.data;
    let showImoji = document.querySelector('.showImoji');
    
    for (let stick of allSticker){
        let span = document.createElement('span');
        span.textContent = stick.character;
        showImoji.appendChild(span);
    }
    let clickemoji = document.querySelectorAll('.showImoji span');
    for (oneEmoji of clickemoji){
        oneEmoji.addEventListener('click',(event)=>{
            let MyMessage = document.querySelector('#writeMessage');
            MyMessage.value += event.target.textContent;
        })
    }
    
}

let emojiShow = true;
let stickers = document.querySelector('#sticker');
stickers.addEventListener('click', ()=>{
  let showImoji = document.querySelector('.showImoji');
  if (emojiShow){
    emojiShow = false
    showImoji.style.display = 'block'; 
  }else{
    showImoji.style.display = 'none';
    emojiShow = true;
  } 
});
let url = GET_LOGIN_REQUEST + 'emoji';
axios.get(url).then(imojis)
// Get message from server.......................................................................................................................
let sendMessage = (response) =>{
    let Allmessage = response.data;
    all_message = Allmessage;
    if (my_chat){
      let old_message = document.querySelectorAll('.myMessage');
      for (value of old_message){
        value.remove();

      }
    }
    writeMessage(Allmessage);
        
}

// Send function is the function that send message to server.................................................................................................................................
let Send = (e) =>{
    e.preventDefault();
    
    let MyMessage = document.querySelector('#writeMessage');
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    let friAccount = JSON.parse(localStorage.getItem("messageWith"));
    let today = new Date();
    let date = today.getHours() + ":" + today.getMinutes();
    let Tobold = '';
    if (setTobold === false){
      Tobold = 'bold';
    }
    let Toitalic = '';
    if (setToitalic === false){
      Toitalic = 'italic';
    }
    let Tounderline = '';
    if (setTounderline === false){
      Tounderline = 'underline';
    }
    let ObjectOfmessage = {
        user1: MyAccount.username,
        user2: friAccount.username,
        messages: [{
            user: MyAccount.username,
            time: date,
            bold: Tobold,
            italic: Toitalic,
            underline: Tounderline,
            message: MyMessage.value
        }]

    }
    let URL = GET_LOGIN_REQUEST + 'message';

    axios.post(URL, ObjectOfmessage).then(sendMessage)
    MyMessage.value = '';

  }

// Bold message...................................................................................................................................
let set_bold = (e) =>{
  e.preventDefault();
  let MyMessage = document.querySelector('#writeMessage');
  if (setTobold){
    bold.style.border = '1.5px solid black';
    setTobold = false;
    MyMessage.style.fontWeight = 'bold';
  }else{
    bold.style.border = '1px solid gray';
    MyMessage.style.fontWeight = 'none';
    setTobold = true;
  }

}
// Italic message...................................................................................................................................
let set_italic = (e) =>{
  e.preventDefault();
  let MyMessage = document.querySelector('#writeMessage');
  if (setToitalic){
    italic.style.border = '1.5px solid black';
    setToitalic = false;
    MyMessage.style.fontStyle = 'italic';
  }else{
    italic.style.border = '1px solid gray';
    MyMessage.style.fontStyle = 'none';
    setToitalic = true;
  }

}
// Underline message...................................................................................................................................
let set_underline = (e) =>{
  e.preventDefault();
  let MyMessage = document.querySelector('#writeMessage');
  if (setTounderline){
    underline.style.border = '1.5px solid black';
    setTounderline = false;
    MyMessage.style.textDecoration = 'underline';
  }else{
    underline.style.border = '1px solid gray';
    MyMessage.style.textDecoration = 'none';
    setTounderline = true;
  }

}
//  Main--------------------------------------------------------------------------------------------------------------------------------
let Mymode = true;
let in_relation = true;
let my_chat = false;
let setTobold = true;
let setToitalic = true;
let setTounderline = true;
let playSound = true;

let all_message = [];
let Mode = document.querySelector('#mode');
Mode.addEventListener('click', selectMode);

let addFriedns = document.querySelector('#add');
addFriedns.addEventListener('click', AddFriend);

let logout = document.querySelector('#logout');
logout.addEventListener('click', acc_logout);

let User_icon = document.querySelector('#user');
User_icon.addEventListener('click', UserFriend);
UserFriend();

let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);

let bold = document.querySelector('#bold');
bold.addEventListener('click', set_bold);

let italic = document.querySelector('#italic');
italic.addEventListener('click', set_italic);

let underline = document.querySelector('#underline');
underline.addEventListener('click', set_underline);

if (user_chatWith){
  Start.style.display = 'block';
  space_Message.style.display = 'none';
}else {
  console.log(321);
  Start.style.display = 'none';
  space_Message.style.display = 'block';
  let fri_account = JSON.parse(localStorage.getItem("messageWith"));
  let friProfile = document.querySelector('.user');
  friProfile.src = fri_account.url;
  let friName = document.querySelector('#name');
  friName.textContent = fri_account.username;
}


setInterval(send_message, 500);