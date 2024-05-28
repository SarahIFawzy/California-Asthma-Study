

// get data
let fetchedData = {}; 

// Fetch data from the server
fetch('/data')
    .then(response => response.json())
    .then(data => {
        fetchedData = data;  
        createDropDown(fetchedData); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


// Create dropdown
function createDropDown(data) {
    const dropdown = document.getElementById('datasetDropdown')
    
    for (const key in data) {                                 
        const option = document.createElement('option');       
        option.value = key;                                    
        option.textContent = key;                              
        dropdown.appendChild(option);                          
    }

    // Add event listener for change event
    dropdown.addEventListener('change', updateChart);

    // Update chart with the default selected dataset
    updateChart(); // Call updateChart without arguments
}



// Initialize map
const map = L.map('chart3').setView([36.778259, -119.417931], 6);

// Set up the OpenStreetMap layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize the marker cluster group
let markers = L.markerClusterGroup();





// This function handles the change event of the dropdown menu
function updateChart() {  // Remove data argument
    const dropdown = document.getElementById('datasetDropdown');  
    const selectedDataset = dropdown.value;                       
    const selectedData = fetchedData[selectedDataset];            
    console.log(`Selected dataset: ${selectedDataset}`);  // Debugging line
    console.log('Selected data:', selectedData);  // Debugging line

    // Clear existing markers
    // markers.clearLayers();

    // Add new markers to the map
    for (let i = 0; i < selectedData.length; i++) {
        let region = selectedData[i];
        if (!region["Latitude"] || !region["Longitude"]) {
            continue; 
        }
        let marker = L.marker([region["Latitude"], region["Longitude"]]);
        markers.addLayer(marker); 
        console.log("hi");
    }

    // Add the marker cluster group to the map
    map.addLayer(markers); 
}
