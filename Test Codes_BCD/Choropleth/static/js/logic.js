// Creating the map object, set to Atlantic Ocean
let myMap = L.map("map", {
  center: [14.59, -28.67],
  zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = "https://datahub.io/core/geo-countries/r/countries.geojson";

let geojson;

// Get the data with d3.
d3.json(geoData).then(function(data) {

  // Create a new choropleth layer.
  geojson = L.choropleth(data, {

    // Define which property in the features to use.
    valueProperty: "ISO_A3",

    // Set the color scale.
    scale: ["#ccffff", "#00e6e6"],

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 2,
      fillOpacity: 0.5
    },

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup(feature.properties.ADMIN);
    }
  }).addTo(myMap);

  // Set up the legend.
  

});
