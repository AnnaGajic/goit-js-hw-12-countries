import './sass/main.scss';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import countryCard from './template/country_card.hbs';
import countryList from './template/country_list.hbs';
import getRefs from './get-refs';

const PNotify = require('@pnotify/core');
PNotify.defaultStack.maxOpen = 1;
PNotify.defaultStack.maxStrategy = 'close';

const debounce = require('lodash.debounce');


const clearInput = () => {
    getRefs.listResults.innerHTML = '';
    getRefs.detailResults.innerHTML = '';
    getRefs.listResults.style.display = 'none';
    getRefs.detailResults.style.display = 'none';
}

const resultParser = (data) => {

    if(!data)
        return;

    if(data.status && data.status != 200 || data.length === 0)
        return;

    if(data.length > 10){
        PNotify.error({
            text: 'Too many matches found. Please enter a more specific query',
            delay: 500,
          });
    }
    else if(data.length === 1){
        getRefs.detailResults.insertAdjacentHTML('beforeend', countryCard(data[0]));
        getRefs.detailResults.style.display = "block";
    }
    else{
        getRefs.listResults.insertAdjacentHTML('beforeend', countryList(data));
        getRefs.listResults.style.display = "block";
    }
}

const getCountries = () => { 
    clearInput(); 
    let valueFromInput = getRefs.input.value;

    if(!valueFromInput)
        return;

    fetchCountries(valueFromInput).then(resultParser).catch(err => console.log(err)); 
}

const handlerFunction = debounce(getCountries, 500);
getRefs.input.addEventListener('keydown', handlerFunction);