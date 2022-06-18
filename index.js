let temp = document.querySelector(".temperature")
let city = document.querySelector(".timezone")
let submit = document.getElementById('submit')
let searchbar = document.querySelector(".searchbar")
// Selecting dom elements above--
let url;
//When window loads, run this code--
window.addEventListener("load", () => {
    let longitude;
    let latitude;
// If user allows location access then get latitude and logitude
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            url = `http://api.weatherapi.com/v1/current.json?key=bcd984d859f14243ab8200807220804&q=${latitude},${longitude}`;
    
            fetch(url).then(data => {
                return data.json()
            }).then(data => {
            temp.innerHTML = `${data.current.feelslike_c} C`
                city.innerHTML = `${data.location.name}`}
            )
        })
// else let the user search in search bar
    }else{
        document.getElementById("submit").addEventListener("click", function (e) {
            e.preventDefault()
            let cityname = searchbar.value;
            weatherevent(`http://api.weatherapi.com/v1/current.json?key=bcd984d859f14243ab8200807220804&q=${searchbar.value}`)
        })
    }
    
})

//funciton for search query
function weatherevent(uri) {
 
        fetch(uri).then(data => {
            return data.json()
        }).then(data => {
        temp.innerHTML = `${data.current.feelslike_c} C`
            city.innerHTML = `${data.location.name}`}
        ).catch(err => city.innerHTML = "Enter real city name")
}

// general searching and functioning of searchbar
document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault()
    temp.innerHTML = ""
    let cityname = searchbar.value;
    weatherevent(`http://api.weatherapi.com/v1/current.json?key=bcd984d859f14243ab8200807220804&q=${searchbar.value}`)
})