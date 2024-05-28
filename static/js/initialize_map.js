// Initialize map
const map = L.map('chart3').setView([36.778259, -119.417931], 6);

// Set up the OpenStreetMap layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize the marker cluster group
let markers = L.markerClusterGroup();
