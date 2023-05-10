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

popupgenerate();