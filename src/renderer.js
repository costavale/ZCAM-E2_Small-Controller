// Send a request
function httpGet(theUrl, VARf) {
    
    theUrl = theUrl + VARf;  
    let xmlHttpReq = new XMLHttpRequest();
    
    xmlHttpReq.open("GET", theUrl, false); 
    
    xmlHttpReq.send(null);
    console.log(VARf);
    
    return xmlHttpReq.responseText;
  }
   
  // Send a command to change configuration
  function setConfig(command, def) {
  
    var theCompleteUrl = 'http://10.98.32.1/ctrl/set?' + command + "=" + def;  
    let xmlHttpReq = new XMLHttpRequest();
  
    xmlHttpReq.open("GET", theCompleteUrl, false); 
  
    xmlHttpReq.send(null);
    console.log(def);
  
    return xmlHttpReq.responseText;
  }
  
  // Update the slider
  function updateSlider(slideAmount) {
          var sliderDiv = document.getElementById("sliderAmount");
          sliderDiv.innerHTML = slideAmount;
      }
  
  // Display the new value
  function DisplayChange(newvalue) {
                  document.getElementById(
                    "value").innerHTML = newvalue;
              }
  
  // Toggles the checkbox from OFF to ON and vice-versa.
  function toggle(checkbox) {
              switch (checkbox.value) {
                  case "ON":
                      checkbox.value = "OFF";
                      httpGet('http://10.98.32.1/ctrl/rec?action=','start');
                      start();
                      break;
                  case "OFF":
                      checkbox.value = "ON";
                      httpGet('http://10.98.32.1/ctrl/rec?action=','stop');
                      end();
                      break;
              }
  }  
  
  // update remaining time
  function updateRecRemaining() {
    RecRemaining = httpGet('http://10.98.32.1/ctrl/rec?action=','remain'); 
          console.log(RecRemaining);
    
          document.getElementById("myRemainingTime").innerHTML = RecRemaining;
  }
  
  var startTime, endTime;
  
  function start() {
    startTime = performance.now();
  }
  
  function end() {
    endTime = performance.now();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;
  
    // get seconds 
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
    document.getElementById("mySeconds").innerHTML = seconds;

    
  }