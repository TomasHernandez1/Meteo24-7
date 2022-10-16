var scelta = document.getElementById("switch")

document.addEventListener('DOMContentLoaded', function () {
  //funzione per leggere il json e impostare switch dark mode
  const choice = JSON.parse(localStorage.getItem('mode'))
  if(choice.lightMode){
    scelta.checked=true
    setLight()
  } else {
    scelta.checked=false
    setDark()
  }
});

scelta.addEventListener('change', function () {
  if(scelta.checked){
    const obj = {
      lightMode: true,
    }
    localStorage.setItem('mode', JSON.stringify(obj));
  } else {
    const obj = {
      lightMode: false,
    }
    localStorage.setItem('mode', JSON.stringify(obj));
  }
});
