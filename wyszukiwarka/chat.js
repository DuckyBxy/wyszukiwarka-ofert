var openchat = () => {
    document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
    document.querySelector('.chat-display').classList.toggle('chat-display-hidden')

    document.querySelector('.chat-main-status').addEventListener('click', () => {
        document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
        document.querySelector('.chat-display').classList.toggle('chat-display-hidden')
    })

}

const localuser = prompt('Podaj nazwe uzytkownika');

var create_channel = () => {
    axios.post('https://webwizards.home.pl/jacek/chat-api/', {

        token:'dupaa',
        create:'kanal',

    }).then(function(response) {
        render_message(response)
        

    }).catch(function(error) {
        console.log(error);
    })

}

var render_messages = (messages) => {
    const msgparent = document.querySelector('.chat-content')
    msgparent.innerHTML += messages
}

var i = 0

var render_message = (response) => {

    var data = response.data.data[i]
    i = i+1

    if(data.user == localuser){
    return `
        <div class="message-sent">
            ${data.message}
        </div>
    `
    }
    else {
        return `<div class="message-recieved">

                <div class="name">
                    ${data.user}
                </div>

                <div class="message">
                    ${data.message}
                </div>
                
            </div>
            `
    }
}



var message_send = (msg) => {

    axios.post('https://webwizards.home.pl/jacek/chat-api/', {

        channel:'kanal',
        message:msg,
        user:localuser,
        token:'dupaa'

    }).then(function(response) {
        
        console.log(response);

        render_messages(render_message(response))

    })

}

var get_chat = () => {

    var content = document.querySelector('.chat-content')

    document.querySelector('.chat-input-button').addEventListener('click', () => {
        var msg = document.querySelector('.chat-message').value
        document.querySelector('.chat-message').value = "";
        message_send(msg)

    })
    
    document.querySelector('.chat-message').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
        var msg = document.querySelector('.chat-message').value
        document.querySelector('.chat-message').value = "";
        message_send(msg)
        content.scrollTop = content.scrollHeight
        }
    })
}

// setInterval(function () {
//     axios.post('https://webwizards.home.pl/jacek/chat-api/', {
//         channel:'kanal',
//         all: true,
//         token:'dupaa'
// }).then(function(response) {
//     console.log(response);
// })
// }, 1000)

openchat();
get_chat();
create_channel();