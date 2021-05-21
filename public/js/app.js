
const IP = "192.168.43.216";
const PORT = 5000;
const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT ;
// Function.........................................................................................................................
// .................................................................................................................................
let Send = (e) =>{
  e.preventDefault();
  let MyMessage = document.querySelector('#writeMessage');
  let spaceMessage = document.querySelector('.spaceMessage');
  let Message = document.createElement('div');
  Message.className = 'myMessage';
  Message.textContent = MyMessage.value;
  spaceMessage.appendChild(Message);

  
  
}

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
    console.log(response.data.url);
  }
// ..............................................................................................
  let Acount_login = () => {
    document.querySelector('form').style.display = 'none';
    document.body.style.background = 'WhiteSmoke';
    let Container = document.querySelector('.container');
    Container.style.display = 'block';
    Container.style.display = 'flex';

    if (IsTrue){
      let url = GET_LOGIN_REQUEST + '/users';
      axios.get(url).then(Userdata)
    }
  }
// .................................................................................................................
  let registerForm = (e) =>{
    e.preventDefault();
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.login').style.display = 'none';
  }
// ....................................................................................................
  let loginForm = (e) =>{
    e.preventDefault();
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.login').style.display = 'block';
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
          
        } else {
          Profile.src = '../image/user_boy.png';
          Image = '../image/user_boy.png';
        }
      })
    }
      dataUser = {
        username: UserName.value,
        password: Create_PassWord.value,
        email: Email.value,
        url: Image
      }
  
      let url = GET_LOGIN_REQUEST + '/register';
      axios
          .post(url,dataUser)
      
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
  // MAIN---------------------------------------------------------------------------------------------
let dataUser = {};
let IsTrue = false;

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

const login_form = document.querySelector('#login-form');
login_form.addEventListener('click', loginForm)

const btn_register = document.querySelector('#btn-register');
btn_register.addEventListener('click', register);

const btn_cacel = document.querySelector('#btn-cancel');
btn_cacel.addEventListener('click', Cancel);

let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);