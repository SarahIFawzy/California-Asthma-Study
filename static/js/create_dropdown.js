// Create dropdown
function createDropDown(data) {
    const dropdown = document.getElementById('datasetDropdown')


    // Create an empty option
    const emptyOption = document.createElement('option');
    emptyOption.value = ""; 
    emptyOption.textContent = "- Select Dataset -";
    dropdown.appendChild(emptyOption);
    
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
