const cardsContainer = document.querySelector('.cards-container');
const randomURL = 'https://randomuser.me/api/?results=12';
const cards = document.getElementsByClassName('card');

let index = 0;

// Functions
function fetchURL(url) {
  return fetch(url)
    .then(checkStatus)
    .then (res => res.json())
    .then (resJSON => resJSON.results)
}

fetchURL(randomURL)
  .then (createCards);

function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// --- Creates Employee Cards --- //
function createCards(employeeJSON) {
  let employees = employeeJSON;
  let html = '';

  employees.forEach(function(employee) {
    html += `
    <div class="card">
      <div class="card-overlay" index="${index}"></div>
      <img src="${employee.picture.large}" class="profile-pic">
      <div class="card-text">
        <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
        <p class="email">${employee.email}</p>
        <p class="city">${employee.location.city}</p>
      </div>
    </div>

    `;
    index += 1;
  });
  cardsContainer.innerHTML = html;
}

// --- Creates Employee Detail Overlay --- //
function createEmployeeDetail(employeeJSON) {
  let employees = employeeJSON;
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

// Event Handlers
cardsContainer.addEventListener('click', (e) => {
  let indexOf = e.target.getAttribute('index');
  console.log(indexOf);
})

// Get Copyright Year
var today = new Date();
var year = today.getFullYear();
document.getElementById('year').innerHTML = year;
