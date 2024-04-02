
  /**
   * Makes a request to animals api endpoint with the given 
   * animal parameter, then populates the results div with result image
   * paths if the request was successful.
   */
  async function makeRequest() {
    //clear the results div
    document.getElementById("results").innerHTML = "";

    // get the animal query that the user has entered
    animalquery = document.getElementById("animal").value;

    //TODO: Make ajax fetch request and call populateResults, or display error message
    try {
      let response = await fetch("/api/animals?animal=" + animalquery)
      let responseText = await response.text()
      populateResults(responseText, animalquery)
    } catch (error) {
      document.getElementById("results").innerHTML = error;
    }
  }
  
  /**
   * Populates the results div with the a header showing what the results are for,
   * then all the images found in the array imageurls.
   * Note: The imageurls could use relative paths or absolute paths.
   */
  function populateResults(imageurls, animalquery) {
    imageurls = JSON.parse(imageurls)

    //first make a header showing what the results are for
    let resultsHead = document.createElement("h2");
    resultsHead.innerHTML = "Hybrid results for " + animalquery + ": ";
    document.getElementById("results").appendChild(resultsHead);

    if(imageurls.length == 0){
      document.getElementById("results").innerHTML = "No images found :(";
    } else{
      // create image tags for each image url
      for (let i = 0; i < imageurls.length; i++) {
        let img = document.createElement("img");
        img.src = imageurls[i];
        document.getElementById("results").appendChild(img);
      }
    }
  }


