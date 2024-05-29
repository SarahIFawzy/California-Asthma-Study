
// This function handles the change event of the dropdown menu
function UpdateMap() {  // Remove data argument
    const dropdown = document.getElementById('datasetDropdown');  
    const selectedDataset = dropdown.value;                       
    const selectedData = fetchedData[selectedDataset];            
    console.log(`Selected dataset: ${selectedDataset}`); 
    console.log('Selected data:', selectedData);  

    // Add new markers to the map
    for (let i = 0; i < selectedData.length; i++) {
        let region = selectedData[i];
        if (!region["Latitude"] || !region["Longitude"]) {
            continue; 
        }
        let marker = L.marker([region["Latitude"], region["Longitude"]]);
        markers.addLayer(marker); 
        // console.log("hi");
    }

    // Add the marker cluster group to the map
    map.addLayer(markers); 
}
