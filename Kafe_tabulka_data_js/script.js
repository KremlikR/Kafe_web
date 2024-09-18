
function updateValue(slider) {
    document.getElementById(slider.id + "Value").innerText = slider.value;
}


function submitForm() {
    
    const person = document.querySelector('input[name="person"]:checked');
    if (!person) {
        alert('Please select a person.');
        return;
    }


    const milk = document.getElementById('milk').value;
    const espresso = document.getElementById('espresso').value;
    const coffee = document.getElementById('coffee').value;
    const long = document.getElementById('long').value;
    const doppio = document.getElementById('doppio').value;

    // Create a JSON 
    const formData = {
        person: person.value,
        drinks: {
            milk: milk,
            espresso: espresso,
            coffee: coffee,
            long: long,
            doppio: doppio
        }
    };

  
    saveData(formData);

   
    fetchData();
    displayTotals();
}


function saveData(data) {
    let savedData = JSON.parse(localStorage.getItem('drinkSelections')) || [];
    savedData.push(data);
    localStorage.setItem('drinkSelections', JSON.stringify(savedData));
}

// Function to fetch and display data 
function fetchData() {
    let savedData = JSON.parse(localStorage.getItem('drinkSelections')) || [];

    const displayDiv = document.getElementById('submittedData');
    displayDiv.innerHTML = ''; 

    savedData.forEach((entry, index) => {
        const { person, drinks } = entry;
        const personData = `<strong>Person:</strong> ${person}`;
        const drinkData = `
            <ul>
                <li><strong>Mléko:</strong> ${drinks.milk}</li>
                <li><strong>Espresso:</strong> ${drinks.espresso}</li>
                <li><strong>Coffe:</strong> ${drinks.coffee}</li>
                <li><strong>Long:</strong> ${drinks.long}</li>
                <li><strong>Doppio:</strong> ${drinks.doppio}</li>
            </ul>
        `;
        displayDiv.innerHTML += `<div><h4>Submission ${index + 1}</h4>${personData}${drinkData}</div>`;
    });
}

// Function to display totals for each person
function displayTotals() {
    let savedData = JSON.parse(localStorage.getItem('drinkSelections')) || [];


    const totals = savedData.reduce((acc, entry) => {
        const { person, drinks } = entry;
        if (!acc[person]) {
            acc[person] = { milk: 0, espresso: 0, coffee: 0, long: 0, doppio: 0 };
        }
        acc[person].milk += parseInt(drinks.milk, 10);
        acc[person].espresso += parseInt(drinks.espresso, 10);
        acc[person].coffee += parseInt(drinks.coffee, 10);
        acc[person].long += parseInt(drinks.long, 10);
        acc[person].doppio += parseInt(drinks.doppio, 10);
        return acc;
    }, {});

    // Display totals
    const totalsDiv = document.getElementById('totalsData');
    totalsDiv.innerHTML = ''; 

    for (const [person, drinks] of Object.entries(totals)) {
        const drinkData = `
            <ul>
                <li><strong>Mléko:</strong> ${drinks.milk}</li>
                <li><strong>Espresso:</strong> ${drinks.espresso}</li>
                <li><strong>Coffe:</strong> ${drinks.coffee}</li>
                <li><strong>Long:</strong> ${drinks.long}</li>
                <li><strong>Doppio:</strong> ${drinks.doppio}</li>
            </ul>
        `;
        totalsDiv.innerHTML += `<div><h4>${person}</h4>${drinkData}</div>`;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    displayTotals();
});
