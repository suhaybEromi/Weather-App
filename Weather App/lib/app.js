
// Project Weather App(ئەپی کەش و هەوا)
// (2) jor (API) bakar hatwa 1:bo shwenaka.2:bo kashu hawa👇.
//TB😊 API === lam linkana (documentation) haya,bas lawa akat ka chon(API)bakar benin.
//TB😊 latitude === helakany pany
//TB😊 longitude === helakany drezhy.
const msg = document.getElementById('msg')
getLocation = () => {
    if (navigator.geolocation) { //TB😊  ama (function)👇 la xwara drusty akain.
        navigator.geolocation.getCurrentPosition(getPosition)
    } else {
        msg.innerHTML = 'We could not get your Location ! , Default location will be shown';
        msg.classList.add('alert')
        msg.classList.add('alert-danger')
        setTimeout(() => msg.remove(), 3000)
    }
}

//TB😊 latitude === helakany pany
//TB😊 longitude === helakany drezhy.
getPosition = (position) => {
    //TB😊 esta ema pewistman ba (latitude & longitude) boya variable bo drust akain👇.
    // console.log(position);
    // TB😊 inja ayankaina variable.
    // TB😊        element.(console.log) dabgra,dwatr (coords) dabgra, lanaw aw(longitude & latitude) teydaya.
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    // TB😊 (getCity === function) la xwara drusty akain.
    getCity(latitude, longitude)
    // esta kashu hawa war agrin👇.
    // TB😊 (getWeather === function) la xwara drusty akain.
    getWeather(latitude, longitude)

}
getLocation()

// TB😊 ema la regay (latitude & longitude) nawy shary (user) azanin.👇
getCity = (latitude, longitude) => {
    // TB😊 ema bo away nawy sharakaman dast bkawet abet (API) bakar benin👇.
    // TB😊 la website (BigData) (API) ahenin.
    // TB😊 (API) ee amricaya ee aw shwena nya ka ema dastman kawtwa,boya ema hanek dast kary (API) akain👇.
    // TB😊 esa ba shewayaky dynamicy, (user) la har kweyak bet shwenaka wary dagret👇.
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        // TB😊 (API) pe wisty ba (2)shta 1:request bnery.2:(response) walamt bdretawa👇.
        .then(response => response.json()).then(data => {
            // console.log(data);
            // TB😊 esta am (console.log(data)) aykayna naw (browser)👆;
            // TB😊 (id) (city) la (HTML) haya,ayhenin,wa anusin (data.locality)
            // TB😊 (locality) lanaw (console.log(data)) nusrawa,mabastman ley nawy sharakaya.
            document.getElementById('city').innerHTML = data.locality;
            // TB😊 ba haman sheway sarawa bo (countryName) anjamy adain.
            document.getElementById('country').innerHTML = data.countryName
            // TB😊 bo nmuna la newan (reponse & request) mushkilak drust bu,
            // awa ba yarmaty (catch) ray dagrin.👇
            // (error) axata (developer tool).
        }).catch((error) => {
            console.log(error);
        });
};

// TB😊 ema la regay (latitude & longitude) kashu hawa (sharaka) pishan adain.👇
getWeather = (latitude, longitude) => {
    // TB😊 ema bo away kashu hawa dast bkawet abet (API) bakar benin👇.
    // TB😊 la website (open-meteo) (API) ahenin.
    // TB😊 (API) ema hanek dast kary (API) akain👇.
    // TB😊 am (API) daway akrd ka aw (latitude) float bit,boya krdumana ba float👇.
    // TB😊 am (API) daway akrd ka aw (longitude) float bit,boya krdumana ba float👇.   
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(
        latitude
    )}&longitude=${parseFloat(
        longitude
        // TB😊 ama (hourly=temperature_2m) ba pey katzhmer boman war agret.
        // TB😊 ama (relativehumidity_2m) raday sheya.
        // TB😊 ama (current_weather=true) kashu haway aw sataya ka ema daway akain.
        // TB😊 ama (temperature_unit=celsius) ba cilizy aman date.
        // TB😊 ama (windspeed_unit=kmh) ba (kmh) aman date.
        // TB😊 am (API) abet waku sarawa bnusret agar bixayta zher yak abeta (error).
    )}&hourly=temperature_2m,relativehumidity_2m&current_weather=true&tempreture_unit=celsius&windspeed_unit=kmh`)
        .then(response => response.json())
        .then(data => {
            // TB😊 (createElement == function) la xwara drusty akain.👇
            createElement(data)
        }).catch(error => console.log(error))
};

// TB😊 lanaw (createElement) aw shtana drust akain ka lasar (browser) nishan adret.👇
createElement = (data) => {
    // TB😊 (currentWeatherDiv) lera drusty akain,👇 la xwarawa bo (design) ba kary ahenin👇,dwatr lanaw (id)(container)akain👇.
    const currentWeatherDiv = document.createElement('div')
    const container = document.getElementById('container')
    currentWeatherDiv.classList.add('row')
    let icon = ''
    // TB😊         element.(console.log) dabgra,dwatr (current_weather) dabgra, lanaw aw(temperature & windspeed)teydaya.
    let current_temp = data.current_weather.temperature;
    let current_windspeed = data.current_weather.windspeed;

    if (current_temp <= 16) {
        icon = './assets/img/frozen.png';
    } else if (current_temp > 16 && current_temp <= 25) {
        icon = './assets/img/cool.png';
    } else {
        icon = './assets/img/hot.png';
    }
    // TB😊 lera baraw xwara (elementaka) drust akain👇.
    // TB😊 aw (design) la xwarawa bakarman henawa bas bo away la (browser) nishanman bdat.
    // TB😊 (currentWeatherDiv) la sarawa drustman krdwa👆 lera (design) adayne👇,dwatr la xwarawa lanaw (id) (container)akain👇.
    currentWeatherDiv.innerHTML = `
    <div class='m-2 row text-center'>
    <h4>Current:</h4>
    <img src='${icon}' style='width:15%;height:auto;' class='mx-auto'>
    <h4 class='md-2'>${current_temp}C</h4>
    <h4 class='md-5'>Wind Speed: ${current_windspeed}km/h</h4>
    </div>
    `;
    container.appendChild(currentWeatherDiv)
}