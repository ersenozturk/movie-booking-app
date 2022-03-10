// -----------------------------------variables
const container = document.querySelector('.container')
const allSeats = document.querySelectorAll('.container .seat')
const notOccupiedSeats = document.querySelector('.container .seat:not(.occupied)')
const count = document.getElementById('count')
const film = document.getElementById('film')
const total = document.getElementById('total')
const movieSelectBox = document.getElementById('movie')

// check localstorage first, selectBox after (most update seat price)
// initial value==>movieSelectBox.value
let currentTicketPrice = localStorage.getItem('selectedMoviePrice') ? localStorage.getItem('selectedMoviePrice') : movieSelectBox.value;  //movieSelectBox.options[movieSelectBox.selectedIndex].value

//movieIndex (most update movie index)
let currentMovieIndex = localStorage.getItem('selectedMovieIndex') ? localStorage.getItem('selectedMovieIndex') : movieSelectBox.selectedIndex;


window.onload = () => {
    movieSelectBox.selectedIndex = currentMovieIndex; 
    displayUI();
    updateMovieInfo();
}

// -----------------------------------events
//change film and localstorage
movieSelectBox.addEventListener('change',(e)=>{
    let ticketPrice = e.target.value
    let movieIndex = e.target.selectedIndex; //**
    setMovieDataToLocalStorage(ticketPrice,movieIndex)
    
    updateMovieInfo();

})

// capturing
container.addEventListener('click',(e)=>{
    // console.log(e.target);
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    
    }
    if (e.target.classList.contains('seat') && e.target.classList.contains('occupied')) {
        alert('reserve olmayan seç')
    }

    updateMovieInfo(); //currentTicketPrice ?
})

//-----------------------funcs---------------------
//update paragraph and calculation
function updateMovieInfo() { //currentTicketPrice ?
    let selectedSeats = document.querySelectorAll('.row .seat.selected');

    let selectedSeatsIndexArray = [...selectedSeats].map(seat=>[...allSeats].indexOf(seat))
    // console.log(selectedSeatsIndexArray);

    localStorage.setItem('selectedSeats',JSON.stringify(selectedSeatsIndexArray))

    count.innerText = selectedSeatsIndexArray.length;
    film.innerText = movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split('(')[0]
    total.innerText = selectedSeatsIndexArray.length * movieSelectBox.value
}

//after refresh get selectedSeats and add class'selected'
const displayUI = ()=>{
    let selectedSeatsFromStorage = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeatsFromStorage);
    if (selectedSeatsFromStorage != null && selectedSeatsFromStorage.length > 0) {
        allSeats.forEach((seat,index)=>{
            if (selectedSeatsFromStorage.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
}

//----------------- set local storage
//add to storage
function setMovieDataToLocalStorage(ticketPrice,movieIndex) {
    localStorage.setItem('selectedMoviePrice',ticketPrice)
    localStorage.setItem('selectedMovieIndex',movieIndex)
}

