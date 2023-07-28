// Initialize the map
var myMap = L.map('map').setView([0, 0], 2);

// Add the tile layer 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(myMap);

d3.json('country-lat-lon.json').then(function(data) {
  // add pop-up info
  data.forEach(country => {
    L.marker([country.latitude, country.longitude])
      .addTo(myMap)
      .bindPopup(country.country);
  });
})