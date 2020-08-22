$(document).ready(function () {
  let lat;
  let lon;
  let citySearch = "Portland";
  const authKey = "5d1c7596956991e51b3545595059228a";
  // Retrieving the URL for the image
  // const imgURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"

  // Creating an element to hold the image
  // var image = $("<img>").attr("src", imgURL);

  forecast(citySearch);
  fiveDayForecast(citySearch);

  $(".citySearchBtn").on("click", function () {
    citySearch = $("#searchCity").val().trim();

    forecast(citySearch);
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
      console.log(response);
      $(".uvIndex").text("UV Index: " + response.value);
    });
  }

  function forecast(city) {
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
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";

      // Creating an element to hold the image
      let image = $("<img>").attr("src", imgURL);

      // City name
      $(".city").text(response.name + " (" + moment().format("L") + ")");
      $(".city").append(image);
      $(".temperature").text("Temperature: " + tempF.toFixed(1) + " °F");
      $(".humidity").text("Humidity: " + response.main.humidity + " %");
      $(".wind").text("Wind speed: " + response.wind.speed + " MPH");
      lat = response.coord.lat;
      lon = response.coord.lon;

      uvForecast();

      console.log(response);
    });
  }

  function fiveDayForecast(city) {
    let fiveDayURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      authKey;

    $.ajax({
      url: fiveDayURL,
      method: "GET"
    }).then(function (response) {
      console.log(response.list);
    });
  }
});
