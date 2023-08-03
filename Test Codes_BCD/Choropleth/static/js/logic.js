// Creating the map object, set to Atlantic Ocean
let myMap = L.map("map", {
  center: [21.45, -9.80],
  zoom: 3.25,
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data for the outline of the countries
let geoData = "https://datahub.io/core/geo-countries/r/countries.geojson";

let geojson;

// Get the data with d3 for the map
d3.json(geoData).then(function(data) {
  // Create a new choropleth layer.
  geojson = L.choropleth(data, {
    // Define which property in the features to use to outline the countries
    valueProperty: "ISO_A3",
    // binding a popup to each layer, show name of country when clicked
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.ADMIN);
    }
  }).addTo(myMap);
});

function getCountryInfo(countryName) {
  d3.json('').then(function(data){


  })


}


// Function to populate the dropdown with options
function populateDropdown(data) {
  // Assuming data is an array of objects with a "Country" property
  var countryData = data.map(function(d) {
    return d.Country;
  });

  var dropdown = d3.selectAll("dropdown-item");
  dropdown.selectAll("option")
          .data(countryData)
          .enter()
          .append("option")
          .text(function(d) { return d; });}

d3.json("").then(function(data) {
  populateDropdown(data);
}).catch(function(error) {
  console.error("Error loading data:", error);
}).addTo(myMap);
