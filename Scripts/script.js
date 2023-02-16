console.log("NFL is here!");

let player = "tom brady";
let theURL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${player}`;
const theName = document.querySelector("#name");
const theStatus = document.querySelector("#status");
const theTeam = document.querySelector("#team");
const thePosition = document.querySelector("#position");
const theNumber = document.querySelector("#number");
const bornLocation = document.querySelector("#born-location");
const theDOB = document.querySelector("#dob");
const theHeight = document.querySelector("#height");
const theWeight = document.querySelector("#weight");
const theInput = document.querySelector("#the-input");
const searchButton = document.querySelector(".button");
const theImage = document.querySelector(".image-container");
const myAudio = document.querySelector("#audio");
const theError = document.querySelector("#error");

async function GetData(){
    let theResponse = await fetch(theURL);
    console.log(theResponse);
    theResponse = await theResponse.json();
    if(theResponse.player == null || theResponse.player[0].strSport != "American Football"){
        theError.innerText = "The name you entered is not in the API database.";
        theError.style = "color:red";
        myAudio.pause();
        theName.innerText = "";
        theStatus.innerText = "";
        theTeam.innerText = "";
        thePosition.innerText = "";
        bornLocation.innerText = "";
        theDOB.innerText = "";
        theHeight.innerText = "";
        theWeight.innerText = "";
        theImage.src = "";
        theNumber.innerText = "";
    }
    else{
        myAudio.play();
        console.log(theResponse.player);
        theName.innerText = `Name: ${theResponse.player[0].strPlayer}`;
        theStatus.innerText = `Status: ${theResponse.player[0].strStatus}`;
        theTeam.innerText = `Team: ${theResponse.player[0].strTeam}`;
        thePosition.innerText = `Position: ${theResponse.player[0].strPosition}`;
        bornLocation.innerText = `Born: ${theResponse.player[0].strBirthLocation}`;
        theDOB.innerText = `DOB: ${theResponse.player[0].dateBorn}`;
        theHeight.innerText = `Height: ${theResponse.player[0].strHeight}`;
        theWeight.innerText = `Weight: ${theResponse.player[0].strWeight}`;
        if(!theResponse.player[0].strThumb){
            theImage.src = "./Assets/realistic-american-football-stadium/profileplaceholder.jpeg";
        }
        else{
            theImage.src = theResponse.player[0].strThumb;
        }
        theImage.width = 200;
        if(!theResponse.player[0].strNumber){
            theNumber.innerText = "";
        }
        else{
            theNumber.innerText = `Number: ${theResponse.player[0].strNumber}`;
        }
        if(theResponse.player[0].strStatus == "Active"){
            theStatus.style = "color:green";
        }
        else{
            theStatus.style = "color:red";
        }
        if(theError.innerText == "The name you entered is not in the API database."){
            theError.innerText = "";
        }
    }
}

searchButton.addEventListener("click", function(event){
    event.preventDefault();
    if(theInput.value == ""){
        alert("Please enter an NFL player's name.");
        myAudio.pause();
        theName.innerText = "";
        theStatus.innerText = "";
        theTeam.innerText = "";
        thePosition.innerText = "";
        bornLocation.innerText = "";
        theDOB.innerText = "";
        theHeight.innerText = "";
        theWeight.innerText = "";
        theImage.src = "";
        theNumber.innerText = "";
        theError.innerText = "";
    }
    else{
        player = theInput.value;
        theInput.value = "";
        theURL = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${player}`;
        GetData();
    }
})
