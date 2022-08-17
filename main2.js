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
let myIngredient = "broccoli";
let diet = "vegan";
function getData(myIngredient, diet) {
  console.log("myIngredient >>>", myIngredient);
  console.log(1);
  //if javaScript tries to create Cards with data, that is not there yet-> the website will crush-> the whole fetch-proccess of the fetch function takes much longer than just creating cards -> because of this process with promises, you will see the asynchrony=> you will see the console.log-order:1,3,2.This is also the reason, why your data from an API is only available inside a .then-block ( not outside!)
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7&query=${myIngredient}&number=10&diet=${diet}`
  )
    .then(function (response) {
      //   console.log("response", response); -> with console.log, you can check if the response was fine,not a must
      console.log(2);
      // return response.json is a promise ( which transforms the resonse into a readable json file)
      return response.json();
    })
    // which also creates a second promise, so we need another .then-function with a anonymous() callback, where we can receive the data ( all the broccoli data):
    .then(function (data) {
      //   console.log("data", data);
      // in order to get and show the LIVE DATA , I need to call this function "createCards()" from the.then-Block and send "data" as parameter over function:
      console.log("data.results.lenght", data.results.length);

      if (data.results.length === 0) {
        alert("No recipes found");
      } else {
        createCards(data.results);
      }
      createEvents();
    })
    // because the .then-block can't show errors , we also need a .catch(function (error) ..:
    .catch(function (error) {
      console.log("error", error);
    });
  console.log(3);
}

// the uncommented command "getData();" ( see below) in main2.js together with the also uncommented line "<script src="main2.js"></script> from "index.html:" gives you LIVE REQUEST DATA! So be carefull with the allowed requests of 150! For practice purposes , you can better use (in index.html:) <script src="findByIngredientsData.js"></script> together with <script src="main2.js"></script> or with <script src="main.js"></script> (here are the Show More Buttons and Checkboxes)

// createCards(findByIngredientsData);

// to make the data visible I created also before a Function, to display it ( with a loop)-> But"findByIngredientsData" is no live data. This is data from file!
//In order to get the the live data from the .then-block, I need to call the function below ( function create Cards () from  the .then-Block!)
function createCards(data) {
  console.log(data);
  const recipiesContainer = document.getElementById("container");
  recipiesContainer.innerHTML = "";
  // create a loop, and for each element of array create a card
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    recipiesContainer.appendChild(divCard);

    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute("style", "color:#198754");
    // title.style.width = "18rem";
    title.innerHTML = data[i].title;

    divCard.appendChild(title);

    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "card-img-top");
    img.style.width = "18rem";

    divCard.appendChild(img);
  }
}

// to select the radio buttons with querySelectorAll-this works:

// onchange Event using: In JavaScript, using the addEventListener() method:??

// Using JavaScript change event for radio buttons
// let result = document.querySelector('#result');
// document.body.addEventListener('change', function (e) {
//     let target = e.target;
//     let message;
//     switch (target.id) {
//         case 'vegetarian':
//             message = 'VEGETARIAN';
//             break;
//         case 'vegan':
//             message = 'The Resolved radio button changed';
//             break;
//         case 'pescetarian':
//             message = 'The Rejected radio button changed';
//             break;
//     }
//     result.textContent = message;
// });

// doesn't work-why?:var selected = document.querySelector('input[value="vegetarian"]:checked').id;

// filtered by radio Buttons-checked
// function filterByDiet() {
//   let CheckedRadio = Array.from(
//     document.querySelectorAll("input[type='radio']:checked")
//   ).map((checked) => checked.value);
//   console.log(CheckedRadio);

//   let filteredRecipes = [];

//   for (let i = 0; i < data.length; i++) {
//     if (CheckedRadio.every((e) => data[i].diets.includes(e))) {
//       filteredRecipes.push(data[i]);
//     }
//   }
//   console.log(filteredRecipes);
//   createCards(filteredRecipes, data);
//   return filteredRecipes;
// }

// let title = document.createElement("h5");
//     title.setAttribute("class", "card-title");
//     // title.style.width = "18rem";
//     title.setAttribute("style","color:black")
//     title.innerHTML = data[i].title;d

//     divCard.appendChild(title);

//     let img = document.createElement("img");
//     img.setAttribute("src", data[i].image);
//     img.setAttribute("class", "card-img-top");
//     img.style.width = "18rem";

//     divCard.appendChild(img);
//   }

function createEvents() {
  let mySearchButton = document.getElementById("search-button");
  mySearchButton.addEventListener(
    "click",
    // doSearch()
    console.log("click")
  );

  let radios = document.querySelectorAll("input");
  console.log("radios", radios);

  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener(
      "onChange",

      console.log("radio button selected")
      // radioButtonSelection()
    );
  }
}

function radioButtonSelection() {
  console.log("radio buttons value", e.target.value);
  // getData(e.target.value, myIngredient)
}

function doSearch() {
  let myInput = document.getElementById("search-input");
  myIngredient = myInput.value;
  console.log("myInput.value", myInput.value);
  console.log("diet>>>", diet);

  // getData(myInput.value, diet);
}
// add event to all radio buttons
// when one of them is changed you retrieve the value of the radio button & you call getData with that value

// diet = "vegetarian"
// getData(myIngredient, "vegetarian")

getData(myIngredient, diet);
