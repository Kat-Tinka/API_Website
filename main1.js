//*function of "HIDE & SHOW-BUTTON" for more and less Broccoli-Infos===========================================================================================
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

//*FETCH THE DATA from the API with chosen parameters ->like (my)ingredient, diet, cuisine,etc. ======================================================================
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

  //* FETCH 1: myIngredient, diet, cuisine ======================================================
  const url1 = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&query=${myIngredient}&number=4&diet=${diet}&cuisine=${cuisine}`;
  console.log(url1);
  fetch(url1)
    .then(function (response) {
      return response.json();
      // const url2 = "";
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

//*WINDOW.ONLOAD TO BUNDLE THE DATA ============================================================================================
window.onload = function () {
  if (document.title === "My Holy Broccoli") {
    getData(myIngredient, diet, cuisine, recipesId);
    createEvents();
    checkAllOrUncheckAll();
  }
};

//*GET LIVE DATA BY CALLING the function below from the .then-Block============================================================
function createCards(data) {
  const recipiesContainer = document.getElementById("container");
  recipiesContainer.innerHTML = "";
  // *LOOP TO CREATE A CARD FOR EACH ELEMENT OF THE ARRAY=======================================================================================================
  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");

    recipiesContainer.appendChild(divCard);

    //* TITLES FOR THE CARDS==============================================================================================
    let title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.setAttribute("style", "color:#198754");
    title.innerHTML = data[i].title;

    divCard.appendChild(title);

    //*RECIPE-IMAGES==========================================================================================================
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

//* EVENT FOR SEARCH-BUTTON=====================================================================================================
function createEvents() {
  let mySearchButton = document.getElementById("search-button");
  mySearchButton.addEventListener("click", function (_event) {
    let myInput = document.getElementById("search-input");
    myIngredient = myInput.value;
    getData(myInput.value, diet, cuisine, recipesId);
  });

  //select the radio buttons with querySelectorAll: =========================================================================================================================
  let radios = document.querySelectorAll("input[type='radio']");
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function (event) {
      diet = event.target.value;
      getData(myIngredient, diet, cuisine);
    });
  }

  //*SELECT THE CHECKED CHECKBOXES CUISINE-TYPES WITH FILER-METHOD====================================================================
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

      //* GETDATA(myIngredient, diet, cuisine); ========================================================================================
      cuisine = checkedValues.toString();
      console.log("checkedValues", checkedValues);
      getData(myIngredient, diet, checkedValues.toString());
      getInstructions(recipesId);
    });
  }
}

//* FUNCTION checkAllOrUncheckAll()"- gives also the cuisine-data back =================================================================
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
