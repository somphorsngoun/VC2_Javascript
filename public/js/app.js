
const IP = "192.168.43.216";
const PORT = 5000;
const GET_LOGIN_REQUEST = "http://" + IP + ":" + PORT ;

function login(e) {
    e.preventDefault();
    console.log(23132);
    // 1- TODO: Create the REQUEST
     // put the correct request;
    let querry = GET_LOGIN_REQUEST+'/login?username='+username.value+ '&password=' + password.value;
    axios.get(querry).then((response) => {
      let isValid = response.data;
      console.log(isValid);
      let text = "not vlaid";
      let color = "red";
  
      //2- TODO: check to change color to green and text= "Login success!" if login success.
      if (isValid){
        text = 'Login success!';
        color = 'green';
      }
      message.textContent = text;
      message.style.color = color;
    });
  }

  let registerForm = (e) =>{
    e.preventDefault();
    document.querySelector('.register').style.display = 'block';
    document.querySelector('.login').style.display = 'none';
  }

  let setPhotos = () =>{
      let Myprofile = document.querySelector('.profile');
      let Image = document.querySelector('#chooseImage').value;
      Myprofile.src = URL.createObjectURL(Image);
    console.log(Image);

    let dataUser = {
        username: UserName.value,
        password: Create_PassWord.value,
        email: Email.value,
        url: Image
    }

    let url = GET_LOGIN_REQUEST + '/register';
    axios
        .post(url,dataUser)
        

  }

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

        let choosePic = document.createElement('input');
        choosePic.type = 'file';
        choosePic.id = 'chooseImage';
        set_profile.appendChild(choosePic);
        let br1 = document.createElement('br');
        set_profile.appendChild(br1);

        let addPhoto = document.createElement('button');
        addPhoto.id = 'choosePhoto';
        addPhoto.textContent = 'Add photo';
        set_profile.appendChild(addPhoto);

        let br2 = document.createElement('br');
        set_profile.appendChild(br2);

        addPhoto.addEventListener('click', setPhotos)


    }
    
  }

  let Cancel = (e) =>{
    e.preventDefault();
    UserName.value = '';
    Create_PassWord.value = '';
    Comfirm_PassWord.value = '';
    Email.value = '';
  }
  // MAIN---------------------------------------------------------------------------------------------
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