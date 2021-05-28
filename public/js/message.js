
document.body.style.background = 'white';
document.body.style.color = 'black';

let Start = document.querySelector('.start');
let space_Message = document.querySelector('.main');
let user_chatWith = localStorage.getItem('chat_with');


let dataUser = JSON.parse(localStorage.getItem('UserInfo'));
let UserProfile = document.querySelector('.Profile');
let UserName = document.querySelector('#Name');
UserName.textContent = dataUser.username;
UserProfile.src = dataUser.url;


const IP = "192.168.1.3";
const PORT = 5000;
const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT ;

// let my_url = 'http://192.168.2.5:5000/users';
// let my_user = JSON.parse(localStorage.getItem('UserInfo'));
// axios.post(my_url, my_user)


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
  for (user of Allmessage){
      let MyMessage = document.querySelector('#writeMessage');
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
        }

      } else {
        if (user.message !== ''){
          FriMessage.appendChild(P);
          spaceMessage.appendChild(FriMessage);
          FriMessage.appendChild(span);
        }

      }
      in_relation = false;
  

  }
}

let send_message = () =>{
  let Allmessage = 'http://192.168.1.22:5000/messages'; 
  axios
    .get(Allmessage)
    .then(refresh)

    
}
// ............................................................................................................
let sendmessage = (response) =>{
  let Allmessage = response.data;
  all_message = response.data;
  if (my_chat){
    let old_message = document.querySelectorAll('.myMessage');
    for (value of old_message){
      value.remove();

    }
  }
  if (in_relation){
    for (user of Allmessage){
      let MyMessage = document.querySelector('#writeMessage');
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
        }

      } else {
        if (user.message !== ''){
          FriMessage.appendChild(P);
          FriMessage.appendChild(span);
          spaceMessage.appendChild(FriMessage);
        }

      }
      in_relation = false;
      my_chat = true;
  }

  }
  
}
// ................................................................................................................
let text_message = () =>{
  console.log(12345567);

    // let ChatWith = response.data;
    let MyMessage = document.querySelector('#writeMessage');
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    let friAccount = JSON.parse(localStorage.getItem("messageWith"));
    let ObjectOfmessage = {
        user1: MyAccount.username,
        user2: friAccount.username,
        messages: [{
            user: MyAccount.username,
            message: MyMessage.value
        }]

    }
    console.log(ObjectOfmessage);
    let URL = 'http://192.168.1.22:5000/message';

    axios.post(URL, ObjectOfmessage).then(sendmessage)
    MyMessage.value = '';

}
// .....................................................................................................
let ChatWithtFri = (event) => {
    localStorage.setItem('chat_with', false);
    Start.style.display = 'none';
    space_Message.style.display = 'block';
    in_relation = true;
    localStorage.setItem('chat_with', false);
    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;

    let Object = {
      username: getUsername,
      password: getUserpass,
      url: getUserpic
    };
    localStorage.setItem('messageWith', JSON.stringify(Object));
    console.log(Object);
    // let url = GET_LOGIN_REQUEST + '/chating';
    // axios.post(url, Object).then(text_message)
    text_message();


    let friProfile = document.querySelector('.user');
    friProfile.src = getUserpic;
    let friName = document.querySelector('#name');
    friName.textContent = getUsername;
    let fripass = document.querySelector('#userPass');
    fripass.textContent = getUserpass;

    
    
  }
// ...................................................................................................
let MyFri = (response) => {
    let Myfriend = response.data;
    console.log(Myfriend);
    let MyFriends = document.querySelector('.MyFriends');
    let Remove = document.querySelectorAll('.MyFriends .OneUser')
    for (fri of Remove){
      fri.remove();
    }
    for (fri of Myfriend){
      let fridata = {
        username: fri.Name,
        password: fri.Password,
        url: fri.url
      }
      MyFriends.appendChild(createFriend(fridata));
      // MyFriends.appendChild();
    }
    let wantAdd = document.querySelectorAll('.MyFriends .myprofile');
    
    for (let OneOf of wantAdd){
      OneOf.addEventListener('click', ChatWithtFri);

    }
  }
// ...................................................................................................
let UserFriend = () =>{
    let MyProfile = document.querySelector('.MyProfile');
    MyProfile.style.display = 'block';
    MyProfile.style.display = 'flex';
    let Friends = document.querySelector('.Friends');
    let MyFriends = document.querySelector('.MyFriends');
    MyFriends.style.display = 'block';
    Friends.style.display = 'none';
    let URL = 'http://192.168.1.22:5000/myFri';
    let User = JSON.parse(localStorage.getItem('UserInfo'));
    axios.post(URL,User).then(MyFri)
   }
// .................................................................................................
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
  let Chat = (res) => {
      console.log(123);
  }

// ...................................................................................................
let selectFri = (event) =>{
    localStorage.setItem('chat_with', false);
    console.log(123);
    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;
    console.log(getUsername, getUserpass);
    let url = 'http://192.168.1.22:5000/addTofriend';
    let UserInfo = JSON.parse(localStorage.getItem('UserInfo'));
    console.log(UserInfo);
    let Object = {
        my_userData: UserInfo,
        username: getUsername,
        password: getUserpass,
        url: getUserpic
    };
   axios.post(url, Object)
   .then(Chat)
   let MyFriends = document.querySelector('.MyFriends');
   MyFriends.appendChild(createFriend(Object));
   localStorage.setItem('messageWith', JSON.stringify(Object));
   let URL = 'http://192.168.1.22:5000/chating';
     axios.post(URL, Object).then(Chat)
   
   let main = document.querySelector('.main');
   main.style.display = 'block';
   let start = document.querySelector('.start');
   start.style.display = 'none';
   let friProfile = document.querySelector('.user');
   friProfile.src = getUserpic;
   let friName = document.querySelector('#name');
   friName.textContent = getUsername;
 
  }
