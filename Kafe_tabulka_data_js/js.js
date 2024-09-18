function updateValue(slider) {
    document.getElementById(slider.id + 'Value').innerText = slider.value;
}

document.getElementById('fetchMonthlyOverview').addEventListener('click', function() {
    fetchMonthlyOverview();
});

function fetchMonthlyOverview() {
   
    const username = 'coffe';
    const password = 'kafe';
    const credentials = btoa(`${username}:${password}`);
    const url = "http://ajax1.lmsoft.cz/procedure.php?cmd=getSummaryOfDrinks&month=9";

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    })
    .then(data => {
        displayMonthlyOverview(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function displayMonthlyOverview(data) {
    const tableBody = document.querySelector('#monthlyOverviewTable tbody');
    tableBody.innerHTML = ''; 

    data.forEach(entry => {
        const drinkName = entry[0];
        const quantity = entry[1];
        const person = entry[2];

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person}</td>
            <td>${drinkName}</td>
            <td>${quantity}</td>
        `;
        tableBody.appendChild(row);
    });
}
