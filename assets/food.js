$(document).ready(function () {

  function displayRecipeResults() {

    let recipe = "pizza";
    let recipeAppId = "ebb2aaf0";
    let recipeAppKey = "d9831c7736fa3c2896b448031e2382c1";
    let queryUrl = `https://api.edamam.com/search?q=${recipe}&app_id=${recipeAppId}&app_key=${recipeAppKey}`

    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function (response) {
      // console.log(response);

      let recipeResults = response.hits;
      // console.log(recipeResults);

      //for loop that will return search results
      for (let i = 0; i < recipeResults.length; i++) {
        // console.log(recipeResults[i]);

        //result card api calls
        let recipeLabel = recipeResults[i].recipe.label;
        // console.log(recipeLabel);
        let recipeCalories = recipeResults[i].recipe.calories;
        // console.log(recipeCalories);
        let recipeHealthLabels = recipeResults[i].recipe.healthLabels;
        // console.log(recipeHealthLabels);
        let recipeYield = recipeResults[i].recipe.yield;
        // console.log(recipeYield);

        //modal api calls
        recipeLabel = recipeResults[i].recipe.label;
        let recipeImage = recipeResults[i].recipe.image;
        // console.log(recipeImage);
        let recipeIngredients = recipeResults[i].recipe.ingredients;
        console.log(recipeIngredients);
        let recipeTotalNutrients = recipeResults[i].recipe.totalNutrients;
        console.log(recipeTotalNutrients);
        let recipeURL = recipeResults[i].recipe.url;
        // console.log(recipeURL);
      }

    });
  }

  displayRecipeResults();


  //function to display results
  function displayCards() {


  }

  //on click event for search results
  $("#searchResults").on("click", function () {

    // let sportGif = $("#gif-input").val().trim();
    //     sports.push(sportGif);
    //     displayButtons();


  })

  //function to display filters



  //function for filter selection

  function filterSelection() {

    //   let excluded = "";
    //   let diet = ["balanced", "high-protein", "low-fat", "low-carb"];
    //   let health = ["alcohol-free", "peanut-free", "sugar-conscious", "tree-nut-free", "vegan", "vegetarian"]

  }

  // $('[data-toggle="tooltip"]').tooltip();

  // $('#myModal').on('shown.bs.modal', function () {
  //     $('#myInput').trigger('focus')
  //   })









  // function displayProductResults() {

  //   let product = "Pizza Hut pizza";
  //   let productAppId = "e4745d65";
  //   let productAppKey = "454fda2436cd36400901d0298d870561";
  //   let queryUrl = `https://api.edamam.com/api/food-database/parser?ingr=${product}&app_id=${productAppId}&app_key=${productAppKey}`;

  //   $.ajax({
  //     url: queryUrl,
  //     method: "GET"
  //   }).then(function (response) {
  //     console.log(response);

  //     let productResults = response.hints;

  //     for(let j = 0; j < productResults.length; j++) {

  //       //result card api calls
  //       let productLabel = productResults[j].food.label;
  //       console.log(productLabel);
  //       let productBrand = productResults[j].food.brand;
  //       console.log(productBrand);
  //       let productCategory = productResults[j].food.category;
  //       console.log(productCategory);
  //       let productNutrients = productResults[j].food.nutrients;
  //       console.log(productNutrients);

  //     }

  //   });
  // }
  // displayProductResults();

})


