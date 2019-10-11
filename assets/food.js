$(document).ready(function () {

  let recipeResults;
  let recipeModalReturn;
  let buttonId;

  function getHealthFilter() {
    let selected = $("input[name='health-filter']:checked").val();
    if (selected) {
      return selected
    } else {
      return "nope"
    }
  }

  function getDietFilter() {
    let selected = $("input[name='diet-filter']:checked").val();
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
      recipeResults = response.hits;
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

        let recipeDietLabels = $("<p>");
        recipeDietLabels.text("Diet Labels: " + recipeResults[i].recipe.dietLabels);

        let recipeHealthLabels = $("<p>");
        recipeHealthLabels.text("Health Labels: " + recipeResults[i].recipe.healthLabels);

        let recipeYield = $("<p>");
        recipeYield.text("Servings: " + recipeResults[i].recipe.yield);

        let moreButtonDiv = $("<div>");
        moreButtonDiv.addClass("col-lg-3");

        let moreInfoButton = $("<button>");
        moreInfoButton.attr("data-record", i);
        moreInfoButton.attr({
          'type': 'button', 'id': 'ingredientButt', 'class': 'btn btn-success', 'data-toggle': 'modal',
          'data-target': '#exampleModal'
        });
        moreInfoButton.text("More Details");

        moreButtonDiv.append(moreInfoButton);

        let heartButtonDiv = $("<div>");
        heartButtonDiv.addClass("col-lg-9");

        let heartButton = $("<button>");
        heartButton.attr({
          'type': 'image', 'class': 'heartBut btn', 'data-toggle': 'tooltip', 'data-placement': 'bottom',
          'title': 'Save for Later'
        });
        let heartButtonImg = $("<i>");
        heartButtonImg.attr({ 'class': 'fas fa-heart fa-lg' });


        heartButton.append(heartButtonImg);
        heartButtonDiv.append(heartButton)

        resultsDiv.append(recipeLabel);
        resultsDiv.append(recipeCalories);
        resultsDiv.append(recipeDietLabels);
        resultsDiv.append(recipeHealthLabels);
        resultsDiv.append(recipeYield);
        resultsDiv.append(moreButtonDiv);
        resultsDiv.append(heartButtonDiv);

        $("#searchResults").append(resultsDiv);

        //modal api calls
        //   recipeLabel = recipeResults[i].recipe.label;
        //   let recipeImage = recipeResults[i].recipe.image;
        //   // console.log(recipeImage);
        //   let recipeIngredients = recipeResults[i].recipe.ingredients;
        //   // console.log(recipeIngredients);
        //   let recipeTotalNutrients = recipeResults[i].recipe.totalNutrients;
        //   // console.log(recipeTotalNutrients);
        //   let recipeURL = recipeResults[i].recipe.url;
        //   // console.log(recipeURL);
      }

    });
  }

  //on click event for search results
  $("#searchRecipeButton").on("click", function () {
    event.preventDefault();
    displayRecipeResults()
  })


  $('[data-toggle="tooltip"]').tooltip();



  $(document).on('click', '#ingredientButt', function () {

    $(".modal-body").empty();
    buttonId = $(this).attr("data-record")

    console.log("data record: " + buttonId);
    console.log("data: " + recipeResults);

    recipeLabel = recipeResults[buttonId].recipe.label;
    let recipeImage = recipeResults[buttonId].recipe.image;
    console.log(recipeImage);

    // let recipeIngredients = recipeResults[buttonId].recipe.ingredients.text;
    // console.log(recipeIngredients);
    let recipeTotalNutrients = recipeResults[buttonId].recipe.totalNutrients.label;
    console.log(recipeTotalNutrients);
    let recipeURL = recipeResults[buttonId].recipe.url;
    console.log(recipeURL);

    let modalBody = $("<div>");

    recipeResults[buttonId].recipe.ingredients.forEach(function (elem) {
      let ingredient = $("<li>");
      ingredient.text(elem.text);

      console.log("elem text: " + elem.text)
      modalBody.append(ingredient);
    })

    let modalPic = $("<img>");
    modalPic.attr("src", recipeImage);

    // let modalIngredientsDetail = $("<li>");
    // modalIngredientsDetail.html(JSON.stringify(ingredients));

    let modalNutrientsDetail = $("<li>");
    modalNutrientsDetail.html(JSON.stringify(recipeTotalNutrients));

    modalBody.prepend(modalPic);
    //modalBody.append(modalIngredientsDetail);
    modalBody.append(modalNutrientsDetail);

    $(".modal-body").append(modalBody);

    // $("#ingredientsList").append(modalIngredientsDetail);
    // $("#nutrientsList").append(modalNutrientsDetail);
    // $(".modal-body").append(modalBody)










  })

  $('#exampleModal').on('show.bs.modal', function () {
    //alert('hi')
  })



})


