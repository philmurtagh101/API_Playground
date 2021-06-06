var data;

function getData(cb) {
    var xhr = new XMLHttpRequest();
    //prep a variable which will be populated with a new http request

    xhr.open("GET", "https://ci-swapi.herokuapp.com/api/"); // this says we want to engage a retrieve or GET request
    xhr.send(); // this sends the above request

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
            //Google XHR to understand readyState and status.  We don't populate the 
            //innerHTML of the <div> with ID of data until if condition is met.
            //this is a tidy way of wrting the IF with the this-dot prefix.
            //JSON.parse method turns a string (responseText) into a proper JSON 
            //object that can be properly processed in JS for future DOM work
        }
    };
}

//Note that cb or the callback function is expecting a  function to be its 
//argument - printDataToConsole.  It populates the data variable which in this case turn is inserted into 
//the console.log method. Call backs remove the timeout guesswork and are the 
//preferred approach.

function printDataToConsole(data){
    console.log(data);
}

getData(printDataToConsole);

//Timeouts are problematic as timeouts settings cannot be easily anticipated
//we use 500ms here.
//setTimeout(function(){
//     console.log(data);
//      },500);