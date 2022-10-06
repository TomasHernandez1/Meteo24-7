function toggleDarkMode(){
    document.body.classList.toggle("darkMode");
    var card = document.getElementsByClassName("card");
    for (var i = 0; i<6; i++) {
      card[i].classList.toggle("darkMode");
    }
    //console.log(document.body.classList);
    //console.log('here');
  }
  document.querySelector('#toggleDarkMode').addEventListener('change', toggleDarkMode);