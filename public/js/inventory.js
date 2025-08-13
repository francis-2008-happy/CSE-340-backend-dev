'use strict'

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Get a reference to the classification list
  const classificationList = document.querySelector("#classificationList");

  // Add event listener to the classification list for the 'change' event
  classificationList.addEventListener("change", () => {
    const classification_id = classificationList.value;
    console.log(`classification_id is: ${classification_id}`);

    // Build the URL for the fetch request
    const classIdURL = `/inv/getInventory/${classification_id}`;

    // Perform the fetch request to get inventory data
    fetch(classIdURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not OK");
      })
      .then(data => {
        console.log(data);
        buildInventoryList(data);
      })
      .catch(error => {
        console.log('There was a problem with your fetch operation: ', error.message);
        // Clear the table if there's an error
        const inventoryDisplay = document.getElementById("inventoryDisplay");
        inventoryDisplay.innerHTML = "";
      });
  });
});

// Build inventory items into HTML table components and inject into the DOM
function buildInventoryList(data) {
  const inventoryDisplay = document.getElementById("inventoryDisplay");
  // Set up the table headlines
  let dataTable = '<thead>';
  dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
  dataTable += '</thead>';
  // Set up the table body
  dataTable += '<tbody>';
  // Iterate over all vehicles in the array and build table rows
  data.forEach(function (element) {
    dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
    dataTable += `<td><a href='/inv/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`;
    dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`;
  });
  dataTable += '</tbody>';
  // Display the contents in the Vehicle Management view
  inventoryDisplay.innerHTML = dataTable;
}