//function of "Hide & Show Button" for more and less Broccoli-Infos
function showHide(event) {
  console.log(event.target);
  let mySecondaryText = document.getElementById("secondary-text");
  let isHidden = Array.from(mySecondaryText.classList).includes("hide");
  if (isHidden === true) {
    mySecondaryText.classList.remove("hide");
    mySecondaryText.classList.add("show");
    event.target.innerHTML = "Read Less";
  } else {
    mySecondaryText.classList.remove("show");
    mySecondaryText.classList.add("hide");
    event.target.innerText = "Read More";
  }
}

//try to fetch the data from the API

//use of the google meeting function with O.

function getData() {
  console.log(1);
  //if javaScript tries to create Cards with data, that is not there yet-> the website will crush-> the whole fetch-proccess of the fetch function takes much longer than just creating cards -> because of this process with promises, you will see the asynchrony=> you will see the console.log-order:1,3,2.This is also the reason, why your data from an API is only available inside a .then-block ( not outside!)
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7&query=broccoli&number=200"
  )
    .then(function (response) {
      //   console.log("response", response); -> with console.log, you can check if the response was fine,not a must
      console.log(2);
      // return response.json is a promise ( which transforms the resonse into a readable json file)
      return response.json();
    })
    // which also creates a second promise, so we need another .then-function withh a anonymous() callback, where we can receive the data ( all the broccoli data):
    .then(function (data) {
      //   console.log("data", data);
      // in order to get and show the LIVE DATA , I need to call this function "createCards()" from the.then-Block and send "data" as parameter over function:
      createCards(data.results);
    })
    // because the .then-block can't show errors , we also need a .catch(function (error) ..:
    .catch(function (error) {
      console.log("error", error);
    });
  console.log(3);
}

// the uncommented command "getData();" ( see below) in main2.js together with the also uncommented line "<script src="main2.js"></script> from "index.html:" gives you LIVE REQUEST DATA! So be carefull with the allowed requests of 150! For practice purposes , you can better use (in index.html:) <script src="findByIngredientsData.js"></script> together with <script src="main2.js"></script> or with <script src="main.js"></script> (here are the Show More Buttons and Checkboxes)
getData();
// createCards(findByIngredientsData);

// to make the data visible I created also before a Function, to display it ( with a loop)-> But"findByIngredientsData" is no live data. This is data from file!
//In order to get the the live data from the .then-block, I need to call the function below ( function create Cards () from  the .then-Block!)
function createCards(data) {
  console.log(data);
  const recipiesContainer = document.getElementById("container");

  // create a loop, and for each element of array create a card
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    recipiesContainer.appendChild(divCard);

    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "card-img-top");
    img.style.width = "18rem";

    divCard.appendChild(img);
  }
}
