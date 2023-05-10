var openchat = () => {
    document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
    document.querySelector('.chat-display').classList.toggle('chat-display-hidden')

    document.querySelector('.chat-main-status').addEventListener('click', () => {
        document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
        document.querySelector('.chat-display').classList.toggle('chat-display-hidden')
    })

}

var localuser=prompt('podaj nazwe uzytkownika');

// var create_channel = () => {
//     axios.post('https://webwizards.home.pl/jacek/chat-api/', {

//         token:'dupaa',
//         create:'kanal',

//     })
// }

var render_message = (response, i) =>{
        let data = response.data.data[i];
            if(data.user == localuser){
                return `
                    <div class="message-sent">
                        ${data.message}
                    </div>
                    <div class="chat-reaction">
                    <div class="emoji">🥶</div>
                    <div class="emoji>💀</div>
                    <div class="emoji">❤️</div> 
                    </div>
                    <div class="reaction-add">+</div>
                `}
            else {
                return `
                <div class="message-recieved">

                        <div class="name">
                            ${data.user}
                        </div>

                        <div class="message">
                            ${data.message}
                        </div>
                        <div class="chat-reaction">
                        <div class="emoji">🥶</div>
                        <div class="emoji">💀</div>
                        <div class="emoji">❤️</div> 
                        </div>
                        <div class="reaction-add">+</div>
                    </div>`
            }
}

// 🥶 💀❤️

var render_messages = (response, leng) =>{
    const msgparent = document.querySelector('.chat-content');
    msgparent.innerHTML = '';
    for(let i=0;i<leng;i++){
    msgparent.innerHTML += render_message(response, i);
    }
}

setInterval(function() {
    axios.post('https://webwizards.home.pl/jacek/chat-api/', {
        all:true,
        channel:'kanal',
        token:'dupaa'
    }).then(function(response) {
        var leng = response.data.data.length;
        render_messages(response, leng);
    }).then(function() {
        console.log(document.querySelectorAll('.emoji').length);
            document.querySelectorAll('.emoji')[1].addEventListener('click', (e) => {
                console.log(e.target.textContent);
            })
    })
}, 1000)

var message_send = (msg) => {
    axios.post('https://webwizards.home.pl/jacek/chat-api/', {
        channel:'kanal',
        token:'dupaa',
        message:msg,
        user:localuser
    })
}

var get_chat = () => {

    var content = document.querySelector('.chat-content')

    document.querySelector('.chat-input-button').addEventListener('click', () => {
        var msg = document.querySelector('.chat-message').value;
        document.querySelector('.chat-message').value = "";
        message_send(msg);

    })
    
    document.querySelector('.chat-message').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
        var msg = document.querySelector('.chat-message').value;
        document.querySelector('.chat-message').value = "";
        message_send(msg);
        content.scrollTop = content.scrollHeight;
        }
    })
}



openchat();
get_chat();
// create_channel();