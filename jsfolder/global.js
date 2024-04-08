//----------------------//
//**Under Construction**//
//----------------------//


function loadUserData() {
    try{
      loadedName = localStorage.getItem("userName");
      audioOn = localStorage.getItem("audioOn");
      musicVolume = localStorage.getItem("musicVolume");
      noiseVolume = localStorage.getItem("noiseVolume");
      effectsVolume = localStorage.getItem("effectsVolume");
      isLoggedIn = localStorage.getItem("loggedIn");
  
      if (!loadedName) loadedName = "Player";
      if (!audioOn) audioOn = true;
      if (!musicVolume) musicVolume = .025;
      if (!noiseVolume) noiseVolume = 0.25;
      if (!effectsVolume) effectsVolume  = 0.25;
  
  
    }catch(e){
      console.log("Error fetching user data: " + e)
    }
  }
  
 async function saveUserData(login = false) {
    try{
      const saveName = loadedName;
      if (saveName) localStorage.setItem("userName",saveName)
      localStorage.setItem("audioOn",audioOn);
      localStorage.setItem("musicVolume",musicVolume);
      localStorage.setItem("noiseVolume",noiseVolume);
      localStorage.setItem("effectsVolume",effectsVolume);
      localStorage.setItem("loggedIn",login)
      
    }catch(e){
      console.log("Error saving user data: " + e)
    }
  }