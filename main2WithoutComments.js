//*function of "Hide & Show Button" for more and less Broccoli-Infos========================================
function showHide() {
  let mySecondaryText = document.getElementById("secondary-text");
  let isHidden = Array.from(mySecondaryText.classList).includes("hide");
  if (isHidden === true) {
    mySecondaryText.classList.remove("hide");
    mySecondaryText.classList.add("show");
    event1.target.innerHTML = "Read Less";
  } else {
    mySecondaryText.classList.remove("show");
    mySecondaryText.classList.add("hide");
    event1.target.innerText = "Read More";
  }
}

//*fetch the data from the API with chosen parameters ->like (my)ingredient, diet, cuisine,etc. =============
let myIngredient = "broccoli";
let diet = "";
let cuisine = "";
function getData(myIngredient, diet, cuisine) {
  console.log("myIngredient", myIngredient);
  console.log("diet", diet);
  console.log("cuisine", cuisine);
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7&query=${myIngredient}&number=4&diet=${diet}&cuisine=${cuisine}`;
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);

      if (data.results.length === 0) {
        createCards("");
        alert("No recipes found");
      } else {
        createCards(data.results);
      }
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

//*get all data ===========================================================================================
window.onload = function () {
  getData(myIngredient, diet, cuisine);
  createEvents();
  checkAllOrUncheckAll();
};

//*In order to get the the live data ->function create Cards () from  the .then-Block!)======================
function createCards(data) {
  const recipiesContainer = document.getElementById("container");
  recipiesContainer.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    recipiesContainer.appendChild(divCard);
    // TODO 02.08.22: add id attribute to divCard that corresponds to the recipes id

    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute("style", "color:#198754");
    title.innerHTML = data[i].title;

    divCard.appendChild(title);

    //* show images of the recipes: ========================================================================
    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "card-img-top");
    img.style.width = "18rem";

    divCard.appendChild(img);
  }
}

//* create events for the search-button =====================================================================
function createEvents() {
  let mySearchButton = document.getElementById("search-button");
  mySearchButton.addEventListener("click", function (_event) {
    let myInput = document.getElementById("search-input");
    myIngredient = myInput.value;
    getData(myInput.value, diet, cuisine);
  });

  //* select the radio buttons with querySelectorAll: =======================================================
  let radios = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
      diet = event.target.value;
      getData(myIngredient, diet, cuisine);
    });
  }

  //*select the checked checkboxes-cuisine types ============================================================
  let checkbox = document.querySelectorAll("input[type='checkbox']");

  let checkedValues = [];
  for (let c = 0; c < checkbox.length; c++) {
    checkbox[c].addEventListener("change", function (event) {
      if (checkbox[c].checked == true) {
        checkedValues.push(checkbox[c].value);
      } else {
        const filteredCuisine = checkedValues.filter((myValue) => {
          return myValue !== checkbox[c].value;
        });

        console.log("filteredCuisine", filteredCuisine);
        checkedValues = filteredCuisine;
      }

      //* getData(myIngredient, diet, cuisine) ============================================================
      cuisine = checkedValues.toString();
      console.log("checkedValues", checkedValues);
      getData(myIngredient, diet, checkedValues.toString());
    });
  }
}

//* the "function checkAllOrUncheckAll()" checkes if all(or none)of the checkboxes are checked & get data====
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
    let allOrNoneChecked = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    console.log("allOrNoneChecked", allOrNoneChecked);

    let allCuisine = [];
    if (allOrNoneChecked.length === 0) {
      getData(myIngredient, diet, "");
      cuisine = "";
    } else {
      for (let i = 0; i < allOrNoneChecked.length; i++) {
        allCuisine.push(allOrNoneChecked[i].value);
      }
      cuisine = allCuisine.toString();
      console.log("allCuisine", allCuisine);
      getData(myIngredient, diet, allCuisine.toString());
    }
  };
}
