function fetchCountries(searchQuery){
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`).then((response) => {
        if (!response.ok)
            throw "no data";
        return response.json();
    })
}
export default fetchCountries;
