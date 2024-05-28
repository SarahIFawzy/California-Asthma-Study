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
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                cell.textContent = checkbox.value;
                row.appendChild(cell);
                selectedTable.appendChild(row);
            }
        });
    }
});