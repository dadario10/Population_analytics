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

// function init(){

//   let selector=  d3.select("#country-drop-down");
//   let countries = ['China', 'India', 'US']
//   for(let i =0; i< countries.length; i++){
//     selector.append("option")
//     .attr('value', countries[i]) // Set the "value" attribute
//     .text(countries[i]);
//     }

// }

// init()



// NEW CODE 
const dropdown = d3.select("#country-drop-down");
let dropdownOptions = ['Bangladesh','Brazil', 'China', 'India', 'Indonesia', 'Mexico','Nigeria',
                      'Pakistan', 'Russia', 'US']
                        


dropdownOptions.forEach(countryName => {
  dropdown.append("option").text(countryName);
});

// run createcharts when dropdown option is selected (changed)
dropdown.on('change', newChange)

newChange()

function createCharts(){
  let countryName = dropdown.property("value");

  d3.json(`http://127.0.0.1:5000/api/${countryName}`).then(countryData => {
    // console.log(countryData)
    
    let yearList = countryData.map(obj => obj.Year);
    //console.log(yearList)

    // Build Line Plot
    let traceLine = {
      labels: ["Bangladesh", "Brazil", "China", "India", "Indonesia", "Mexico", "Nigeria", "Pakistan", "Russia", "USA", "Rest of the World"],
      values: [2.15,2.69,17.72,17.76,3.45,1.6,2.78,2.99,1.8,4.23,42.83], 
      type:'pie'
    }

    layout = {
      title: "Top 10 Growing Countries in 2023",
      xaxis:{title:"Year 2023"},
      yaxis:{
        title:{
          text:"Population",
          font: 25,
         standoff:20}
      
          }
      
    }

    let lineData = [traceLine]

    Plotly.newPlot('pie', lineData, layout);









  })
}



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

function newChange(){
  createCharts()
  buildMetadata(0)
}