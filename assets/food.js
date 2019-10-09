  $(document).ready(function () {

  function getHealthFilter() {
    let selected = $("input[name='healthFilter']:checked").val();
    if (selected) {
      return selected
    } else {
      return "nope"
    }
  }

  function getDietFilter() {
    let selected = $("input[name='dietFilter']:checked").val();
    if (selected) {
      return selected
    } else {
      return "nope"
    }
  }

  $("input[name='healthFilter']").click(function () {
    $("#health-filter").text = $("#health-filter").text + $(this).attr(value)
  });

  $("input[name='dietFilter']").click(function () {
    $("#diet-filter").text = $("#diet-filter").text + $(this).attr(value)
  });

  function buildQuery() {
    let baseUrl = 'https://api.edamam.com/search?'
    let recipeAppId = "ebb2aaf0",
      recipeAppKey = "d9831c7736fa3c2896b448031e2382c1";

    baseUrl += "q=" + $("#recipe-input").val()

    if (getHealthFilter() !== "nope") {
      baseUrl += "&health=" + getHealthFilter()
    }
    if (getDietFilter() !== "nope") {
      baseUrl += "&diet=" + getDietFilter()
    }

    baseUrl += "&app_id=" + recipeAppId
    baseUrl += "&app_key=" + recipeAppKey

    return baseUrl
  }

  function displayRecipeResults() {
    getDietFilter();

    $.ajax({
      url: buildQuery(),
      method: "GET"
    }).then(function (response) {
      let recipeResults = response.hits;
      console.log(recipeResults);

      $("#searchResults").empty()

      //for loop that will return search results
      for (let i = 0; i < recipeResults.length; i++) {
        // console.log(recipeResults[i]);

        let resultsDiv = $("<div>");
        resultsDiv.addClass("card card-body");

        //result card api calls
        let recipeLabel = $("<h5>");
        recipeLabel.text("Title: " + recipeResults[i].recipe.label);

        let recipeCalories = $("<p>");
        recipeCalories.text("Calories: " + parseInt(recipeResults[i].recipe.calories));

        let recipeHealthLabels = $("<p>");
        recipeHealthLabels.text("Health Labels: " + recipeResults[i].recipe.healthLabels);

        let recipeYield = $("<p>");
        recipeYield.text("Servings: " + recipeResults[i].recipe.yield);

        let moreInfoButton = $("<button>");
        moreInfoButton.attr({ type: "button", class: "btn btn-success" });
        moreInfoButton.text("More Details");
        // $("#searchResults").append(resultsDiv)

        resultsDiv.append(recipeLabel);
        resultsDiv.append(recipeCalories);
        resultsDiv.append(recipeHealthLabels);
        resultsDiv.append(recipeYield);
        resultsDiv.append(moreInfoButton)

        $("#searchResults").append(resultsDiv);



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
  $("#searchRecipeButton").on("click", function () {
    event.preventDefault();
    // let sportGif = $("#gif-input").val().trim();
    //     sports.push(sportGif);
    //     displayButtons();
    displayRecipeResults()

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


