// populate the dropdown with JSON data
function populateDropdown(data) {
  const dropdown = document.getElementById("dropdown");

  data.forEach(item => {
      const option = document.createElement("option");
      option.text = item.country;
      option.value = item.country;
      dropdown.appendChild(option);
  });
}

// read json file
document.addEventListener("DOMContentLoaded", () => {
  fetch('countries-table.json')
      .then(response => response.json())
      .then(data => {
          populateDropdown(data);
      })
      .catch(error => console.error('Error fetching JSON:', error));
});
