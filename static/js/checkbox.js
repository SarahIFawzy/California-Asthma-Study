document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.control-panel input[type="checkbox"]');
    const selectedTable = document.querySelector('#selectedTable tbody');
    const resetButton = document.getElementById('resetButton');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateSelectedOptions();
        });
    });

    resetButton.addEventListener('click', function () {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            markers.clearLayers();
            d3.select("#word-cloud").selectAll("*").remove();
            // reset empty
            document.getElementById('data-category').value = "";
            document.getElementById('datasetDropdown').value = "";
        });
        updateSelectedOptions();
    });

    
    function updateSelectedOptions() {
        selectedTable.innerHTML = ''; // Clear the table
    
        const definitions = {
            Population: "Average population",
            Ozone: "Amount of daily maximum 8 hour Ozone concentration; percentile",
            PM25: "Annual mean PM 2.5 concentrations; percentile",
            Diesel: "Diesel PM emissions from on-road and non-road sources; percentile",
            Pesticides: "Total pounds of selected active pesticide ingredients used in production-agriculture per square mile in the census tract; percentile",
            Traffic: "Traffic density, in vehicle-kilometers per hour per road length, within 150 meters of the census tract boundary; percentile",
            Asthma: "Age-adjusted rate of emergency department visits for asthma per 10,000 people; percentile",
            CD: "Age-adjusted rate of emergency department visits for heart attacks per 10,000 people; percentile",
            Poverty: "Percent of population living below two times the federal poverty level; percentile"
        };
    
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                const definition = definitions[checkbox.id];
                cell.innerHTML = `<strong>${checkbox.value}</strong>: ${definition}`;
                row.appendChild(cell);
                selectedTable.appendChild(row);
            }
        });
    }
});