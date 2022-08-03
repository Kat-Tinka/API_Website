//*Get the data out of the API/ endpoint====================================================================================================================
function getData() {
  console.log(1);
  //if javaScript tries to create Cards with data, that is not there yet-> the website will crush-> the whole fetch-proccess of the fetch function takes much longer than just creating cards -> because of this process with promises, you will see the asynchrony=> you will see the console.log-order:1,3,2.This is also the reason, why your data from an API is only available inside a .then-block ( not outside!)
  fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=broccoli&apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7"
  )
    .then(function (response) {
      // console.log("response", response); -> with console.log, you can check if the response was fine,not a must
      console.log(2);
      // return response.json is a promise ( which transforms the response into a readable json file)
      return response.json();
    })
    // ...which also creates a second promise, so we need another .then-function with a anonymous() callback, where we can receive the data ( all the broccoli data):
    .then(function (data) {
      // in order to get and show the LIVE DATA , I need to call this function "createCards()" from the .then-Block and send "data" as parameter over function( instead of createCards(data); we call it displayData sending the data)
      createCards(data);
      displayCards(data);
    })
    // because the .then-block can't show errors, we also need a .catch(function (error) ..:
    .catch(function (error) {
      console.log("error", error);
    });
  console.log(3);
}

// console.log(findByIngredientsData);
// console.log("findByIngredientsData :>> ", findByIngredientsData[1].title);
// general container called myContainer
const myContainer = document.getElementById("container");

// nachdem ich eine for-Schleife und alles zum Thema CheckBoxes erstellt habe, erstelle ich 2 Funktionen: 1.) "function createCheckboxes() {}" und füge alles zu CheckBoxes hier ein// danach eine 2. Funktion, um die CheckBoxes zu zeigen(2. "function displayData()")
//* Erstelle function createCheckboxes()====================================================================================================================
function createCheckboxes() {
  //* Create Checkboxes:  */
  let checkBoxContainer = document.createElement("div");
  // erstelle eine liste mit strings (mit Indexpositionen 0,1,2)_Unterschied Index= fängt bei 0 an  und .length fängt bei 1 an)=> that's for the filter part:
  const checkboxArray = ["vegetarian", "vegan", "pescetarian", "carnivore"];
  console.log("checkboxArray.length :>> ", checkboxArray.length);

  // erstelle eine for-Schleife für jedes Element des Arrays (der Liste)
  for (let i = 0; i < checkboxArray.length; i++) {
    // baue html-element vom Typ "input"  und weise es der Variable "Checkboxes" zu
    let checkBoxes = document.createElement("input");
    //ich weise dem "input" das Attribut "type" zu->(ist das input eine checkbox, ein radiobutton oder ein schreibfeld)
    checkBoxes.setAttribute("type", "checkbox");
    //ich weise dem "input" namens checkBoxes das Attribut "id" zu->damit ich bspweise ein Label(Vegatarian, etc ) damit verknüpfen kann
    checkBoxes.setAttribute("id", "checkboxId");
    //"class" steht in dem Fall für das Styling im CSS
    checkBoxes.setAttribute("class", "align-item");
    // -> das erste Kästchen/ InputElement (checkbox) im ersten Durchlauf kriegt den "Value" "vegetarian" => index[0]// danach den 2. Wert"Vegan" (In diesem Fall)usw.
    checkBoxes.setAttribute("value", checkboxArray[i]);
    // der Wert "i" , im 1. Durchlauf [0] => "vegetarian" wird im innerHtml zwischen die Klammern zugewiesen (nicht sichtbar reingeschreiben)
    checkBoxes.innerHTML = checkboxArray[i];
    //ich hänge an den checkboxContainer= parent-element das childElement (= checkBoxes)dran
    myContainer.appendChild(checkBoxes);

    //create label (als Beschriftung -> "vegetarian", etc)
    // ich kreiere ein Element des Typs "label" und benenne es "label", damit ich es später ansprechen kann
    let labels = document.createElement("label");
    //ich setze das Attribut "for" um das Label an das input ELement mit der ID "checkboxId" zu verknüpfen
    labels.setAttribute("for", "checkboxId");
    // jetzt schreibe ich den Wert des Arrays [0]->1.Durchlauf zwischen die LabelTags
    labels.innerHTML = checkboxArray[i];
    //ich hänge an den checkboxContainer= parent-element das childElement (= labels) dran, damit es angezeigt wird
    checkBoxContainer.appendChild(labels);
    myContainer.append(checkBoxContainer);
  }
}
createCheckboxes();

// 2.Funktion , um die CheckBoxes zu zeigen: "function displayData(){}"
function displayData(recipes) {
  // let recipes = data.results;
  //because of the implemented function displayData (recipes) ->fetch-function, I don't need the local data "let recipes = findByIngredientsData;" any more-> uncomment it!
  // let recipes = findByIngredientsData;
  console.log("recipes :>> ", recipes);
  // console.log("recipies.length :>> ", recipes.length);
  // const recipiesContainer = document.getElementById("container");

  // check box (all recipe, vegan, vegetarian) */}
  // following-> a way to display teh recipes->with the for-loop I am looping through all of my recipes "for (let i = 0; i < findByIngredientsData.length; i++) {..."
  for (let i = 0; i < findByIngredientsData.length; i++) {
    // following-> I create a div and a card for each recipe
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    myContainer.appendChild(divCard);

    let img = document.createElement("img");
    img.setAttribute("src", findByIngredientsData[i].image);
    img.setAttribute("class", "card-img-top");
    img.style.width = "18rem";

    divCard.appendChild(img);

    // Div Title of recipes
    let divTitle = document.createElement("div");

    divCard.appendChild(divTitle);
    divTitle.innerHTML = findByIngredientsData[i].title;

    /* <button type="button" class="btn btn-success">
  Success
</button>; */

    // Button
    let button = document.createElement("button");
    button.setAttribute("class", "btn btn-success");
    button.setAttribute("id", "btn-" + i);
    button.addEventListener("click", toggle);
    button.innerHTML = "Show More";
    divCard.appendChild(button);

    // Likes
    let divLikes = document.createElement("div");
    divLikes.setAttribute("style", "display:none");
    divLikes.setAttribute("id", "divLikes-" + i);
    divLikes.innerHTML = "Likes:" + findByIngredientsData[i].likes;
    divCard.appendChild(divLikes);

    function toggle() {
      const button = document.getElementById("btn-" + i);
      const likes = document.getElementById("divLikes-" + i);
      // console.log("likes :", likes);
      if (likes.style.display === "none") {
        //display block or display inline-> see mdm
        likes.style.display = "block";
        button.innerHTML = "Show Less";
      } else {
        likes.style.display = "none";
        button.innerHTML = "Show More";
      }
    }

    {
      /* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */
    }

    //? 1) create div element
    // ? 2) assign class " card-body"
    // ? 3) append the new DIV element to the div parent element

    // ? 4) create a p element
    // ? 5) assign a class "card-text"
    // ? 6) insert some text into the p tag (for example the title of the recipie)
    // ? 7) append the new p tag to the parent element
  }
}

// when the fetch function is declared and called, we get the live data response, so  displayData(); is not necessary any more-> therefore I commented it out
// displayData();

function readSearch(event) {}
