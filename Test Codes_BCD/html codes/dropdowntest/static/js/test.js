// Function to populate the dropdown with JSON data
function populateDropdown(data) {
  const dropdown = document.getElementById("dropdown");

  data.forEach(item => {
      const option = document.createElement("option");
      option.text = item.name;
      option.value = item.id; // You can set the value to whatever you need
      dropdown.appendChild(option);
  });
}

// Read the JSON file using D3 and populate the dropdown when the page loads
document.addEventListener("DOMContentLoaded", () => {
  d3.json('data.json') // Replace 'data.json' with the path to your JSON file
      .then(data => {
          populateDropdown(data);
      })
      .catch(error => console.error('Error fetching JSON:', error));
});
