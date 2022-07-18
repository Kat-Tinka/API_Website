//Get the data out of the API/ endpoint
console.log(findByIngredientsData);
console.log("findByIngredientsData :>> ", findByIngredientsData[1].title);
// let recipes = data.results;
let recipes = findByIngredientsData;
console.log("recipes :>> ", recipes);
// console.log("recipies.length :>> ", recipes.length);
const recipiesContainer = document.getElementById("container");

let checkBoxContainer = document.createElement("div");

recipiesContainer.appendChild(checkBoxContainer);

//Create Checkboxes (Vegetarian, vegan, carnovore, pescetarian)

//  Create Checkboxes (Vegetarian, vegan, carnovore, pescetarian)

//     <div>
//       <input type="checkbox" id="vegan" name="">
//       <label for ="">Vegan</label>
//     </div>

//     <div>
//       <input type="checkbox" id="vegetarian" name="">
//       <label for="">Vegetarian</label>
//     </div>
// <div>
//       <input type="checkbox" id="pescetarian" name="">
//       <label for
//             ="">Pescetarian</label>
//     </div>

//     <div>
//       <input type="checkbox" id="carnivore" name="">
//       <label for="">Carnivore</label>
//     </div>

/* Create Checkboxes:  */

// erstelle eine liste mit strings (mit Indexpositionen 0,1,2)_Unterscheid Index= fängt bei 0 an  und .length fängt bei 1 an)
const checkboxArray = ["vegetarian", "vegan", "pescetarian", "carnovore"];
console.log("checkboxArray.length :>> ", checkboxArray.length);

// erstelle eine for schleife für jedes element des arrays (der liste)
for (let i = 0; i < checkboxArray.length; i++) {
  // baue html-element vom Typ "input"  und weise es der variable "Checkboxes" zu
  let checkBoxes = document.createElement("input");
  //ich weise dem "input" das Attribut "type" zu->(ist das input eine checkbox, ein radiobutton oder ein schreibfeld)
  checkBoxes.setAttribute("type", "checkbox");
  //ich weise dem "input" names´ns checkboxes das Attribut "id" zu->damit ich bspweise ein Label(Vegatarian, etc ) damit verknüpfen kann
  checkBoxes.setAttribute("id", "checkboxId");
  //"class" steht in dem Fall für das Styling im CSS
  checkBoxes.setAttribute("class", "align-item");
  // -> das erste Kästchen/ InputElement (checkbox) im ersten Durchlauf kriegt den "Value" "vegetarian" => index[0]// danach den 2. Wert"Vegan" Indiesem Fall)usw.
  checkBoxes.setAttribute("value", checkboxArray[i]);
  // der Wert "i" , im 1. Durchlauf [0] => "vegetarian" wird im innerHtml zwischen die Klammern zugewiesen (nicht sichtbar reingeschreiben)
  checkBoxes.innerHTML = checkboxArray[i];
  //ich hänge an den checkboxContainer= parent-element das childElemnt (= checkBoxes)dran
  checkBoxContainer.appendChild(checkBoxes);

  //create label (als Beschriftung -> "vegetarina", etc)
  // ich kreiere ein Element des Typs "label" und benenne es "label", damit ich es später ansprechen kann
  let labels = document.createElement("label");
  //ich setze das Attribut "for" um das LAbel an das input ELement mit der ID "checkboxId" zu verknüpfen
  labels.setAttribute("for", "checkboxId");
  // jetzt schreibe ich den Wert des Arrays [0]->1.Durchlauf zwischen die LabelTags
  labels.innerHTML = checkboxArray[i];
  //ich hänge an den checkboxContainer= parent-element das childElement (= labels) dran, damit es angezeigt wird
  checkBoxContainer.appendChild(labels);
}
// check box (all recipe, vegan, vegetarian) */}

for (let i = 0; i < findByIngredientsData.length; i++) {
  let divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.setAttribute("class", "card");
  recipiesContainer.appendChild(divCard);

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
