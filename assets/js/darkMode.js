function setLight () {
    document.getElementById('current-weather-items').style.backgroundColor = "rgba(255, 255, 255, 0.8)"
    document.getElementById('current-weather-items').style.color = "black"
    document.getElementById('place-container').style.backgroundColor = "rgba(255, 255, 255, 0.8)"
    document.getElementById('place-container').style.color = "black"
    document.getElementById('current-temp').style.backgroundColor = "rgba(255, 255, 255, 0.8)"
    document.getElementById('current-temp').style.color = "black"
    document.getElementById('weather-forecast-item').style.backgroundColor = "rgba(255, 255, 255, 0.8)"
    document.getElementById('weather-forecast-item').style.color = "black"
    document.getElementById('search-bar').style.backgroundColor = "rgba(135, 135, 135, 0.7)"
    document.getElementById('search').style.backgroundColor = "rgba(135, 135, 135, 0.7)"
  }
  
  function setDark () {
    document.getElementById('current-weather-items').style.backgroundColor = "#000000d0"
    document.getElementById('current-weather-items').style.color = "white" 
    document.getElementById('place-container').style.backgroundColor = "#000000d0"
    document.getElementById('place-container').style.color = "white" 
    document.getElementById('current-temp').style.backgroundColor = "#000000d0"
    document.getElementById('current-temp').style.color = "white"
    document.getElementById('weather-forecast-item').style.backgroundColor = "#000000d0"
    document.getElementById('weather-forecast-item').style.color = "white" 
    document.getElementById('search-bar').style.backgroundColor = "#7c7c7c2b"
    document.getElementById('search').style.backgroundColor = "#7c7c7c2b"
  }
  
  document.addEventListener('DOMContentLoaded', function (){
      var checkbox = document.getElementById('switch');
  
      checkbox.addEventListener('change', function () {
          if(checkbox.checked) {
            setLight()
          } else {
            setDark()
          }
      });
  });
