const container = document.createElement('div');
container.setAttribute('class', 'container');

const row = document.createElement('div');
row.setAttribute('class', 'row mt-2');

async function fetchCountriesData(){
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countryData = await response.json();
    return countryData;
}

fetchCountriesData()
.then(countryDetails => {
    for(let i=0; i<250; i++){
        const col = document.createElement('div');
        col.setAttribute('class', 'col-lg-4 col-md-6 col-sm-12 mb-2');

        const card = document.createElement('div');
        card.setAttribute('class', 'card text-white bg-dark');

        const countryName = document.createElement('div');
        countryName.setAttribute('class', 'card-header text-center');
        countryName.innerHTML = countryDetails[i].name;

        const countryFlag = document.createElement('img');
        countryFlag.setAttribute('class', 'card-img-top align-content-center');
        countryFlag.setAttribute('src', countryDetails[i].flag);
        countryFlag.style.height = "150px";

        const cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        const capital = document.createElement('p');
        capital.setAttribute('class', 'card-text');
        capital.innerHTML = "Capital: " + countryDetails[i].capital;

        const region = document.createElement('p');
        region.setAttribute('class', 'card-text');
        region.innerHTML = "Region: " + countryDetails[i].region;

        const countryCode = document.createElement('p');
        countryCode.setAttribute('class', 'card-text');
        countryCode.innerHTML = "Country Code: " + countryDetails[i].alpha3Code;

        const countryCoord = document.createElement('p');
        countryCoord.setAttribute('class', 'card-text');
        countryCoord.innerHTML = "Latitude: " + countryDetails[i].latlng[0] + '<br>' + "Longitude: " + countryDetails[i].latlng[1];

        const weatherDetails = document.createElement('button');
        weatherDetails.setAttribute('class', 'btn btn-warning');
        weatherDetails.setAttribute('id', (i+1));
        weatherDetails.innerHTML = 'Click to get weather';

        weatherDetails.addEventListener('click', function(){

            async function fetchWeatherData(){
                const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+countryDetails[i].latlng[0]+'&lon='+countryDetails[i].latlng[1]+'&appid=b49252325e1f247d7de7ce1e01fbf921');
                const weatherData = await response.json();
                return weatherData;
            } 

            fetchWeatherData()
            .then(weather => {
                alert("Current Temperature in " + countryDetails[i].name + " is " + (weather.main.temp - 273.15).toFixed(2) + '\xB0C');
            })
            .catch(error => {
                console.log(error);
            })

        })

        cardBody.append(capital, region, countryCode, countryCoord, weatherDetails);
        card.append(countryName, countryFlag, cardBody);
        col.append(card);
        row.append(col);
    }
})
.catch(error => {
    console.log(error);
})

container.append(row);
document.body.append(container);


