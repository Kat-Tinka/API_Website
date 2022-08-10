// let title = "";
// console.log(title);
/* let equipment = "";
let recipeInstructions = "";
let ingredients = "";
let steps = ""; */

// after creating the HTML-file "recipeinstructions.html"-> next steps: "instructions.js" , where I write a onload-function with my search Paremeters ( I need the recipe ID and the instructions) and make my request using the ...
//*... FETCH API: ======================================================================

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("name");
  const h6 = document.querySelector("h6");
  h6.innerHTML += " " + title;

  console.log("urlParams", urlParams);
  console.log("title", title);

  const recipeId = urlParams.get("id");
  // if I use "myParam" -> I get also the same ID like with "recipeId":console.log("myParam", recipeId);
  console.log("recipeId", recipeId);
  getInstructions(recipeId);
};

function getInstructions(recipesId) {
  // TODO  fetch the recipes steps (first use the url from postman with saved exampel-id:324694-> this works)-> now check live data:
  const url2 = `https://api.spoonacular.com/recipes/${recipesId}/analyzedInstructions?apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7&stepBreakdown=true`;
  fetch(url2)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data) {
      // cleaning the data from what we dont need
      const instructionSteps = data[0].steps;

      // sending cleaned data ---> instructionSteps
      allIngredients(instructionSteps);
      displayRecipesInstructions(instructionSteps);
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

// function createCards(_instructionContainer) {
//   const container = document.getElementById("instructionContainer");
//   container.innerHTML = "";
// }

function allIngredients(instructionSteps) {
  console.log("instructionSteps", instructionSteps);
  const allIngredientsForRecipes = [];
  for (let i = 0; i < instructionSteps.length; i++) {
    /* console.log(
      "instructionSteps[i].ingredients",
      instructionSteps[i].ingredients
    ); */
    const ingredientsArray = instructionSteps[i].ingredients;
    for (let g = 0; g < ingredientsArray.length; g++) {
      console.log("ingredientsArray[g]", ingredientsArray[g]);
      console.log("ingredientsArray[g].name", ingredientsArray[g].name);
      // if allIngredientsForRecipes does not include the current ingredient name, push it
      if (!allIngredientsForRecipes.includes(ingredientsArray[g].name)) {
        allIngredientsForRecipes.push(ingredientsArray[g].name);
      }
    }
  }
  console.log("allIngredientsForRecipes", allIngredientsForRecipes);

  dispayListOfIngredients(allIngredientsForRecipes);
}
//*========================================================================================================
const ingredientsContainer = document.getElementById("ingredientsContainer");
console.log("ingredientsContainer", ingredientsContainer);
function dispayListOfIngredients(allIngredientsForRecipes) {
  // display the list of ingredients (loop)
  let ingredients = document.createElement("ul");

  allIngredientsForRecipes.forEach((allIngredientsforRecipe) => {
    let ingredient = document.createElement("li");
    ingredient.innerHTML = allIngredientsforRecipe;
    ingredients.appendChild(ingredient);

    // 1. create in HTML a ul for ingredientsContainer
    // 2. fill with li for every ingredient
  });
  console.log("ingredient", ingredients);
  ingredientsContainer.appendChild(ingredients);
}

// let ingredientsData = allIngredientsForRecipe;
// let list = document.getElementById("myList");
// ingredientsData.forEach((_item) =>) {
//   let li = document.cretaeElement("li");
//   li.innerText = item;
//   list.appendChild(li);
// }

// const allIngredientsForRecipe = getInstructions.length.number;
// console.log("allIngredientsForRecipe2", allIngredientsForRecipe);

//*  =================================================================================================================
//*OR:
// < !--copy from < instructions class="js" > function dispayListOfIngredients(allIngredientsForRecipes) {
//   // display the list of ingredients (loop)
//   for (let l = 0; l < allIngredientsForRecipes.length; l++) {
//     const allIngredientsForRecipesArray = allIngredientsForRecipes[l];
//     console.log(allIngredientsForRecipesArray);
//     if (
// !allIngredientsForRecipesArray.includes(allIngredientsForRecipes[l].name)
//     ) {
//       allIngredientsForRecipesArray.push(dispayListOfIngredients[l].name);
//     }
//   }
//   // 1. create in HTML a ul for ingredientsContainer
//   // 2. fill with li for every ingredient
// }
// console.log(allIngredientsForRecipesArray);

// function displayRecipesInstructions(instructionSteps) {
//   // console.log("instructionSteps", instructionSteps);

//   //for loop , loop instructionsSteps.length. r´try with forEach
//   instructionSteps.forEach((instructionStep) => {
//     /*     console.log("instructionStep", instructionStep);
//      */
//     let ingredients = document.createElement("p");
//     ingredients.innerHTML = instructionStep.number + ":" + instructionStep.step;

//     instructionContainer.appendChild(ingredients);

//     if (instructionStep.length) {
//       //create a new text with the length

//       const cookingLength = instructionStep.length.number;
//       const cookingUnit = instructionStep.length.unit;

//       console.log("cookingLength", cookingLength);
//       console.log("cookingUnit", cookingUnit);
//     }</instructions> -->

function displayRecipesInstructions(instructionSteps) {
  // console.log("instructionSteps", instructionSteps);

  //for loop , loop instructionsSteps.length. r´try with forEach
  instructionSteps.forEach((instructionStep) => {
    /*     console.log("instructionStep", instructionStep);
     */
    let ingredients = document.createElement("p");
    ingredients.innerHTML = instructionStep.number + ":" + instructionStep.step;

    instructionContainer.appendChild(ingredients);

    if (instructionStep.length) {
      //create a new text with the length

      const cookingLength = instructionStep.length.number;
      const cookingUnit = instructionStep.length.unit;

      console.log("cookingLength", cookingLength);
      console.log("cookingUnit", cookingUnit);
    }

    /* instructionStep.ingredients.forEach((yourIngredient) => {
      
      
    }); */

    instructionStep.equipment.forEach((equipment) => {
      /*         console.log("equipment", equipment);
       */
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
