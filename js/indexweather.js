// api-key=9cd3ce4c9482489eab5140659242206;
{/* <reference types="../@types/jquery"/> */}

let day = document.querySelector(".day");
let dayNum = document.querySelector(".dayNum");
let month = document.querySelector(".month");
let todayLocation = document.querySelector(".location");
let todayDegree = document.querySelector(".number");
let todayIcon =document.querySelector(".icon");
let todayCondition = document.querySelector(".custom");
let humidety = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let directionWind = document.querySelector(".directionWind");

let nextday = document.querySelector(".nextday")
let nextMaxDegree = document.querySelector(".nextMaxDegree");
let nextMinDegree = document.querySelector(".nextMinDegree");
let nextIcon = document.querySelector(".nextIcon")
let nextCustom = document.querySelector(".nextCustom");

let nextTomday = document.querySelector(".nextTomday")
let nextTomMaxDegree = document.querySelector(".nextTomMaxDegree");
let nextTomMinDegree = document.querySelector(".nextTomMinDegree");
let nextTomIcon = document.querySelector(".nextTomIcon");
let nextTomCustom = document.querySelector(".nextTomCustom");

let search = document.querySelector(".search");



async function getWeather(cityName) {
    try {
        let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9cd3ce4c9482489eab5140659242206&q=${cityName}&days=3`);
        let finalResult = await result.json();
        console.log(finalResult);
        allWeather = finalResult; // Store the entire weather data in allWeather
        displayToday(finalResult);
        displayNextDay(finalResult) ;
        displayNextTom(finalResult);// Pass the entire weather data to displayToday
    } catch (error) {
        console.error('Error fetching weather data:');
    }
}

function displayToday(data) {
    // Assuming data is in the correct structure based on API response
    let todayDate=new Date;
    day.innerHTML=todayDate.toLocaleDateString("en-US",{weekday:"long"});
    dayNum.innerHTML = todayDate.getDate();
    month.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });
    todayLocation.innerHTML = data.location.name;
    todayDegree.innerHTML = (data.current.temp_c)+(`<sup>o</sup><div class="d-inline">C</div>`);
    todayIcon.setAttribute("src", data.current.condition.icon);
    todayCondition.innerHTML = data.current.condition.text;
    humidety.innerHTML = data.current.humidity+("%");
    wind.innerHTML = data.current.wind_kph+("km/h");
    directionWind.innerHTML = data.current.wind_dir;
    // console.log("hello");
    // You can continue to populate other elements with relevant data here
}

getWeather(city="cairo");

function displayNextDay(data){
    let forcasteDay = data.forecast.forecastday;
    let nextdate = new Date(forcasteDay[1].date);
    nextday.innerHTML = nextdate.toLocaleDateString("en-US", { weekday: "long" })
    nextIcon.setAttribute('src', forcasteDay[1].day.condition.icon);
    nextMaxDegree.innerHTML = forcasteDay[1].day.maxtemp_c + `<sup>o</sup>C`;
    nextMinDegree.innerHTML = forcasteDay[1].day.mintemp_c + `<sup>o</sup>C`;
    nextCustom.innerHTML = forcasteDay[1].day.condition.text;
}

function displayNextTom(data){
    let forcasteTom = data.forecast.forecastday;
    let nextTomDate = new Date(forcasteTom[2].date);
    nextTomday.innerHTML = nextTomDate.toLocaleDateString("en-US", { weekday: "long" });
    nextTomIcon.setAttribute('src', forcasteTom[2].day.condition.icon);
    nextTomMaxDegree.innerHTML = forcasteTom[2].day.maxtemp_c + `<sup>o</sup>C`;
    nextTomMinDegree.innerHTML = forcasteTom[2].day.mintemp_c + `<sup>o</sup>C`;
    nextTomCustom.innerHTML = forcasteTom[2].day.condition.text;

}

search.addEventListener("input",function(){
    getWeather(search.value);
})