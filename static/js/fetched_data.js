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