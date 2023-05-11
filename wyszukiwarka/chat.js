var openchat = () => {
    document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
    document.querySelector('.chat-display').classList.toggle('chat-display-hidden')

    document.querySelector('.chat-main-status').addEventListener('click', () => {
        document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
        document.querySelector('.chat-display').classList.toggle('chat-display-hidden')
    })

}

var localuser='123'

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
                <div class="message=out">
                    <div class="message-sent" >
                                ${data.message}
                    </div>
                    <div class="reaction-sent">${data.reactions.map(e => '<span>'+e+'</span>').join('')}</div>
                        <div class="reaction-add-sent">
                        +
                            <div class="chat-reaction">
                                <div class="emoji" id=${data.message_id}>🥶</div>
                                <div class="emoji" id=${data.message_id}>💀</div>
                                <div class="emoji" id=${data.message_id}>❤️</div> 
                            </div>
                        </div>
                    </div>
                </div>
                `}
            else {
                return `
                <div class="message-recieved" >

                        <div class="name">
                            ${data.user}
                        </div>

                        <div class="message">
                            ${data.message}
                        </div>
                        <div class="reaction">${data.reactions.map(e => '<span>'+e+'</span>').join('')}</div>

                        <div class="reaction-add">
                        +
                        <div class="chat-reaction">
                        <div class="emoji" id=${data.message_id}>🥶</div>
                        <div class="emoji" id=${data.message_id}>💀</div>
                        <div class="emoji" id=${data.message_id}>❤️</div> 
                        </div>
                        </div>
                </div>`
            }
}

var show_reactions = () => {
    document.querySelectorAll('.reaction-add').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
            e.target.querySelector('.chat-reaction').setAttribute('class', 'chat-reaction-show')
            })
        })
    document.querySelectorAll('.reaction-add-sent').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
            e.target.querySelector('.chat-reaction').setAttribute('class', 'chat-reaction-show')
            })
        })
    }


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

            document.querySelectorAll('.emoji').forEach(occurence => {

                occurence.addEventListener('click', (e) => {

                    var reaction = e.target.textContent
                    var id = e.target.getAttribute("id")

                    axios.post('https://webwizards.home.pl/jacek/chat-api/', {

                        channel:'kanal',
                        token:'dupaa',
                        reaction:reaction,
                        message_id:id

                    })
                })
        })
    }).then(function() {
        show_reactions()
    })
}, 1000)

var message_send = (msg) => {
    axios.post('https://webwizards.home.pl/jacek/chat-api/', {
        channel:'kanal',
        token:'dupaa',
        message:msg,
        user:localuser,
        reaction:''
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