// const axios = require("axios");


let Textmessage = (response) =>{
    let ChatWith = response.data;
    let MyMessage = document.querySelector('#writeMessage');
    console.log(MyMessage.value)
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    console.log(ChatWith);
    let ObjectOfmessage = {
        user1: MyAccount.username,
        user2: ChatWith.username,
        messages: [{
            user: MyAccount.username,
            id: NumOfId,
            message: MyMessage.value
        }]

    }
    let URL = 'http://192.168.43.216:5000/message';

    axios.post(URL, ObjectOfmessage)
    MyMessage.value = '';

}
// .................................................................................................................................
let Send = (e) =>{
    e.preventDefault();
    let MyMessage = document.querySelector('#writeMessage');
    let spaceMessage = document.querySelector('.spaceMessage');
    let Message = document.createElement('div');
    Message.className = 'myMessage';
    let P = document.createElement('p');
    P.textContent = MyMessage.value;
    Message.appendChild(P);
    spaceMessage.appendChild(Message);

    let url = 'http://192.168.43.216:5000/chating';
    axios.get(url).then(Textmessage)
    
  }
  



let NumOfId = 1;
let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);