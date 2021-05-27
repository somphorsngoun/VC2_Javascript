
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
      let onwUser = JSON.parse(localStorage.getItem('UserInfo'));
      if (user.user === onwUser.username){
        if (user.message !== ''){
          Message.appendChild(P);
          spaceMessage.appendChild(Message);
        }

      } else {
        if (user.message !== ''){
          FriMessage.appendChild(P);
          spaceMessage.appendChild(FriMessage);
        }

      }
      in_relation = false;
  

  }
}

let send_message = () =>{
    let Allmessage = GET_LOGIN_REQUEST +'/message';
    
  axios.get(Allmessage).then(refresh)

    
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
      let onwUser = JSON.parse(localStorage.getItem('UserInfo'));
      if (user.user === onwUser.username){
        if (user.message !== ''){
          Message.appendChild(P);
          spaceMessage.appendChild(Message);
        }

      } else {
        if (user.message !== ''){
          FriMessage.appendChild(P);
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
    let URL = GET_LOGIN_REQUEST + '/message';

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
    let URL = GET_LOGIN_REQUEST + '/myFri';
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
    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;
    console.log(getUsername, getUserpass);
    let url = GET_LOGIN_REQUEST +'/addTofriend';
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
   let URL = GET_LOGIN_REQUEST + '/chating';
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
    console.log(userInfo);
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
      console.log(user.username,MyUser.username);
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

    let URL = GET_LOGIN_REQUEST + '/AllUsers';
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
    let url = 'https://emoji-api.com/emojis?access_key=cf4a493302cc51c36d80aaaad6b102d9062df416';
    axios.get(url).then(imojis)
});
// .......................................................................................................................
let sendMessage = (response) =>{
    let Allmessage = response.data;
    all_message = Allmessage;
    // if (my_chat){
    //   let old_message = document.querySelectorAll('.myMessage');
    //   for (value of old_message){
    //     value.remove();

    //   }
    // }
    // for (user of Allmessage){
    //     let MyMessage = document.querySelector('#writeMessage');
    //     let spaceMessage = document.querySelector('.spaceMessage');
    //     let Message = document.createElement('div');
    //     let FriMessage = document.createElement('div');
    //     FriMessage.className = 'FriMessage';
    //     Message.className = 'myMessage';
        
    //     let span = document.createElement('span');
    //     span.textContent = user.time;
    //     let P = document.createElement('p');
    //     P.textContent = user.message;
        
    //     let onwUser = JSON.parse(localStorage.getItem('UserInfo'));
    //     if (user.message !== ''){
    //         if (user.user === onwUser.username){
    //             Message.appendChild(P);
    //             spaceMessage.appendChild(span);
    //             spaceMessage.appendChild(Message);

    //         } else {
    //             FriMessage.appendChild(P);
    //             spaceMessage.appendChild(FriMessage);
    //             spaceMessage.appendChild(span);

    //         }
    //     }
    // }
    // location.reload();
    
}

let Textmessage = (response) =>{
    let ChatWith = response.data;
    let MyMessage = document.querySelector('#writeMessage');
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    let friAccount = JSON.parse(localStorage.getItem("messageWith"));
    let today = new Date();
    let date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let ObjectOfmessage = {
        user1: MyAccount.username,
        user2: friAccount.username,
        messages: [{
            user: MyAccount.username,
            time: date,
            message: MyMessage.value
        }]

    }
    let URL = GET_LOGIN_REQUEST + '/message';

    axios.post(URL, ObjectOfmessage).then(sendMessage)
    MyMessage.value = '';

}
// .................................................................................................................................
let Send = (e) =>{
    e.preventDefault();
    
    let url = GET_LOGIN_REQUEST + '/chating';
    axios.get(url).then(Textmessage)

  }
// .................................................................................................................................
let chose_yourphoto = () =>{

}
//  --------------------------------------------------------------------------------------------------------------------------------
let Mymode = true;
let in_relation = true;
let my_chat = false;

let all_message = [];
let Mode = document.querySelector('#mode');
Mode.addEventListener('click', selectMode);

let addFriedns = document.querySelector('#add');
addFriedns.addEventListener('click', AddFriend);

let User_icon = document.querySelector('#user');
User_icon.addEventListener('click', UserFriend);

let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);

let choose_file = document.querySelector('#photo');
choose_file.addEventListener('click', chose_yourphoto);//..............


if (user_chatWith){
  console.log(123);
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