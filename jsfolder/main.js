const nameForm = document.getElementById("saveName");
const changeForm = document.getElementById("changeName");
const inputBox = document.getElementById("userName");
const welcomeText = document.getElementById("welcomeText");

window.addEventListener("load",startSequence);
inputBox.addEventListener("keyup",limitNameLength);
// inputBox.addEventListener("keydown",saveMyName);


let audioOn = true;
let musicVolume = 1;
let noiseVolume = 1;
let effectsVolume = 1;
let loadedName = "Player";
let isLoggedIn = false;

function openSettingtoStart() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  function backToFirstPage() {
    document.querySelector(".navbar-setting").classList.toggle("start");
    document.querySelector(".setting").classList.toggle("menu");
  }
  
  function saveMyName(event){
    
    const userName = inputBox.value;
    if (!userName) userName = "Player";
    loadedName = userName;
    hideNameEntry();
  }

  function hideNameEntry(){
    nameForm.classList.add("d-none");
    changeForm.classList.remove("d-none");
    welcomeText.textContent = "Welcome " + loadedName;
  }
  function reEnter(){
    nameForm.classList.remove("d-none");
    changeForm.classList.add("d-none");

  }

  function limitNameLength(){
    const tempText = inputBox.value;
    if (tempText.length > 10){
      inputBox.value = tempText.slice(0,10);
    }
  }

  function startSequence(){
    loadUserData();
    if (loadedName)hideNameEntry();
  }

  function startBlackJack(){
    saveUserData(true);
    window.location.href = "./blackjack.html"
  }