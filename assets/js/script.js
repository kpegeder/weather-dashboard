$(document).ready(function () {
  let lat;
  let lon;
  let citySearch = "Portland";
  const authKey = "5d1c7596956991e51b3545595059228a";

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

    // City name
    $(".city").text(
      response.name +
        " (" +
        moment().format("L") +
        ")" +
        response.weather[0].icon
    );
    $(".temperature").text("Temperature: " + tempF.toFixed(1) + " °F");
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    $(".wind").text("Wind speed: " + response.wind.speed + " MPH");
    console.log(response);
    lat = response.coord.lat;
    lon = response.coord.lon;
  });

  console.log(lat);

  // let uviURL =
  //   "http://api.openweathermap.org/data/2.5/uvi?appid=" +
  //   authKey +
  //   "&lat=" +
  //   lat +
  //   "&lon=" +
  //   lon;
  // $.ajax({
  //   url: uviURL,
  //   method: "GET"
  // }).then(function (response) {
  //   console.log(response);
  //   // $(".uvIndex").text(response);
  // });

  $(".citySearchBtn").on("click", function () {
    citySearch = $("#searchCity").val().trim();

    let queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearch +
      "&appid=" +
      authKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      let city = $("<h2>").text(response.name);
      $(".cityInfo").append(city);
      console.log(response);
    });
  });
});
