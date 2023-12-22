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
  
      if (!loadedName) loadedName = "Player";
      if (!audioOn) audioOn = true;
      if (!musicVolume) musicVolume = .5;
      if (!noiseVolume) noiseVolume = 1;
      if (!effectsVolume) effectsVolume  = 1;
  
  
    }catch(e){
      console.log("Error fetching user data: " + e)
    }
  }
  
 async function saveUserData() {
    try{
      const saveName = loadedName;
      if (saveName) localStorage.setItem("userName",saveName)
      localStorage.setItem("audioOn",audioOn);
      localStorage.setItem("musicVolume",musicVolume);
      localStorage.setItem("noiseVolume",noiseVolume);
      localStorage.setItem("effectsVolume",effectsVolume);
      
    }catch(e){
      console.log("Error saving user data: " + e)
    }
  }