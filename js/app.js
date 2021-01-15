const overlay = document.querySelector('.overlay');
const cardContent = document.querySelector('.card-content');
const cardsContainer = document.querySelector('.cards-container');
const randomURL = 'https://randomuser.me/api/?results=12&nat=us';
const cards = document.getElementsByClassName('card');
let employeesArray = [];
const close = document.getElementById('close');
const right = document.querySelector('.fa-chevron-right');
const left = document.querySelector('.fa-chevron-left');
const header = document.getElementById('header');
const searchIcon = document.querySelector('.fa-search');
const searchBar = document.getElementById('search');
const searchDiv = document.querySelector('.search');

let index = 0;

// ----------- Functions
function fetchURL(url) {
  return fetch(url)
    .then(checkStatus)
    .then (res => res.json())
    .then (resJSON => resJSON.results);
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
    employeesArray.push(employee);
    html += `
    <div class="card" id="${employee.name.first}-${employee.name.last}">
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
  let date = employee.dob.date;
  date = date.split('T')[0];
  let year = date.split('-')[0];
  let month = date.split('-')[1];
  let day = date.split('-')[2];
  let streetNumber = employee.location.street.number;
  let streetName = employee.location.street.name;
  let state = employee.location.state;
  let zip = employee.location.postcode;
  let html = `
    <div class="overlay-top">
      <img src="${employee.picture.large}" class ="overlay-profile-image" alt="${employee.name.first} ${employee.name.last}">
      <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
      <p class="email">${employee.email}</p>
      <p class="city">${employee.location.city}</p>
    </div>
    <div class="overlay-bottom">
      <p class="phone">${employee.phone}</p>
      <p class="address">${streetNumber + ' ' + streetName + ', ' + state + ' ' + zip}</p>
      <p class="date">Birthday: ${month + '/' + day + '/' + year}</p>
    </div>
    `;
  return html;
}

// --- Display search on tablet & mobile
function showSearch() {
  if (screen.width < 1024 && screen.width >= 768) {
    searchBar.style.display = 'inline';
    searchDiv.style.width = "40%";
    searchIcon.style.top = '10px';
  } else if (screen.width < 768) {
    header.style.display = 'block';
    searchBar.style.display = 'block';
    searchBar.style.width = '100%';
    searchIcon.style.display = 'none';
  }
}

// --- Search Filter
function getUserSearch() {
// captures the user's search query and stores it in a normalized variable
  let searchInput = document.getElementById('search').value;
  let searchNormalized = searchInput.toLowerCase();

//captures the name and stores it in a normalized variable
  for (i = 0; i < cards.length; i++) {
    let employeeName = cards[i].getAttribute('id');
    let nameNormalized = employeeName.toLowerCase();
//checks if user's search query is in the card ID and hides the card if it does not
    if (nameNormalized.includes(searchNormalized)) {
      cards[i].style.display = 'flex';
    } else {
      cards[i].style.display = 'none';
    }
  }
}

// ----------- Event Handlers

//---displays the overlay when a user clicks on an employee card
cardsContainer.addEventListener('click', (e) => {
  let indexOf = e.target.getAttribute('index');
  overlay.style.display = 'flex';
  cardContent.innerHTML = createEmployeeDetail(employeesArray[indexOf]);
  cardContent.setAttribute('index', indexOf);
  //use createEmployeeDetail to create a detail card based on the index of the selected card
})

//---hides the overlay when a user clicks the X
close.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  cardContent.innerHTML = '';
  cardContent.setAttribute('index', '');
});

//--hides the overlay when a user clicks outside of the overlay box
overlay.addEventListener('click', (e) => {
  if (e.target == overlay){
  overlay.style.display = 'none';
  cardContent.innerHTML = '';
  cardContent.setAttribute('index', '');
  }
});

//--move between employee cardsContainer
right.addEventListener('click', (e) => {
  let cardIndex = parseInt(cardContent.getAttribute('index'));
  if(cardIndex === 11){
    cardContent.innerHTML = createEmployeeDetail(employeesArray[0]);
    cardContent.setAttribute('index', 0);
  }
  cardContent.innerHTML = createEmployeeDetail(employeesArray[cardIndex + 1]);
  cardContent.setAttribute('index', cardIndex + 1);
});

left.addEventListener('click', (e) => {
  let cardIndex = parseInt(cardContent.getAttribute('index'));
  if(cardIndex === 0){
    cardContent.innerHTML = createEmployeeDetail(employeesArray[11]);
    cardContent.setAttribute('index', 11);
  }
  cardContent.innerHTML = createEmployeeDetail(employeesArray[cardIndex - 1]);
  cardContent.setAttribute('index', cardIndex - 1);
});

//--unhides search on small screens
searchIcon.addEventListener('click', (e) => {
  showSearch();
});

// Get Copyright Year
var today = new Date();
var year = today.getFullYear();
document.getElementById('year').innerHTML = year;
