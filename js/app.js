const cardsContainer = document.querySelector('.cards-container');
let employees = [];
const randomURL = 'https://randomuser.me/api/?results=12';

// Functions
function fetchURL(url) {
  return fetch(url)
    .then(checkStatus)
    .then (res => res.json())
    .then (resJSON => resJSON.results)
    .then (createCards)
}

fetchURL(randomURL);


function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function createCards(employeeJSON) {
  employees = employeeJSON;
  let html = '';

  employees.forEach(function(employee) {
    html += `
    <div class="card">
      <img src="${employee.picture.large}" class="profile-pic">
      <div class="card-text">
        <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
        <p class="email">${employee.email}</p>
        <p class="city">${employee.location.city}</p>
      </div>
    </div>
    `;
  });
  cardsContainer.innerHTML = html;
}



// Get Copyright Year
var today = new Date();
var year = today.getFullYear();
document.getElementById('year').innerHTML = year;
