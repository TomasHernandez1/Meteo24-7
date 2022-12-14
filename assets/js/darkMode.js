function setLight () {
    document.getElementById('current-weather-items').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('current-weather-items').style.color = "black"
    document.getElementById('place-container').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('place-container').style.color = "black"
    document.getElementById('current-temp').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('current-temp').style.color = "black"
    document.getElementById('today').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('today').style.color = "black"
    document.getElementById('tomorrow').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('tomorrow').style.color = "black"
    document.getElementById('dayafter').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('dayafter').style.color = "black"
    document.getElementById('day3').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('day3').style.color = "black"
    document.getElementById('day4').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('day4').style.color = "black"
    document.getElementById('day5').style.backgroundColor = "rgba(255, 255, 255, 0.6)"
    document.getElementById('day5').style.color = "black"
    document.getElementById('d1').style.color = "white"
    document.getElementById('d2').style.color = "white"
    document.getElementById('d3').style.color = "white"
    document.getElementById('d4').style.color = "white"
    document.getElementById('d5').style.color = "white"
    document.getElementById('d6').style.color = "white"
    document.getElementById('d7').style.color = "white"
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
    document.getElementById('today').style.backgroundColor = "#000000d0"
    document.getElementById('today').style.color = "white" 
    document.getElementById('tomorrow').style.backgroundColor = "#000000d0"
    document.getElementById('tomorrow').style.color = "white"
    document.getElementById('dayafter').style.backgroundColor = "#000000d0"
    document.getElementById('dayafter').style.color = "white"
    document.getElementById('day3').style.backgroundColor = "#000000d0"
    document.getElementById('day3').style.color = "white"
    document.getElementById('day4').style.backgroundColor = "#000000d0"
    document.getElementById('day4').style.color = "white"
    document.getElementById('day5').style.backgroundColor = "#000000d0"
    document.getElementById('day5').style.color = "white"
    document.getElementById('d1').style.color = "white"
    document.getElementById('d2').style.color = "white"
    document.getElementById('d3').style.color = "white"
    document.getElementById('d4').style.color = "white"
    document.getElementById('d5').style.color = "white"
    document.getElementById('d6').style.color = "white"
    document.getElementById('d7').style.color = "white"
    document.getElementById('search-bar').style.backgroundColor = "#000000d0"
    document.getElementById('search').style.backgroundColor = "#000000d0"
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
