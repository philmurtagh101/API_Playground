var data;
//url = "https://ci-swapi.herokuapp.com/api/-whatever button you press-" see below in the writeToDocument funtion.

function getData(url,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
//and then you wait until readyState is 4 and status is 200
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.dir(JSON.parse(this.responseText));//allow console view the object directory
            console.log(JSON.parse(this.responseText));//allow console view of the output of grabbing the object behind that url
            callback(JSON.parse(this.responseText));// note that "callback" can be call anything you like as long as similar to the argument in this function. This is a technique to allow in invoker -writeToDocument- to call it as an anonymous funtion to return "data" as an output of JSON.parse method used here.
        }
    };
}

function getTableHeaders(obj){
    //this builds the header row taking obj as input.
    var tableHeaders = []; //start with empty array
    //The following are builtin functions that allow data unpacking. So we are unpacking the keys (field name or key of key:value pair) as headers labels.
    //and jamming them one by one in tableHeaders array with push method.
    Object.keys(obj).forEach(function(key){
        tableHeaders.push(`<th>${key}</th>`);// note we sandwich label  with <th>...</th> on each push
    })
    //and then we return with whole array sandwiched between <tr>...</tr> pait
    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev){
    if (next && prev) {
        //next and prev are with the returned data and they hold which subjection of the website you have to go to get the rest of the info i.e. on next or previous page (assuming they exist).  So we're doing a truthy checking if they exist. One page 1 for example, previous does not exist.  Some items  have little to display so there is neither and so on.
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if(next&& !prev){
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if(!next && prev){
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    } 
}
//this is where the real work of building the HTML begins.
function writeToDocument(url) {
    var tableRows = [];// Set up an empty row array
    var el=document.getElementById("data");//pull DOM info of element with ID=data
    el.innerHTML=""; //this blanks the element content of id=data
    //lets pull in the "data" under the "url".
    getData(url, function (data) {
        var pagination ="";
        //start finding if we need pagination.  we check the data object is next or previous keys exist
        //so we do a truthy and then we build the buttons needed.
        if(data.next || data.previous){
            pagination = generatePaginationButtons(data.next, data.previous);
            //so now we have a variable ready to use when we build out the page,
        }

        data = data.results;
        //now we pull results and populate the tableHeaders variable
        var tableHeaders = getTableHeaders(data[0])
        //now we start working on the results row array or record
        data.forEach(function(item){
            var dataRow=[]; //first set to empty and we work along each key (header key)
            Object.keys(item).forEach(function(key){
                var rowData = item[key].toString();//this is a trick to turn the result into a string we can manipulate
                var truncatedData = rowData.substring(0,15); // we take 1st 15 characters off the string
                dataRow.push(`<td>${truncatedData}</td>`); // and stuff it between <td>...</td>
            });
            tableRows.push(`<tr>${dataRow}</tr>`);//and stuff the row between <tr>...</tr>
        });
           
        // round off with building the innerHTML out with headers, the rows of data and the pagination buttons.
        el.innerHTML=`<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g,""); // replace method removes all commas at top of display area
    });
}