
// const IP = "192.168.1.22";
// const PORT = 5000;
// const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT ;
let GET_LOGIN_REQUEST = 'https://letschat-app-vc.herokuapp.com/';

// ..................................................................................................................................
function login(e) {
    e.preventDefault();
    // 1- TODO: Create the REQUEST
    let querry = GET_LOGIN_REQUEST+'login?username='+username.value+ '&password=' + password.value;
    axios.get(querry).then((response) => {
      let isValid = response.data.isValid;
      let text = "not vlaid";
      let color = "red";
      my_account = false;
      if (isValid){
        IsTrue = true;
        localStorage.setItem('UserInfo', JSON.stringify(response.data.myUser));
        window.location.href = '../about.html';
      }
      message.textContent = text;
      message.style.color = color;
      
    });
  }

// ..............................................................................................

// // ..........................................................................................................
// function preview_image(event) 
//         {
//           set_photo = false;
//           let reader = new FileReader();
//           let output = document.querySelector('.profile');
//           reader.onload = function()
//             {
//               output.src = reader.result;
//               dataUser = {
//                 username: UserName.value,
//                 password: Create_PassWord.value,
//                 email: Email.value,
//                 url: output.src,
//                 friends: []
//                 }
        //       localStorage.setItem('UserInfo', JSON.stringify(dataUser));
            
        //       let url = GET_LOGIN_REQUEST + '/register';
        //       axios
        //           .post(url, dataUser)

        //       }
        //   reader.readAsDataURL(event.target.files[0]);
        // }
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

        // let br2 = document.createElement('br');
        // set_profile.appendChild(br2);
        // let choosePic = document.createElement('input');
        // choosePic.type = 'file';
        // choosePic.id = 'chooseImage';
        // set_profile.appendChild(choosePic);

        let A = document.createElement('a');
        A.href = 'about.html';
        set_profile.appendChild(A);

        let Countinuce = document.createElement('button');
        Countinuce.id = 'countinuce';
        Countinuce.textContent = 'Coutinuce';
        A.appendChild(Countinuce);

        // choosePic.addEventListener('change', preview_image);
        
      // if (set_photo){
        dataUser = {
          username: UserName.value,
          password: Create_PassWord.value,
          email: Email.value,
          url: '../image/user_girl.png',
          friends: []
        }
        localStorage.setItem('UserInfo', JSON.stringify(dataUser));
        let url = GET_LOGIN_REQUEST + '/register';
        axios
            .post(url, dataUser)
      // }
        
    }
    
  }
// .............................................................................................................
  let registerForm = (e) =>{
    e.preventDefault();
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.login').style.display = 'none';
  }

// .................................................................................................
let Cancel = (e) =>{
    e.preventDefault();
    UserName.value = '';
    Create_PassWord.value = '';
    Comfirm_PassWord.value = '';
    Email.value = '';
  }
// --------------------------------------------------------------------------------------------------
let dataUser = {};
let set_photo = true;

localStorage.setItem('chat_with', true);
localStorage.setItem('UserInfo', JSON.stringify([]));
localStorage.setItem('messageWith', JSON.stringify([]));

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