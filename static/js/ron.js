// // Initialize the map and set its view
// var map = L.map('chart3').setView([36.778259, -119.417931], 6);

// // Set up the OpenStreetMap layer
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// // Initialize the marker cluster group
// var markers = L.markerClusterGroup();

// // Fetch data from the server
// fetch('/data')
//     .then(response => response.json())
//     .then(data => {
//         let year_2018 = data["survey_2018"];
//         for (let i = 0; i < year_2018.length; i++) {
//             let region = year_2018[i];
//             let marker = L.marker([region["Latitude"], region["Longitude"]]);
//             markers.addLayer(marker); // Add each marker to the marker cluster group
//         }
//         map.addLayer(markers); // Add the marker cluster group to the map
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });


// Initialize the map and set its view
var map = L.map('chart3').setView([36.778259, -119.417931], 6);

// Set up the OpenStreetMap layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize the marker cluster group
var markers = L.markerClusterGroup();

// Fetch data from the server
fetch('/data')
    .then(response => response.json())
    .then(data => {
        let year_2018 = data["survey_2018"];
        for (let i = 0; i < year_2018.length; i++) {
            let region = year_2018[i];
            if (!region["Latitude"] || !region["Longitude"]) {
                continue; 
            }
            let marker = L.marker([region["Latitude"], region["Longitude"]]);
            markers.addLayer(marker); 
        }
        map.addLayer(markers); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
