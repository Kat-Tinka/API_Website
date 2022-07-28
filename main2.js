//function of "Hide & Show Button" for more and less Broccoli-Infos
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

//try to fetch the data from the API with chosen parameters ->like (my)ingredient, diet, cuisine,
let myIngredient = "broccoli";
let diet = "";
let cuisine = "";
function getData(myIngredient, diet, cuisine) {
  //if javaScript tries to create Cards with data, that is not there yet-> the website will crush-> the whole fetch-proccess of the fetch function takes much longer than just creating cards -> because of this process with promises, you will see the asynchrony=> you will see the console.log-order:1,3,2.This is also the reason, why your data from an API is only available inside a .then-block ( not outside!)
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=97f94ba9f77f4a4da105029182009cc1&query=${myIngredient}&number=10&diet=${diet}&cuisine=${cuisine}`
  )
    .then(function (response) {
      //   console.log("response", response); -> with console.log, you can check if the response was fine,not a must

      // return response.json is a promise ( which transforms the resonse into a readable json file)
      return response.json();
    })
    // which also creates a second promise, so we need another .then-function with a anonymous() callback, where we can receive the data ( all the broccoli data):
    .then(function (data) {
      console.log("data", data);
      // in order to get and show the LIVE DATA , I need to call this function "createCards()" from the.then-Block and send "data" as parameter over function:

      if (data.results.length === 0) {
        alert("No recipes found");
      } else {
        createCards(data.results);
      }
    })
    // because the .then-block can't show errors , we also need a .catch(function (error) ..:
    .catch(function (error) {
      console.log("error", error);
    });
}

// the uncommented command "getData();" ( see below) in main2.js together with the also uncommented line "<script src="main2.js"></script> from "index.html:" gives you LIVE REQUEST DATA! So be carefull with the allowed requests of 150! For practice purposes , you can better use (in index.html:) <script src="findByIngredientsData.js"></script> together with <script src="main2.js"></script> or with <script src="main.js"></script> (here are the Show More Buttons and Checkboxes).

// The window onload function is not a MutationObserver, but it bundles the get Data(myIngredient, diet, cuisine when loading the page)
window.onload = function () {
  getData(myIngredient, diet, cuisine);
  createEvents();
};

//past task wto get the data from a file: createCards(findByIngredientsData);to make the data visible I created also before a Function, to display it ( with a loop)-> But"findByIngredientsData" is no live data. This is data from file!

//In order to get the the live data from the .then-block, I need to call the function below ( function create Cards () from  the .then-Block!)
function createCards(data) {
  const recipiesContainer = document.getElementById("container");
  recipiesContainer.innerHTML = "";
  // create a loop, and for each element of array create a card
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    recipiesContainer.appendChild(divCard);

    // add titles to the cards
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
  mySearchButton.addEventListener("click", function (event) {
    let myInput = document.getElementById("search-input");
    myIngredient = myInput.value;
    getData(myInput.value, diet, cuisine);
    console.log("myIngredient:", myIngredient);
  });

  // to select the radio buttons with querySelectorAll-this works:
  let radios = document.querySelectorAll("input[type='radio']");
  // for (const radio of radios) {
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
      diet = event.target.value;
      getData(myIngredient, diet, cuisine);
      console.log("diet:", diet);
    });
    // radio.onchange = (e) => {
    //   diet = e.target.value;
    //   getData(myIngredient, e.target.value);
    // };
  }

  // select the checked check-Boxes
  let checkbox = document.querySelectorAll("input[type='checkbox']");

  for (let c = 0; c < checkbox.length; c++) {
    checkbox[c].addEventListener("change", function (event) {
      cuisine = event.target.value;
      getData(myIngredient, diet, cuisine);
      console.log("cuisine:", cuisine);
    });
  }
}

// get the values of onne or more checked checkBoxes "Cuisine"
let buttonSubmit = document.getElementById("btnSubmit");
let values = [];
buttonSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let checkBoxes = document.getElementsByName("cuisine");
  // console.log("checkBoxes:", checkBoxes);
  for (let c = 0; c < checkBoxes.length; c++) {
    if (checkBoxes[c].checked == true) {
      console.log("chosen cuisine(s)", checkBoxes[c].value);
      values.push(checkBoxes[c].value);
    }
    // const element = array[c];
  }
  console.log("The value(s): " + values.toString());
  getData(myIngredient, diet, values.toString());
  // alert("The value(s): " + values.toString());
});

// event for all checked checkButtons

function checkUncheck() {
  let checkbox = document.getElementById("");
  if (checkBoxes.checked) {
    checkBoxes.checked = false;
  } else {
    checkBoxes.checked = true;
  }
}

// TODO put this block of code into a function
// TODO call the function
// TODO get recies with all cusines / default value without cusine
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
};

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

// add event to all radio buttons
// when one of them is changed you retrieve the value of the radio button & you call getData with that value

// diet = "vegetarian"
// getData(myIngredient, "vegetarian")
