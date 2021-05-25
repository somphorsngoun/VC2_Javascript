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
        
        let span = document.createElement('span');
        span.textContent = user.time;
        let P = document.createElement('p');
        P.textContent = user.message;
        
        let onwUser = JSON.parse(localStorage.getItem('UserInfo'));
        if (user.message !== ''){
            if (user.user === onwUser.username){
                Message.appendChild(P);
                spaceMessage.appendChild(span);
                spaceMessage.appendChild(Message);

            } else {
                FriMessage.appendChild(P);
                spaceMessage.appendChild(FriMessage);
                spaceMessage.appendChild(span);

            }
        }
    }
    
}

let Textmessage = (response) =>{
    let ChatWith = response.data;
    console.log(ChatWith)
    
    let MyMessage = document.querySelector('#writeMessage');
    let MyAccount = JSON.parse(localStorage.getItem("UserInfo"));
    let today = new Date();
    let date = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let ObjectOfmessage = {
        user1: MyAccount.username,
        user2: ChatWith.username,
        messages: [{
            user: MyAccount.username,
            time: date,
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
    
    let url = 'http://192.168.43.216:5000/chating';
    axios.get(url).then(Textmessage)
    let spaceMessage = document.querySelector('.spaceMessage');
    // location.reload();
    localStorage.setItem('graphic', JSON.stringify(spaceMessage));
  }
  



let NumOfId = 0;
let btn_Send = document.querySelector('#Send');
btn_Send.addEventListener('click', Send);
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
// ..................................................................................................
let vioce =  document.querySelector('#vioce');

let emojiShow = true;
let stickers = document.querySelector('#sticker');
stickers.addEventListener('click', ()=>{
    let url = 'https://emoji-api.com/emojis?access_key=cf4a493302cc51c36d80aaaad6b102d9062df416';
    axios.get(url).then(imojis)
});

// ....................................................................................................
let is_bold = false;
let bold = document.querySelector('#bold');
bold.addEventListener('click', ()=>{
    is_bold = true;
    let MyMessage = document.querySelector('#writeMessage');
    MyMessage.style.fontWeight = 'bold';
})

// setInterval(Textmessage, 500);