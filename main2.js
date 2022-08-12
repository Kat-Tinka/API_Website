//*function of "Hide & Show Button" for more and less Broccoli-Infos===========================================================================================
function showHide(event) {
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

//*fetch the data from the API with chosen parameters ->like (my)ingredient, diet, cuisine,etc. ======================================================================
let apiKey = "";
let myIngredient = "broccoli";
let diet = "";
let cuisine = "";
let recipesId = "";

console.log("apiKey", apiKey);

function getData(myIngredient, diet, cuisine, recipesId) {
  console.log("myIngredient", myIngredient);
  console.log("diet", diet);
  console.log("cuisine", cuisine);
  console.log("recipesId", recipesId);
  // console.log("getInstructions", getInstructions);
  //if javaScript tries to create Cards with data, that is not there yet-> the website will crush-> the whole fetch-process of the fetch function takes much longer than just creating cards -> because of this process with promises, you will see the asynchrony=> you will see the console.log-order:1,3,2.This is also the reason, why your data from an API is only available inside a .then-block (not outside!)
  //* Fetch 1: myIngredient, diet, cuisine ======================================================
  const url1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&query=${myIngredient}&number=4&diet=${diet}&cuisine=${cuisine}`;
  console.log(url1);
  fetch(url1)
    .then(function (response) {
      //console.log("response", response); => with console.log, you can check if the response was fine,not a must

      // return response.json() is a promise ( which transforms the response into a readable json file)
      return response.json();

      // const url2 = "";
    })
    //...which also creates a second promise, so we need another .then-function with a anonymous() callback, where we can receive the data ( all the "broccoli"-data):
    .then(function (data) {
      console.log("data", data);
      // in order to get and show the LIVE DATA , I need to call this function "createCards()" from the.then-Block and send "data" as parameter over function:

      if (data.results.length === 0) {
        createCards("");
        alert("No recipes found");
      } else {
        createCards(data.results);
      }
    })
    // because the .then-block can't show errors , we also need a .catch(function (error), to make errors visible:
    .catch(function (error) {
      console.log("error", error);
    });
}

// the "outcommented" command "getData();" ( see below) in main2.js together with the also outcommented line "<script src="main2.js"></script> from "index.html:" gives you LIVE REQUEST DATA! So be carefull with the allowed requests (spoonacular) of 150 requests! For practice purposes, you can better use (in index.html:) <script src="findByIngredientsData.js"></script> together with <script src="main2.js"></script> or with <script src="main.js"></script> (here are the Show More Buttons and Checkboxes).

//* The window onload function is not a must, but it bundles the get Data(myIngredient, diet, cuisine when loading the page (-but this means also, that if you change only one parameter, all of the "getData() will be requested and loaded again" and not only the chnaged)=========================================================================================================================================================================
window.onload = function () {
  if (document.title === "My Holy Broccoli") {
    getData(myIngredient, diet, cuisine, recipesId);
    createEvents();
    checkAllOrUncheckAll();
  }
};

//old task was to get the data from a file: createCards(findByIngredientsData);to make the data visible I created also before that a function, to display it ( with a loop)-> But"findByIngredientsData" is no live data.

//*In order to get the the live data from the .then-block, I need to call the function below ( function create Cards () from  the .then-Block!)==========================
function createCards(data) {
  const recipiesContainer = document.getElementById("container");
  recipiesContainer.innerHTML = "";
  // *create a loop, and for each element of array create a card:=======================================================================================================
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");

    recipiesContainer.appendChild(divCard);

    //* add titles to the cards:========================================================================================================================================
    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute("style", "color:#198754");
    title.innerHTML = data[i].title;

    divCard.appendChild(title);

    //* show images of the recipes:=====================================================================================================================================
    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "card-img-top pointer-cursor");
    img.style.width = "18rem";
    // added id attribute to divCard that corresponds to the recipes id:
    img.setAttribute("id", data[i].id);
    divCard.appendChild(img);

    //added a click event to each card and read the id of the card
    img.addEventListener("click", function (event) {
      console.log("event", event);
      console.log("event.target.id", event.target.id);
      const recipeId = event.target.id;
      window.location.href = `instructions.html?id=${recipeId}&name=${data[i].title}`;
      // getInstructions(event.target.id);
    });
  }
}

//! -> check the code below, if it's correct->----------------------------------------------------------------------------------------------------------------------
// *Using JavaScript change event for radio button->====================================================================================================================
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

// *filtered by radio Buttons-checked===========================================================================================================================
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
//     title.setAttribute("style","color:black")
//     title.innerHTML = data[i].title;d

//     divCard.appendChild(title);

//     let img = document.createElement("img");
//     img.setAttribute("src", data[i].image);
//     img.setAttribute("class", "card-img-top");
//     img.style.width = "18rem";

//     divCard.appendChild(img);
//   }
//! <---check the code above, if it's correct <---------------------------------------------------------------------------------------------------------------------

//* create events for the search-button============================================================================================================================================
function createEvents() {
  let mySearchButton = document.getElementById("search-button");
  mySearchButton.addEventListener("click", function (_event) {
    let myInput = document.getElementById("search-input");
    myIngredient = myInput.value;
    getData(myInput.value, diet, cuisine, recipesId);
  });

  //* select the radio buttons with querySelectorAll: =========================================================================================================================
  let radios = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
      diet = event.target.value;
      getData(myIngredient, diet, cuisine);
    });
  }

  //*select the checked checkboxes-cuisine types ===========================================================================================================================
  let checkbox = document.querySelectorAll("input[type='checkbox']");

  let checkedValues = [];
  for (let c = 0; c < checkbox.length; c++) {
    checkbox[c].addEventListener("change", function (event) {
      if (checkbox[c].checked == true) {
        checkedValues.push(checkbox[c].value);
      } else {
        // --> either: SPLICE METHOD AFTER FINDING OUT THE INDEX WITH INDEXOF METHOD:
        // console.log("checkbox[c].value", checkbox[c].value);
        // console.log("checkedValues", checkedValues);
        // const cuisineToRemoveIndex = checkedValues.indexOf(checkbox[c].value);
        // console.log("cuisineToRemoveIndex", cuisineToRemoveIndex);
        // checkedValues.splice(cuisineToRemoveIndex, 1);

        // --> or better (what I use below): FILTER METHOD:
        // const filteredCuisine = checkedValues.filter(function (myValue) {
        //
        // })
        const filteredCuisine = checkedValues.filter((myValue) => {
          return myValue !== checkbox[c].value;
        });

        console.log("filteredCuisine", filteredCuisine);
        checkedValues = filteredCuisine;
      }

      //* getData(myIngredient, diet, cuisine); ====================================================================================================================================
      cuisine = checkedValues.toString();
      console.log("checkedValues", checkedValues);
      getData(myIngredient, diet, checkedValues.toString());
      getInstructions(recipesId);
    });
  }
}

// * event for all checked checkButtons (at the beginning no btn is checked =>let isAllChecked = false; ) ======> the mentioned code of block before putting it into the "function checkAllOrUncheckAll()":

// let isAllChecked = false;
// document.getElementById("btnCheckAll").onclick = function (e) {
//   let checkBoxes = document.getElementsByName("cuisine");
//   if (isAllChecked) {
//     for (let c = 0; c < checkBoxes.length; c++) {
//       checkBoxes[c].checked = false;
//     }
//   } else {
//     for (let c = 0; c < checkBoxes.length; c++) {
//       checkBoxes[c].checked = true;
//     }
//   }
//   isAllChecked = !isAllChecked;
//   console.log("isAllChecked", isAllChecked);
//   document.querySelectorAll('input[type="checkbox"]:checked');
//   cuisine = isAllChecked.toString();
//   getData(myIngredient, diet, isAllChecked.toString());
// };
//* <=======================================================================================================

//* the "function checkAllOrUncheckAll()" checkes if all (or none) of the checkboxes are checked and if so it gives also the cuisine-data back ========================================================================
function checkAllOrUncheckAll() {
  let isAllChecked = false;
  document.getElementById("btnCheckAll").onclick = function (e) {
    let checkBoxes = document.getElementsByName("cuisine");
    if (isAllChecked) {
      for (let c = 0; c < checkBoxes.length; c++) {
        checkBoxes[c].checked = false;
      }
    } else {
      for (let c = 0; c < checkBoxes.length; c++) {
        checkBoxes[c].checked = true;
      }
    }
    isAllChecked = !isAllChecked;

    console.log("isAllChecked", isAllChecked);
    document.querySelectorAll('input[type="checkbox"]:checked');
    //   cuisine = isAllChecked.toString();
    //   getData(myIngredient, diet, isAllChecked.toString());
    // };
    let allOrNoneChecked = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    console.log("allOrNoneChecked", allOrNoneChecked);

    let allCuisine = [];
    if (allOrNoneChecked.length === 0) {
      getData(myIngredient, diet, "");
      cuisine = "";
      //loop over allOrNoneChecked to extract the value of the checkboxes:
    } else {
      for (let i = 0; i < allOrNoneChecked.length; i++) {
        //push it into an array allCuisine:
        allCuisine.push(allOrNoneChecked[i].value);
      }
      cuisine = allCuisine.toString();
      console.log("allCuisine", allCuisine);
      getData(myIngredient, diet, allCuisine.toString());
    }
    // or: else (allOrNoneChecked.length === !0) {
    //   getData(myIngredient, diet, cuisine);

    //info:outside the loop but inside the else we call getData with stringified allCuisine and change the values ofcuisine
  };
}

//*get the values of one or more checked checkBoxes "Cuisine"
// let buttonSubmit = document.getElementById("btnSubmit");
// let values = [];
// buttonSubmit.addEventListener("click", function (e) {
//   e.preventDefault();
//   let checkBoxes = document.getElementsByName("cuisine");
//*console.log("checkBoxes:", checkBoxes);
//   for (let c = 0; c < checkBoxes.length; c++) {
//     if (checkBoxes[c].checked == true) {
//       console.log("chosen cuisine(s)", checkBoxes[c].value);
//       values.push(checkBoxes[c].value);
//     } else {
//       if (checkBoxes[c].checked == !true) {
//       }
//     }
//*const element = array[c];
//   }
//   console.log("The value(s): " + values.toString());
//   getData(myIngredient, diet, values.toString());
//*alert("The value(s): " + values.toString());
// });

// TODO either write a function, which allows to put more than one ingredient into the search input(see endpoint parameter:"includeIngredients") or (maybe more interesting): "excludeIngredients"
//
// event for all checked checkButtons
// document.getElementById("btnCheckAll").onclick = function (e) {
//   e.preventDefault();
//   let checkBoxes = document.getElementsByName("cuisine");
//   for (let c = 0; c < checkBoxes.length; c++) {
//     checkBoxes[c].checked = true;
//   }
// };

// let markedCheckbox = (document.getElementById("checkbox").onclick =
//   function () {
//     let markedCheckbox = document.querySelectorAll(
//       'input[type="checkbox"]:checked'
//     );
//     for (let checkbox of markedCheckbox) {
//       document.body.append(checkbox.value + " ");
//     }
//   });
