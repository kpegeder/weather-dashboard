$(document).ready(function () {
  let lat;
  let lon;
  // let dayArr = [];
  let displayDate;
  let citySearch = "Portland";
  const authKey = "5d1c7596956991e51b3545595059228a";
  // Retrieving the URL for the image
  // const imgURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"

  // Creating an element to hold the image
  // var image = $("<img>").attr("src", imgURL);

  forecast(citySearch);
  // fiveDayForecast(citySearch);

  $(".citySearchBtn").on("click", function () {
    citySearch = $("#searchCity").val().trim();

    if (citySearch == "") {
      return;
    }

    forecast(citySearch);
    previousCityBtn(citySearch);
    $("#searchCity").empty().val("");
  });

  $(document).on("click", ".historyBtn", function () {
    let historyCity = $(this).val();
    console.log(historyCity);
    forecast(historyCity);
  });

  function uvForecast() {
    let uviURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      authKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    $.ajax({
      url: uviURL,
      method: "GET"
    }).then(function (response) {
      // Create element
      let UV = $("<p>").addClass("uvIndex");

      UV.text("UV Index: " + response.value);

      $(".cityInfo").append(UV);
    });
  }

  function forecast(city) {
    // Clear previous city info
    $(".cityInfo").empty();

    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch +
      "&appid=" +
      authKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // Convert the temp to fahrenheit
      let tempF = (response.main.temp - 273.15) * 1.8 + 32;

      // Retrieving the URL for the image
      let imgURL =
        "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";

      // Creating elements for html
      let city = $("<h2>");
      let icon = $("<img>").attr("src", imgURL);
      let temp = $("<p>");
      let humidity = $("<p>");
      let wind = $("<p>");

      // Add classes
      city.addClass("city");
      temp.addClass("temperature");
      humidity.addClass("humidity");
      wind.addClass("wind");

      // Add text
      city.text(response.name + " (" + moment().format("L") + ")");
      city.append(icon);
      temp.text("Temperature: " + tempF.toFixed(1) + " °F");
      humidity.text("Humidity: " + response.main.humidity + " %");
      wind.text("Wind speed: " + response.wind.speed + " MPH");

      // Add to html
      $(".cityInfo").append(city, temp, humidity, wind);

      // Save Lat and Lon for uv index
      lat = response.coord.lat;
      lon = response.coord.lon;

      uvForecast();
      fiveDayForecast();
    });
  }

  function previousCityBtn(city) {
    let button = $("<button>");

    button.addClass("list-group-item list-city historyBtn");

    button.attr("type", "button");

    button.text(city).val(city);

    $(".list-group").prepend(button);
  }

  function fiveDayForecast() {
    $(".singleDay").empty();

    let fiveDayURL =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly&units=imperial&appid=" +
      authKey;
    $.ajax({
      url: fiveDayURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (let i = 1; i < 6; i++) {
        // Get future days
        unixTime(response.daily[i].dt);

        // Access 5-Day forecast square
        let furtureForecast = $($(".singleDay")[i - 1]);

        // Retrieving the URL for the image
        let imgURL =
          "http://openweathermap.org/img/wn/" +
          response.daily[i].weather[0].icon +
          ".png";

        // Creating elements for html
        let fiveDayDate = $("<h4>");
        let fiveDayIcon = $("<img>").attr("src", imgURL);
        let temp = $("<p>");
        let humidity = $("<p>");

        // Add classes
        temp.addClass("future-forecast");
        humidity.addClass("future-forecast");

        // Add text
        fiveDayDate.text(displayDate);
        fiveDayDate.append(fiveDayIcon);
        temp.text("Temp: " + response.daily[i].temp.day.toFixed(2) + " °F");
        humidity.text("Humidity: " + response.daily[i].humidity + " %");

        // Add to html
        furtureForecast.append(fiveDayDate, temp, humidity);
      }
    });
  }

  // Get time out from epoch
  function unixTime(dt) {
    let date = new Date(dt * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    displayDate = month + "/" + day + "/" + year;
  }
});
