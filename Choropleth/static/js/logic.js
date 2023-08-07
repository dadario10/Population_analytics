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


// Set constant variable for drop down menu 
const dropdown = d3.select("#country-drop-down");
// List of countries in drop down menu
let dropdownOptions = ['Bangladesh','Brazil', 'China', 'India', 'Indonesia', 'Mexico','Nigeria',
                      'Pakistan', 'Russia', 'US']
                        

// Add each country name to drop down menu
dropdownOptions.forEach(countryName => {
  dropdown.append("option").text(countryName);
});

// run createcharts when dropdown option is changed
dropdown.on('change', newChange)

newChange()

// Function to acquire data from country-api and build charts accordingly
function createCharts(){
  let countryName = dropdown.property("value");

  d3.json(`http://127.0.0.1:5000/api/${countryName}`).then(countryData => {
    // console.log(countryData) // log to verify countryData is accurate data
    
    let yearList = countryData.map(obj => obj.Year);
    //console.log(yearList) 

    // Build Line Plot
    let traceLine = {
      x: countryData.map(obj => obj.Year),
      y: countryData.map(obj => obj.Population), 
      type:'line'
    }

    layout = {
      title: "Population Growth by Year",
      xaxis:{title:"Year"},
      yaxis:{
        title:{
          text:"Population",
          font: 25,
         standoff:20}
          }
    }

    let lineData = [traceLine]
    //Plot line chart for population by year
    Plotly.newPlot('line', lineData, layout);

  })
} // Ending bracket for createCharts()



      // Demographics Panel
    function buildMetadata(sample) {
      let countryName = dropdown.property("value");
        d3.json(`http://127.0.0.1:5000/api/${countryName}`).then((data) => {
          var metadata = data//.metadata;
          console.log(data)
          // var resultArray = metadata.filter(sampleObj => sampleObj.countries == sample);
          // var result = resultArray[0];
          let result=data[0]
          var PANEL = d3.select("#sample-metadata");
          // Use `.html("") to clear any existing metadata
          PANEL.html("");
          // Using Object.entries, add each key and value pair
          Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });
      
      });
    }

// Function to run when drop down menu option is changed
function newChange(){
  createCharts()
  buildMetadata(0)
}