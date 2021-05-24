// const axios = require("axios");

const IP = "192.168.43.216";
const PORT = 5000;
const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT ;
// Function.........................................................................................................................
// .................................................................................................................................

// ..................................................................................................................................
function login(e) {
    e.preventDefault();
    // 1- TODO: Create the REQUEST
    let querry = GET_LOGIN_REQUEST+'/login?username='+username.value+ '&password=' + password.value;
    axios.get(querry).then((response) => {
      let isValid = response.data;
      let text = "not vlaid";
      let color = "red";
  
      if (isValid){
        IsTrue = true;
        Acount_login();
      }
      message.textContent = text;
      message.style.color = color;
      
    });
  }
// ..............................................................................................
  let Userdata = (response)=> {
    localStorage.setItem('UserInfo', JSON.stringify(response.data));
    let UserProfile = document.querySelector('.Profile');
    let UserName = document.querySelector('#Name');
    UserName.textContent = response.data.username;
    UserProfile.src = response.data.url;
    IsTrue = false;

  }
// ..............................................................................................
  let Acount_login = () => {
    document.querySelector('form').style.display = 'none';
    document.body.style.background = 'WhiteSmoke';
    let Container = document.querySelector('.container');
    Container.style.display = 'block';
    Container.style.display = 'flex';
    let Start = document.querySelector('.start');
    Start.style.display = 'block';
    document.querySelector('.main').style.display = 'none';

    if (IsTrue){
      let url = GET_LOGIN_REQUEST + '/users';
      axios.get(url).then(Userdata)
    }else {
      let UserProfile = document.querySelector('.Profile');
      let UserName = document.querySelector('#Name');
      UserName.textContent = dataUser.username;
      UserProfile.src = dataUser.url;
    }
  }
// .................................................................................................................
  let registerForm = (e) =>{
    e.preventDefault();
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.login').style.display = 'none';
  }

// ..........................................................................................................
  let setPhotos = () =>{
    let Myprofile = document.querySelector('.profile');
    let Image = document.querySelector('#chooseImage').value;
    Myprofile.src = URL.createObjectURL(Image);
    console.log(Image);
        

  }
// ..............................................................................................
  let Acount = (e) => {
    e.preventDefault();

    document.querySelector('.save-profile').style.display = 'none';
    
    Acount_login();

  }
// ................................................................................................
  let radiocheck = () => {
    let radios = document.querySelectorAll('input[name=radio]');
    let Profile = document.querySelector('.profile');
    let Image = '../image/user_girl.png';
    for (value of radios){
      value.addEventListener('change', ()=>{
        if (value.checked.value === 'Woman'){
          Profile.src = '../image/user_girl.png';
          Image = '../image/user_girl.png';
          
        } else {          Profile.src = '../image/user_boy.png';
          Image = '../image/user_boy.png';
        }   
      })
    }

    dataUser = {
        username: UserName.value,
        password: Create_PassWord.value,
        email: Email.value,
        url: Image,
        friends: []
      }
    localStorage.setItem('UserInfo', JSON.stringify(dataUser));
    
  
    let url = GET_LOGIN_REQUEST + '/register';
    axios.post(url,dataUser)
      
  }
  
// ................................................................................................
  let register = (e) =>{
    e.preventDefault();
    
    if (Create_PassWord.value !== Comfirm_PassWord.value){
        wrong_password.textContent = 'Wrong Password';
        wrong_password.style.color = 'red';
        
    }else {
        document.querySelector('form').style.display = 'none';
        let set_profile = document.createElement('div');
        set_profile.className = 'save-profile';
        document.body.appendChild(set_profile);
        let profile = document.createElement('img');
        profile.className = 'profile';
        set_profile.appendChild(profile);
        let br3 = document.createElement('br');
        set_profile.appendChild(br3);

        let userGirl = document.createElement('input');
        userGirl.type = 'radio';
        userGirl.name = 'radio';
        userGirl.value = 'girl';
        set_profile.appendChild(userGirl);
        let label1 = document.createElement('label');
        label1.textContent = 'Woman';
        set_profile.appendChild(label1);
        let userBoy = document.createElement('input');
        userBoy.type = 'radio';
        userBoy.name = 'radio';
        userBoy.value = 'boy';
        set_profile.appendChild(userBoy);
        let label2 = document.createElement('label');
        label2.textContent = 'Man';
        set_profile.appendChild(label2);

        radiocheck();
        // let choosePic = document.createElement('input');
        // choosePic.type = 'file';
        // choosePic.id = 'chooseImage';
        // set_profile.appendChild(choosePic);
        // let br1 = document.createElement('br');
        // set_profile.appendChild(br1);

        // let addPhoto = document.createElement('button');
        // addPhoto.id = 'choosePhoto';
        // addPhoto.textContent = 'Add photo';
        // set_profile.appendChild(addPhoto);

        let br2 = document.createElement('br');
        set_profile.appendChild(br2);

        let Countinuce = document.createElement('button');
        Countinuce.id = 'countinuce';
        Countinuce.textContent = 'Coutinuce';
        set_profile.appendChild(Countinuce);

        // addPhoto.addEventListener('click', setPhotos);
        Countinuce.addEventListener('click', Acount);

           
    }
    
  }
