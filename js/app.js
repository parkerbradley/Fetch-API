const overlay = document.querySelector('.overlay');
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
      <img src="${employee.picture.large}" class="profile-pic" alt="${employee.name.first} ${employee.name.last}">
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
function createEmployeeDetail(employee) {
  let html = `
    <i class="fas fa-chevron-right"></i>
    <i class="fas fa-chevron-left"></i>
    <div class="overlay-card">
      <i class="fas fa-times"></i>
      <div class="overlay-top">
        <img src="${employee.picture.large}" class ="overlay-profile-image" alt="${employee.name.first} ${employee.name.last}">
        <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
        <p class="email">${employee.email}</p>
        <p class="city">${employee.location.city}</p>
      </div>
      <div class="overlay-bottom">
        <p class="phone">(555) 555-5555</p>
        <p class="birthday">01/01/1993</p>
      </div>
    </div>
    `;
  return html;
};
  //overlay.innerHTML = html;

// Event Handlers
cardsContainer.addEventListener('click', (e) => {
  let indexOf = e.target.getAttribute('index');
  let employees = fetchURL(randomURL);
  //let employee = employees.filter(employees => employees === indexOf);
  console.log(employees);
  // overlay.style.display = 'flex';
  // overlay.innerHTML = createEmployeeDetail(employee);
  //use createEmployeeDetail to create a detail card based on the index of the selected card
})

// Get Copyright Year
var today = new Date();
var year = today.getFullYear();
document.getElementById('year').innerHTML = year;
