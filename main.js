const getWeather = async () => {
  const city_name = document.querySelector(".search-bar").value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=imperial`
  try{
    const response = await fetch(url)
    const data = await response.json()
    if (data.cod === "404") {
      document.querySelector(".error-msg").textContent =`City ${city_name} not found. Please try again.`
      return
    }
    document.querySelector(".error-msg").textContent = ""
    displayWeather(data)
  }
  catch(error){
    console.error(error)
  }

}

function displayWeather(data) {
    const { name } = data
    const { icon, main, description } = data.weather[0]
    const { temp, humidity, temp_min, temp_max } = data.main
    const { speed } = data.wind
    document.querySelector(".city").innerHTML = "Weather in " + name
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`
    document.querySelector(".description").innerHTML = description
    document.querySelector(".high-low").innerHTML = `Today's: max: ${temp_max} min: ${temp_min}`
    document.querySelector(".temprature").innerHTML = temp + "°F"
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%"
    document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " miles/hr"
    document.querySelector(".header").style.display = "none";
   
    setBackground(description)
  }

document.querySelector(".search-bar").addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        getWeather()
    }
})

function setBackground(description) {
  const body = document.body;
  switch(description) {
    case 'clear sky':
      body.style.backgroundImage = 'url(static/images/clearsky.jpeg)'
      break
    case 'few clouds':
    case 'scattered clouds':
    case 'broken clouds':
      body.style.backgroundImage = 'url(static/images/cloudy2.gif)'
      break
    case 'shower rain':
    case 'rain':
    case 'thunderstorm':
    case 'mist':
    case 'drizzle':
    case 'light rain':
    case 'hail':
      body.style.backgroundImage = 'url(static/images/rainy.gif)'
      break
    case 'snow':
    case 'light snow':
    case 'sleet':
    case 'blowing snow':
    case 'heavy snow':
      body.style.backgroundImage = 'url(static/images/snownew.jpeg)'
      break
    case 'smoke':
    case 'fog': 
      body.style.backgroundImage = 'url(static/images/foggy.gif)'
      break 
    case 'tornado':
      body.style.backgroundImage = 'url(static/images/tornado.jpeg)'
      break
    default:
      body.style.backgroundImage = 'url(static/images/defaultnew.jpeg)'
      break
  }
}
