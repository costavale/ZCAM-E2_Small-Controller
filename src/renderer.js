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
              
              updateRecRemaining();
            }  
  
  // update remaining time
  function updateRecRemaining() {
    RecRemaining = httpGet('http://10.98.32.1/ctrl/rec?action=','remain'); 
          RecRemaining = response.msg.split(':');
          console.log($("RR_min").val(RecRemaining[3]));
          
          document.getElementById("RR_min").innerHTML = Recminutes;          

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

  const remote = require('electron').remote;

const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}