// .............................................................................................................
let addTofriend = () =>{
    let wantAdd = document.querySelectorAll('.Friends .myprofile');
    
    for (let OneOf of wantAdd){
      OneOf.addEventListener('click', selectFri);

    }
  }
// ...................................................................................................
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
    let Sidebar = document.querySelector('.sidebar')
    Sidebar.appendChild(User);
    User.appendChild(Profile);
    Profile.appendChild(ProfileUser);
    Profile.appendChild(Name);
    Profile.appendChild(Password);
    Profile.appendChild(pic);
    let hr = document.createElement('hr');
    User.appendChild(hr);
    return User;
  }
// ..........................................................................................................................................
  let AllUser = (response) =>{
    let userInfo = response.data;
    console.log(321);
    let MyUser = JSON.parse(localStorage.getItem('UserInfo'));
    let Friends = document.querySelector('.Friends');
    let MyFriends = document.querySelector('.MyFriends');
    MyFriends.style.display = 'none';
    Friends.style.display = 'block';

    let Remove = document.querySelectorAll('.Friends .OneUser')
    for (fri of Remove){
      fri.remove();
    }
    for (let user of userInfo){
      console.log(user.url);
      if (user.username !== MyUser.username || user.password !== MyUser.password){
        Friends.appendChild(createFriend(user));

      }
    
    }
    addTofriend();
  }
// ...........................................................................................................
  let AddFriend = () => {
    let MyProfile = document.querySelector('.MyProfile');
    MyProfile.style.display = 'none';
    let URL = 'http://192.168.1.22:5000/AllUsers';
    axios.get(URL).then(AllUser)
  }

// ..................................................................................................
let imojis = (response) =>{
    let allSticker = response.data;
    let showImoji = document.querySelector('.showImoji');
    if (emojiShow){
        emojiShow = false
        // let showImoji = document.querySelector('.showImoji');
        showImoji.style.display = 'block';
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
    }else{
        showImoji.style.display = 'none';
    }
}

let emojiShow = true;
let stickers = document.querySelector('#sticker');
stickers.addEventListener('click', ()=>{
  console.log(234567890);
    let url = 'https://emoji-api.com/emojis?access_key=cf4a493302cc51c36d80aaaad6b102d9062df416';
    axios.get(url).then(imojis)
});
// .......................................................................................................................
let sendMessage = (response) =>{
    let Allmessage = response.data;
    all_message = Allmessage;
    if (my_chat){
      let old_message = document.querySelectorAll('.myMessage');
      for (value of old_message){
        value.remove();

      }
    }
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
        if (user.message !== ''){
            if (user.user === onwUser.username){
              
                Message.appendChild(P);
                Message.appendChild(span);
                spaceMessage.appendChild(Message);

            } else {
                FriMessage.appendChild(P);
                FriMessage.appendChild(span);
                spaceMessage.appendChild(FriMessage);

            }
        }
    }
    // location.reload();
    
}

let Textmessage = (response) =>{
    let ChatWith = response.data;
    let MyMessage = document.querySelector('#writeMessage');
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    let friAccount = JSON.parse(localStorage.getItem("messageWith"));
    let today = new Date();
    let date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
    let URL = 'http://192.168.1.22:5000/message';

    axios.post(URL, ObjectOfmessage).then(sendMessage)
    MyMessage.value = '';

}
// .................................................................................................................................
let Send = (e) =>{
    e.preventDefault();
    
    let url = 'http://192.168.1.22:5000/chating';
    axios.get(url).then(Textmessage)

  }
// .................................................................................................................................
let chose_yourphoto = (response) =>{
  console.log(321);
  localStorage.setItem('AllOfuser', JSON.stringify(response.data));
}
let checked_name = (word) =>{
  console.log(word);
}
// .................................................................................................................................
let same_name = (word) => {
  
  let URL = GET_LOGIN_REQUEST + '/AllUsers';
  axios.get(URL).then(chose_yourphoto)
  // for (user of all_user){
  //   let name = user.username.toLocaleLowerCase();
  // //   if (name.indexOf(word)){
      
  // // }
  // }
  checked_name(word);
}
// .................................................................................................................................
let search_chat = () => {
  let word = search.value.toLocaleLowerCase();
  same_name(word);
}
// ...................................................................................................................................
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
// ...................................................................................................................................
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
// ...................................................................................................................................
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
//  --------------------------------------------------------------------------------------------------------------------------------
let Mymode = true;
let in_relation = true;
let my_chat = false;
let setTobold = true;
let setToitalic = true;
let setTounderline = true;
let word_friName = '';

let all_message = [];
let Mode = document.querySelector('#mode');
Mode.addEventListener('click', selectMode);

let addFriedns = document.querySelector('#add');
addFriedns.addEventListener('click', AddFriend);

let User_icon = document.querySelector('#user');
User_icon.addEventListener('click', UserFriend);

let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);

let bold = document.querySelector('#bold');
bold.addEventListener('click', set_bold);

let italic = document.querySelector('#italic');
italic.addEventListener('click', set_italic);

let underline = document.querySelector('#underline');
underline.addEventListener('click', set_underline);

let search = document.querySelector('#search');
search.addEventListener('keyup', search_chat);

let choose_file = document.querySelector('#photo');
choose_file.addEventListener('click', chose_yourphoto);//.............

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
  text_message();
}


setInterval(send_message, 500);