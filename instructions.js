// let title = "";
// console.log(title);
let equipment = "";
let recipeInstructions = "";
let ingredients = "";
let steps = "";

// after creating the HTML-file "recipeinstructions.html"-> next steps: "instructions.js" , where I write a onload-function with my search Paremeters ( I need the recipe ID and the instructions) and make my request using the ...
//*... FETCH API: ======================================================================

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("name");
  const h6 = document.querySelector("h6");
  h6.innerHTML += " " + title;
  console.log("urlParams", urlParams);
  console.log("title", title);

  // const img = urlParams.get("img");
  // const image = document.querySelector("image");
  // image.
  const recipeId = urlParams.get("id");
  // if I use "myParam" -> I get also the same ID liek with "recipeId":
  // console.log("myParam", recipeId);
  console.log("recipeId", recipeId);
  getInstructions(recipeId);
};

function getInstructions(recipesId) {
  // TODO  fetch the recipes steps (use the url from postman withexampel-id:324694-> this works)-> now check live data:
  const url2 = `https://api.spoonacular.com/recipes/${recipesId}/analyzedInstructions?apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7&stepBreakdown=true`;
  fetch(url2)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data) {
      displayRecipesInstructions(data);
      console.log("fetched instructions>>>", data);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}
// (I can see the data in the console, if the request is successful)

//* now I can pass this data to a function, that will render it into the HTML with a "displayRecipeInstructions()" - function.
//* I declare then variables for the data and the <div> used to output the data: =======================================================================================

// let divContainer = document.getElementById("container");
// function displayRecipesInstructions(data) {
//   const instructionSteps = data[0].steps;
//   console.log("instructionSteps", instructionSteps);
//* for loop  , loop instructionsSteps.length. Try with forEach  (if you need to extract information from any array INSIDE instructionSteP.ingredients (for example), you will need to create another loop (forEach, or for-loop), inside the main loop (inside the same {}))
// }
// function createCards(data) {
//   let divContainer = document.getElementById("container");
//   divContainer.innerHTML = "";
// }

function createCards(_instructionContainer) {
  const container = document.getElementById("instructionContainer");
  container.innerHTML = "";
}

function displayRecipesInstructions(data) {
  const instructionSteps = data[0].steps;
  // console.log("instructionSteps", instructionSteps);

  //for loop , loop instructionsSteps.length. r´try with forEach
  instructionSteps.forEach((instructionStep) => {
    console.log("instructionStep", instructionStep);

    let ingredients = document.createElement("ul");
    ingredients.innerHTML = instructionStep.number + ":" + instructionStep.step;

    instructionContainer.appendChild(ingredients);

    instructionStep.ingredients.forEach((yourIngredient) => {
      console.log("yourIngredient", yourIngredient.image);
      let ingredientImg = document.createElement("img");
      ingredientImg.setAttribute("src", yourIngredient.image);
      instructionStep.equipment.forEach((equipment) => {
        console.log("equipment", equipment);
      });
    });
  });
}

//! (What about this?:)
//!  function displayRecipeInstruction(data) {
//!    const recipe = data.instructionSteps[0];
//!    const recipeInstructions = document.getElementById("recipe");
//!   }

//* I have to output  now the data to the HTML, starting with the "name"/"title" / instructionsteps
// const recipeTitle =

// const instruction = recipeInstructions.step;
// const instructionCard = document.createElement("div");
// div.innerHtml = instruction;
// instructionDiv.appendChild(instructionCard);
//! -> error at 53: div is not defined

//* (add image to the recipe <div> (?) -> check img first

//* loop through ingredients and output them into the ingredients unordered list
