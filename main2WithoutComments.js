function getData() {
  console.log(1);
  fetch(
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=broccoli&apiKey=7a3ba6f9de424363a2a5db9bbdd2cef7"
  )
    .then(function (response) {
      console.log(2);
      return response.json();
    })
    .then(function (data) {
      createCards(data);
    })
    .catch(function (error) {
      console.log("error", error);
    });
  console.log(3);
}

function createCards(data) {
  console.log("DATA", data);
  const recipiesContainer = document.getElementById("container");

  for (let i = 0; i < data.length; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("class", "card");
    recipiesContainer.appendChild(divCard);

    let img = document.createElement("img");
    img.setAttribute("src", data[i].image);
    img.setAttribute("class", "card-img-top");
    img.style.width = "18rem";

    divCard.appendChild(img);
  }
}

getData();
