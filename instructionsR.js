let title = "";
let equipment = "";
let recipeInstructions = "";
let ingredients = "";
let steps = "";

// after creating the HTML-file "recipeinstructions.html"-> next steps: "instructions.js" , where I write a onload-function with my search Paremeters ( I need the recipe ID and the instructions) and make my request using the ...
//*... FETCH API: ======================================================================

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("name");
  console.log("urlParams", urlParams);
  console.log("title", title);
  const recipeId = urlParams.get("id");
  console.log("recipeId", recipeId);
  getInstructions(recipeId);
};

function getInstructions(recipesId) {
  // TODO  fetch the recipes steps (use the url from postman withexampel-id:324694-> this works)-> now check live data
  const url2 = `https://api.spoonacular.com/recipes/${recipesId}/analyzedInstructions?apiKey=5e3c0f30def64e1ba729347a1a4b34af&stepBreakdown=true`;
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
//* I declare then variables for the dta and the <div> used to output the data: =======================================================================================

let divContainer = document.getElementById("container");
function displayRecipesInstructions(data) {
  const instructionSteps = data[0].steps;
  console.log("instructionSteps", instructionSteps);
  // for loop  , loop instructionsSteps.length. Try with forEach  (if you need to extract information from any array INSIDE instructionSteP.ingredients (for example), you will need to create another loop (forEach, or for-loop), inside the main loop (inside the same {}))
}

// let divContainer = document.getElementById("container");
// function displayRecipesInstructions(data) {
//   const instructionSteps = data[0].steps;
//   console.log("instructionSteps", instructionSteps);
// //for loop  , loop instructionsSteps.length. r´try with forEach
//   instructionSteps.forEach((instructionStep) => {
//     console.log(instructionStep);

//     instructionStep.ingredients.forEach((ingredient) => {
//       console.log(ingredient);
//     });
//   });
// }

//!oder vorher:let divContainer = document.getElementById("container");
// function displayRecipesInstructions(data) {
//   const instructionSteps = data[0].steps;
//   console.log("instructionSteps", instructionSteps);
//   // for loop  , loop instructionsSteps.length. r´try with forEach
//   instructionSteps.forEach((instructionStep) => {
//     console.log(instructionStep);
//     let div = document.createElement("div");
//     div.innerHTML = instructionStep.step;
//     divContainer.appendChild(div);
//   });
// }

//! (What abou this?:)
//!  function displayRecipeInstruction(data) {
//!    const recipe = data.instructionSteps[0];
//!    const recipeInstructions = document.getElementById("recipe");
//!   }

//* I have to output  now the data to the HTML, starting with the "name"/"title" / instructionsteps
// const recipeTitle =

const instruction = recipeInstructions.step;
const instructionCard = document.createElement("div");
// div.innerHtml = instruction;
// instructionDiv.appendChild(instructionCard);
//! -> error at 53: div is not defined

//* (add image to the recipe <div> (?) -> check img first

//* loop through ingredients and output them into the ingredients unordered list
