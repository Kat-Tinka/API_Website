window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  console.log("myParam", recipeId);
  getInstructions(recipeId);
};

function getInstructions(recipesId) {
  // TODO  fetch the recipes steps (use the url from postman withexampel-id:324694-> this works)-> now check live data
  const url2 = `https://api.spoonacular.com/recipes/${recipesId}/analyzedInstructions?apiKey=3051f5e3ddb849588d48b1ecd14676f9&stepBreakdown=true`;
  fetch(url2)
    .then(function (response2) {
      return response2.json();
    })
    .then(function (data) {
      displayRecipesInstructions(data);
      console.log(data);
    })
    .catch(function (error) {
      console.log("error", error);
    });
}

function displayRecipesInstructions(data) {
  const instructionSteps = data[0].steps;
  console.log("instructionSteps", instructionSteps);
}
