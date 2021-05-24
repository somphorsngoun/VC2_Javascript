// const axios = require("axios");


let sendMessage = (response) =>{
    console.log(response);
    let Allmessage = response.data;
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
        if (user.message !== ''){
            if (user.user === onwUser.username){
                Message.appendChild(P);
                spaceMessage.appendChild(Message);

            } else {
                FriMessage.appendChild(P);
                spaceMessage.appendChild(FriMessage);

            }
        }
    }
    
}

let Textmessage = (response) =>{
    let ChatWith = response.data;
    let MyMessage = document.querySelector('#writeMessage');
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

    axios.post(URL, ObjectOfmessage).then(sendMessage)
    MyMessage.value = '';

}
// .................................................................................................................................
let Send = (e) =>{
    e.preventDefault();
    
    NumOfId = NumOfId + 1;

    let url = 'http://192.168.43.216:5000/chating';
    axios.get(url).then(Textmessage)
    
  }
  



let NumOfId = 0;
let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);
// ..................................................................................................

