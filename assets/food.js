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
    $.ajax({
      url: buildQuery(),
      method: "GET"
    }).then(function (response) {
      let recipeResults = response.hits;
      // console.log(recipeResults);

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
        moreInfoButton.attr({
          'type': 'button', 'id': 'ingredientButt', 'class': 'btn btn-success', 'data-toggle': 'modal',
          'data-target': '#exampleModal'
        });
        moreInfoButton.text("More Details");

        let heartButton = $("<button>");
        heartButton.attr({
          'type': 'image', 'class': 'heartBut btn', 'data-toggle': 'tooltip', 'data-placement': 'bottom',
          'title': 'Save for Later'
        });
        heartButton = $("<i>");
        heartButton.attr({ 'class': 'fas fa-heart fa-lg' });

        resultsDiv.append(recipeLabel);
        resultsDiv.append(recipeCalories);
        resultsDiv.append(recipeHealthLabels);
        resultsDiv.append(recipeYield);
        resultsDiv.append(moreInfoButton);
        resultsDiv.append(heartButton);

        $("#searchResults").append(resultsDiv);

        //modal api calls
        recipeLabel = recipeResults[i].recipe.label;
        let recipeImage = recipeResults[i].recipe.image;
        // console.log(recipeImage);
        let recipeIngredients = recipeResults[i].recipe.ingredients;
        // console.log(recipeIngredients);
        let recipeTotalNutrients = recipeResults[i].recipe.totalNutrients;
        // console.log(recipeTotalNutrients);
        let recipeURL = recipeResults[i].recipe.url;
        // console.log(recipeURL);
      }

    });
  }

  //on click event for search results
  $("#searchRecipeButton").on("click", function () {
    event.preventDefault();
    displayRecipeResults()
  })


  $('[data-toggle="tooltip"]').tooltip();

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

 

})


