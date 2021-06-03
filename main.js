var xhr = new XMLHttpRequest(); 
//prep a variable which will be populated with a new http request

xhr.open("GET","https://ci-swapi.herokuapp.com/api/");// this says we want to engage a retrieve or GET request
xhr.send(); // this sends the above request

xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
        //Google XHR to understand readyState and status.  We don't populate the 
        //innerHTML of the <div> with ID of data until if condition is met.
        //this is a tidy way of wrting the IF with the this-dot prefix.
    }
};



