
// variables to hold the html elemnts
var bookmarkName = document.getElementById("sitename");
var websiteUrl = document.getElementById("siteurl");
var dispalyData = document.getElementById("dispalyData")

// alert containers
var Alert = document.querySelectorAll("#alert")


// array of objects
var websitesArr;

// check if local storage is empty or not 
if (localStorage.getItem("Websites-list") == null) {
    websitesArr = [];
} else {
    // if there were data in the local it will set in the array when i refreshed the site
    websitesArr = JSON.parse(localStorage.getItem("Websites-list"))

    displayData()

}


// function to set the objects in the array (add websites)
function setObjects() {



    if (checkInputs() == true) {

        // regex check
        if (regularExpression() == true) {
            // objects 
            var website = {
                name: bookmarkName.value,
                url: websiteUrl.value
            }

            // push objects in the array
            websitesArr.push(website);

            // set the array in the localstorage
            localStorage.setItem("Websites-list", JSON.stringify(websitesArr));

            Alert[0].style.display = "none";
            Alert[1].style.display = "none";
        }else{
            var regexAlert =`The URL Must Start With https:// Or http://`
            Alert[1].style.display = "block";
            Alert[1].innerHTML = regexAlert;
        }


    }
    else {
        var fristAlertText = `Please Enter The First Feild `
        var secondAlertText = `Please Enter The Second Feild `

        if (bookmarkName.value == "" && websiteUrl.value == "") {
            Alert[0].style.display = "block";
            Alert[0].innerHTML = fristAlertText;
            Alert[1].style.display = "block";
            Alert[1].innerHTML = secondAlertText;

        }

        else if (bookmarkName.value == "" && websiteUrl.value != "") {

            Alert[0].style.display = "block";
            Alert[0].innerHTML = fristAlertText;
            Alert[1].style.display = "none";
        }

        else if (bookmarkName.value != "" && websiteUrl.value == "") {

            Alert[1].style.display = "block";
            Alert[1].innerHTML = secondAlertText;
            Alert[0].style.display = "none";
        }

    }


}


var btnSubmit = document.getElementById("submit")
btnSubmit.addEventListener("click", setObjects)
btnSubmit.addEventListener("click", displayData)

// function to display data 
function displayData() {
    var copaya = ` `;

    for (var i = 0; i < websitesArr.length; i++) {
        copaya += `<div class="d-flex justify-content-between mt-3 ">
                        <h2>${websitesArr[i].name}</h2>
                    
                        <div class="btns">
                                <button class="btn btn-primary"  onclick="visitWebSite(${i})">Visit</button>
                                <button class="btn btn-danger" onclick="deleteWebSite(${i})">Delete</button>
                        </div>

                    </div>
                `
    }


    //display the data 
    dispalyData.innerHTML = copaya;
    clearInputs();

}

// function to delete websites
function deleteWebSite(index) {
    websitesArr.splice(index, 1);

    // set the array in the localstorage after delete elemnts from it
    localStorage.setItem("Websites-list", JSON.stringify(websitesArr));

    // calling of display function after delete elemnts from the array
    displayData()

}

// function to visit websites
var link = document.getElementById("link");

function visitWebSite(index) {
    // location.href= websitesArr[index].url;
    window.open(websitesArr[index].url, '_blank');

}


// function to clear inputs
function clearInputs() {
    bookmarkName.value = "";
    websiteUrl.value = "";
}


// function to check inputs if it empty or not
function checkInputs() {
    if (bookmarkName.value == "" || websiteUrl.value == "") {
        return false;
    }

    else {
        return true;
    }
}


/************************************************************************/
// regular expression for the website
function regularExpression() {
    var regex = /^(http(s)?)\:\/\//
    if (regex.test(websiteUrl.value) == true) {
        return true;
    }

    else {
        return false;
    }
}
