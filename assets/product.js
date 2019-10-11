$(document).ready(function () {

    function buildQuery() {
        let baseUrl = 'https://api.edamam.com/api/food-database/parser?'
        let recipeAppId = "e4745d65",
            recipeAppKey = "454fda2436cd36400901d0298d870561";

        baseUrl += "ingr=" + $("#product-input").val()

        baseUrl += "&app_id=" + recipeAppId
        baseUrl += "&app_key=" + recipeAppKey

        return baseUrl
    }

    function displayProductResults() {
        $.ajax({
            url: buildQuery(),
            method: "GET"
        }).then(function (response) {

            let productResults = response.hints;
            console.log(productResults);


            for (let j = 0; j < productResults.length; j++) {

                let resultsProdDiv = $("<div>");
                resultsProdDiv.addClass("card card-body");

                //result card api calls
                let productLabel = $("<h5>");
                productLabel.text("Title: " + productResults[j].food.label);
                // console.log(productLabel);
                let productBrand = $("<p>");
                productBrand.text("Brand: " + productResults[j].food.brand);
                // console.log(productBrand);
                let productCategory = $("<p>");
                productCategory.text("Category: " + productResults[j].food.category);
                // console.log(productCategory);
                let productCarbs = $("<p>");
                productCarbs.text("Carbs: " + parseInt(productResults[j].food.nutrients.CHOCDF));
                let productFat = $("<p>");
                productFat.text("Fat: " + parseInt((productResults[j].food.nutrients.FAT)));
                let productFiber = $("<p>");
                productFiber.text("Fiber: " + parseInt(productResults[j].food.nutrients.FIBTG));
                let productEnergy = $("<p>");
                productEnergy.text("Energy: " + parseInt(productResults[j].food.nutrients.ENERC_KCAL));
                let productProtein = $("<p>");
                productProtein.text("Protein: " + parseInt(productResults[j].food.nutrients.PROCNT));

                
        let heartButton = $("<button>");
        heartButton.attr({
          'type': 'image', 'class': 'heartBut btn', 'data-toggle': 'tooltip', 'data-placement': 'bottom',
          'title': 'Save for Later'
        });

                let heartButtonImg = $("<i>");
                heartButton.attr("data-record", i);
                 heartButtonImg.attr({ 'class': 'fas fa-heart fa-lg' });
                 heartButton.append(heartButtonImg);

                resultsProdDiv.append(productLabel);
                resultsProdDiv.append(productBrand);
                resultsProdDiv.append(productCategory);
                resultsProdDiv.append(productCarbs);
                resultsProdDiv.append(productFat);
                resultsProdDiv.append(productFiber);
                resultsProdDiv.append(productEnergy);
                resultsProdDiv.append(productProtein);
               
                resultsProdDiv.append(heartButton);

                $("#searchResults").append(resultsProdDiv);

            }

        });
    }
    displayProductResults();

    $("#searchProductButton").on("click", function () {
        event.preventDefault();
        displayProductResults()
    })

})