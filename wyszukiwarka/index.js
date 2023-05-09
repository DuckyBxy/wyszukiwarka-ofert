var fetchData = async () => {
    const response = await fetch('https://webwizards.home.pl/jacek/jjit/');
    var data = await response.json();
    return data;
}

const numberparent = document.querySelector('.header-number');
var len = 0

var renderTile = (data) => {

    len = len + 1;
    numberparent.innerHTML=`${len} wyników wyszukiwania`;
    
    return `
        <div class="results-item" id="${data.id}">
            <div class="results-item-col">
                <h2 class="results-item-title">
                    <img src="${data.company_logo_url}" class="results-item-logo"/>
                    ${data.company_name}
                </h2>
                <h3 class="results-item-subtitle">${data.title}</h3>
                <p>${data.city}, ${data.street}</p>
            </div>
           <div class="results-item-col">
            ${ data.employment_types.map( e => e.salary ? '<h4 class="results-item-price"> od '+e.salary.from+' do '+e.salary.to+' '+e.salary.currency+' '+e.type+'</h4>' : '<h4 class="results-item-price">Brak widełek</h4>').join('') }
            <div>
                ${data.skills.map(e => '<span class="results-item-skill">'+e.name+'</span>').join('')}
            </div>
           </div>
        </div>
    `
}

var renderTiles = (tiles) => {
    const parent = document.querySelector('.results')
    parent.innerHTML = tiles;
    len = 0;
}

var handleSearch = (offers) => {
    let searchValue = ''
    document.querySelector('#search-input').addEventListener('input',(e) => {
        searchValue = e.target.value;
    });

    document.querySelector('#search-button').addEventListener('click', () => {

        renderTiles(
            filterOffers(searchValue,offers).reduce( 
                (string, data) => string += renderTile(data),'')
        );
    });
    document.querySelector('#search-input').addEventListener('keypress', (e) => {
        if (e.key === "Enter") {
            renderTiles(
                filterOffers(searchValue,offers).reduce( 
                    (string, data) => string += renderTile(data),'')
            );
        }
    });

}

var filterOffers = (searchValue = '', offers) => {
    return !searchValue || searchValue.length < 1? 
        offers.slice(0,5) : 
        offers.filter( e => JSON.stringify(e).includes(searchValue))
        
}

fetchData().then((offers) => {
    handleSearch(offers);
    renderTiles(
        filterOffers('',offers).reduce( 
            (string, data) => string += renderTile(data),
        '')
    );
});

var popuprender = (popup) => {

    return `
    <div class="popup" style="display: none">
        <div class="popup-left">    
            <h1 class="popup-title">
                ${popup.title}
            </h1>
            <h2 class="popup-subtitle">
                ${popup.city},${popup.street}
            </h2>
            <div class="popup-map">
                <iframe src="https://maps.google.com/maps?width=100%25&amp;height=80%25&amp;hl=en&amp;q=${popup.latitude},${popup.longitude}(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
            </div>
        </div>
            <div class="popup-right">
                <p class="popup-close">
                    +
                </p>
                <h3 class="popup-pay">
                ${ popup.employment_types.map( e => e.salary ? '<h4 class="results-item-price"> od '+e.salary.from+' do '+e.salary.to+' '+e.salary.currency+'</h4>' : '<h4 class="results-item-price">Brak widełek</h4>').join('') }
                    </h3>
                <span class="popup-type">
                    Forma zatrudnienia:
                    <ul>
                        ${popup.employment_types.map(e => '<li>'+e.type+'</li>').join('')}
                    </ul>
                </span>
                <span class="popup-skills">
                    Wymagane umiejętności:
                    <ul>
                    ${popup.skills.map(e => '<li>'+e.name+'</li>').join('')}
                    </ul>
                </span>
            </div>
        <span class="popup-link">
            WWW:
                <a target="_blank" href="${popup.company_url}">
                    ${popup.company_url}
                </a>
        </span>
    </div>
`
}

var popupgenerate = async () => {
   
    const response = await fetch('https://webwizards.home.pl/jacek/jjit/');
    var data = await response.json();

        document.querySelector('.results').addEventListener('click', (e) => {

        const popid = e.target.id;
        let popup = data.find(data => data.id == popid);

        const popparent = document.querySelector('.popups');
        popparent.innerHTML = popuprender(popup);

        popupoperate();
})
}
  
var popupoperate = () => {

    let pop = document.querySelector('.popup');
    let head = document.querySelector('.header');
    let results = document.querySelector('.results');

    pop.style.display='';
    head.style.filter="blur(25px)";
    results.style.filter="blur(25px)";

        document.querySelector('.results').addEventListener('click', () => {
            pop.style.display = '';
            head.style.filter="blur(25px)";
            results.style.filter="blur(25px)";
        })
        document.querySelector('.popups').addEventListener('click', () => {
            pop.style.display = 'none';
            head.style.filter="";
            results.style.filter="";
        })
}


var openchat = () => {
    document.querySelector('.chat-main-status').addEventListener('click', () => {
        document.querySelector('.chat-main').classList.toggle('chat-main-hidden')
        document.querySelector('.chat-display').classList.toggle('chat-display-hidden')
    })
}


popupgenerate();
openchat();





// async function data(){
//     const response = await fetch('https://webwizards.home.pl/jacek/jjit/')
//     var data = await response.json();

//     var parent = document.querySelector('#search').parentNode


//     for (let i = 0; i<data.length/2; i++) {

//         const div = document.createElement('div');

//     switch(data[i].skills.length) {

//     case 3 :
//         div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill">${data[i].skills[1].name}</p><p class="skill">${data[i].skills[2].name}</p>`);
    
//         div.className = "result";
//         parent.appendChild(div);
//         break;
//     case 2 :
//         div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill">${data[i].skills[1].name}</p><p class="skill"></p>`);
    
//         div.className = "result";
//         parent.appendChild(div);
//         break;
//     case 1:
//         div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill"></p><p class="skill"></p>`);
    
//         div.className = "result";
//         parent.appendChild(div);
//         break;
//     }
// }
// }

// async function szukanie(){
//     const response = await fetch('https://webwizards.home.pl/jacek/jjit/');
//     const data = await response.json();
//     var input = document.querySelector('input[type=text]').value;
//     var parent = document.querySelector('#search').parentNode
    
//     const div = document.createElement('div');

//     div.innerHTML="";

//     for (let i =0;i<data.length;i++){
//         let stringdata=JSON.stringify(data[i])
//         if(stringdata.includes(input)==true){
            
//     switch(data[i].skills.length) {

//         case 3 :
//             div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill">${data[i].skills[1].name}</p><p class="skill">${data[i].skills[2].name}</p>`);
        
//             div.className = "result";
//             parent.appendChild(div);
//             break;
//         case 2 :
//             div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill">${data[i].skills[1].name}</p><p class="skill"></p>`);
        
//             div.className = "result";
//             parent.appendChild(div);
//             break;
//         case 1:
//             div.innerHTML =(`<p class="pink" id="company">${data[i].company_name}</p><p id="city" class="pink">${data[i].city}, ${data[i].street}</p><p id="position">${data[i].title}</p><p class="skill">${data[i].skills[0].name}</p><p class="skill"></p><p class="skill"></p>`);
        
//             div.className = "result";
//             parent.appendChild(div);
//             break;
//             }
        
// }} }

// //nazwa stanowiska, nazwa firmy, miasto, ulica
