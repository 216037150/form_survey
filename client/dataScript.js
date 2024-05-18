// dataScript.js

document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from the server
    fetch('/formData')
        .then(response => response.json())
        .then(data => {
            // Select the table body
            const tableBody = document.querySelector('#data-table tbody');
            
            // Iterate over the data and create table rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.fullName}</td>
                    <td>${item.email}</td>
                    <td>${item.dateOfBirth}</td>
                    <td>${item.contact}</td>
                    <td>${item.food}</td>
                    <td>${item.movies}</td>
                    <td>${item.radio}</td>
                    <td>${item.eat_out}</td>
                    <td>${item.watch_tv}</td>
                    
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
