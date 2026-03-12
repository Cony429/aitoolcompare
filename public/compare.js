document.addEventListener('DOMContentLoaded', () => {
    const tool1Select = document.getElementById('tool1');
    const tool2Select = document.getElementById('tool2');
    const compareBtn = document.getElementById('compare-btn');

    fetch('ai-tools.json')
        .then(response => response.json())
        .then(tools => {
            populateDropdown(tool1Select, tools);
            populateDropdown(tool2Select, tools);
        });

    function populateDropdown(selectElement, tools) {
        // Add a default, disabled option
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'Select a tool';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        tools.forEach(tool => {
            const option = document.createElement('option');
            option.value = tool.name.toLowerCase().replace(/\s+/g, '-');
            option.textContent = tool.name;
            selectElement.appendChild(option);
        });
    }

    compareBtn.addEventListener('click', () => {
        const tool1 = tool1Select.value;
        const tool2 = tool2Select.value;

        if (tool1 && tool2 && tool1 !== tool2 && tool1 !== 'Select a tool' && tool2 !== 'Select a tool') {
            // For demonstration, we'll just show an alert.
            // In a real application, you would redirect to a comparison page
            // or dynamically display the comparison results.
            alert(`Comparing ${tool1Select.options[tool1Select.selectedIndex].text} and ${tool2Select.options[tool2Select.selectedIndex].text}`);
            // Example of a redirect:
            // window.location.href = `comparison.html?tool1=${tool1}&tool2=${tool2}`;
        } else {
            alert('Please select two different tools to compare.');
        }
    });
});