// .................................................................................................
  let Cancel = (e) =>{
    e.preventDefault();
    UserName.value = '';
    Create_PassWord.value = '';
    Comfirm_PassWord.value = '';
    Email.value = '';
  }
// ...................................................................................................
  let Chat = () => {
    console.log(123);
  }
// ...................................................................................................
 let selectFri = (event) =>{
   let getUsername = event.target.children[1].textContent;
   let getUserpass = event.target.children[2].textContent;
   let getUserpic = event.target.children[3].textContent;
   console.log(getUsername, getUserpass);
   let url = 'http://192.168.43.216:5000/addTofriend';
  let Object = {
    username: getUsername,
    password: getUserpass,
    url: getUserpic
  };

  axios.post(url, Object)
  .then(Chat)
  let MyFriends = document.querySelector('.MyFriends');
  MyFriends.appendChild(createFriend(Object));

  localStorage.setItem('messageWith', JSON.stringify(Object));
  let URL = 'http://192.168.43.216:5000/chating';
    axios.post(URL, Object)

  
  let main = document.querySelector('.main');
  main.style.display = 'block';
  let start = document.querySelector('.start');
  start.style.display = 'none';
  let friProfile = document.querySelector('.user');
  friProfile.src = getUserpic;
  let friName = document.querySelector('#name');
  friName.textContent = getUsername;

  

  

 }
// ...................................................................................................
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
// ...................................................................................................
  let AllUser = (response) =>{
    let userInfo = response.data;
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
    if (user.username !== MyUser.username && user.password !== MyUser.password){

      Friends.appendChild(createFriend(user));

    }
    
    }
    addTofriend();
  }
// ...................................................................................................
  let AddFriend = () => {
    let MyProfile = document.querySelector('.MyProfile');
    MyProfile.style.display = 'none';

    let URL = 'http://192.168.43.216:5000/AllUsers';
    axios.get(URL).then(AllUser)
  }
// .....................................................................................................
  let ChatWithtFri = (event) => {
    let getUsername = event.target.children[1].textContent;
    let getUserpass = event.target.children[2].textContent;
    let getUserpic = event.target.children[3].textContent;

    let Object = {
      username: getUsername,
      password: getUserpass,
      url: getUserpic
    };
    console.log(Object);
    localStorage.setItem('messageWith', JSON.stringify(Object));
    let url = 'http://192.168.43.216:5000/chating';
    axios.post(url, Object)

    let main = document.querySelector('.main');
    main.style.display = 'block';
    let start = document.querySelector('.start');
    start.style.display = 'none';
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
    // for (fri of Remove){
    //   fri.remove();
    // }
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
  let URL = 'http://192.168.43.216:5000/myFri';
  let User = JSON.parse(localStorage.getItem('UserInfo'));
  axios.post(URL,User).then(MyFri)
  axios.get(URL).then(MyFri)
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
// MAIN---------------------------------------------------------------------------------------------
let dataUser = {};
let IsTrue = false;
let Isstart = true;
let Mymode = true;

const message = document.querySelector("#message");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const btn_login = document.querySelector("#btn_login");

const UserName = document.querySelector('#userName');
const Create_PassWord = document.querySelector('#passWord');
const Comfirm_PassWord = document.querySelector('#comfirm-passWord');
const Email = document.querySelector('#email');
const wrong_password = document.querySelector('#wrong-password');

btn_login.addEventListener("click", login);

const register_form = document.querySelector('#register-form');
register_form.addEventListener('click', registerForm);

const btn_register = document.querySelector('#btn-register');
btn_register.addEventListener('click', register);

const btn_cacel = document.querySelector('#btn-cancel');
btn_cacel.addEventListener('click', Cancel);

let addFriedns = document.querySelector('#add');
addFriedns.addEventListener('click', AddFriend);

let Mode = document.querySelector('#mode');
Mode.addEventListener('click', selectMode);

let User_icon = document.querySelector('#user');
User_icon.addEventListener('click', UserFriend);

let today = new Date();

let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' / ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
console.log(date);