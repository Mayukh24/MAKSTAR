const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='
const SEARCH_SAPI = 'https://api.themoviedb.org/3/search/tv?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1&query='


const cinemas = document.getElementById('cinema-s')
const tvs = document.getElementById('tv-series-s')
const form = document.getElementById('form')
const form1 = document.getElementById('form1')
const search = document.getElementById('search')
const reloadtButton = document.querySelector("logo");
const cinemaw = document.getElementById('cinema-w')
const seriesw = document.getElementById('tv-series-w')
const a = document.querySelector('.addList');
const gcinema = document.getElementById('gcinema')
const gseries = document.getElementById('gseries')
const submitButton = document.querySelector(".search3")



const navSlide = ()=>{
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', ()=>{
    nav.classList.toggle('nav-active');
  });

  //Animation
  navLinks.forEach((link, index)=>{
    link.style.animation = `navLinkFade 0.5s ease forwards ${index/5 + 1}s`;
  });
}

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const Sgenres = [
     {
        "id":10759,
        "name":"Action & Adventure"
     },
     {
        "id":16,
        "name":"Animation"
     },
     {
        "id":35,
        "name":"Comedy"
     },
     {
        "id":80,
        "name":"Crime"
     },
     {
        "id":99,
        "name":"Documentary"
     },
     {
        "id":18,
        "name":"Drama"
     },
     {
        "id":10751,
        "name":"Family"
     },
     {
        "id":10762,
        "name":"Kids"
     },
     {
        "id":9648,
        "name":"Mystery"
     },
     {
        "id":10763,
        "name":"News"
     },
     {
        "id":10764,
        "name":"Reality"
     },
     {
        "id":10765,
        "name":"Sci-Fi & Fantasy"
     },
     {
        "id":10766,
        "name":"Soap"
     },
     {
        "id":10767,
        "name":"Talk"
     },
     {
        "id":10768,
        "name":"War & Politics"
     },
     {
        "id":37,
        "name":"Western"
     }
]

navSlide();


var n;
var l;
var mId;
var mIdS;
var background;


function myFunction() {
    location.replace("search.html")
  }


async function getSMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showSMovies(data.results)
}

function showSMovies(movies) {
    cinemas.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie1')

        movieEl.innerHTML = `
        <a onclick = "movieSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${title}" ></a>
        <a onclick = "movieSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${title}</h3>
                ${summary}...
            </div>
        </a>
        `
        cinemas.appendChild(movieEl)
    })
}


async function getSSeries(url) {
    const res = await fetch(url)
    const data = await res.json()

    showSSeries(data.results)
}

function showSSeries(series) {
    tvs.innerHTML = ''

    series.forEach((tv) => {
        const { name, poster_path, overview ,id} = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv1')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        tvs.appendChild(tvEl)
    })
}


//SUBMIT-BUTTON
submitButton.addEventListener("click", submitInput);



//SUBMIT
function submitInput(e) {
    e.preventDefault();
    const searchTerm = search.value
        if(searchTerm && searchTerm !== '') {
            getSMovies(SEARCH_API + searchTerm)
            getSSeries(SEARCH_SAPI + searchTerm)
            window.location = 'search.html';
            sessionStorage.setItem('getSeries', SEARCH_SAPI + searchTerm);
            sessionStorage.setItem('getMovies', SEARCH_API + searchTerm);
        } else {
            window.location.reload()
        }
   

}

function searchFunction(){
  let search1 = sessionStorage.getItem('getSeries');
  let search2 = sessionStorage.getItem('getMovies');
  getSMovies(search2);
  getSSeries(search1);
}




//NEW PART SESSION STORAGE

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'individual.html';
    return false;
}

function getIndividual(){
    let IndividualId = sessionStorage.getItem('movieId');
    const URLInd = `https://api.themoviedb.org/3/movie/${IndividualId}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        let movie = response.data;
        const { title, poster_path, overview, genres, release_date, vote_average, imdb_id, run_time, backdrop_path, production_companies, status, id, runtime} = movie
        
        n = ifItIncludes(id);
        mId = id;
        
        background = IMG_PATH + backdrop_path;

        $(document).ready(function() {
          $("body").css("background-image", `url(${background})`)
          .css("background-repeat", "no-repeat");
      })


        
        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));
        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));
        let output;  
        let output1;

        output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class = "info">
            <h1>${title}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${release_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${runtime} mins</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">
        <div class = "info-right">
        <h1>${title}</h1>
          <p><strong>Genre:</strong> ${gen}</p>
        </div>                  
          <hr>
          <div class="plot">
            <h2>Synopsis</h2>
            ${overview}
            <hr>
          </div>
          <div class="life">
            <button onclick="location.href='http://imdb.com/title/${imdb_id}'" class="btn btn-primary">View IMDB</button>
            <button id="button-s" class="btn btn-primary" onclick="chooseM()">Add to Watchlist</button>
          </div>
        </div>
      `;

      output1 =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class = "info">
            <h1>${title}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${release_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${runtime} mins</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">
        <div class = "info-right">
        <h1>${title}</h1>
          <p><strong>Genre:</strong> ${gen}</p>
        </div>                  
          <hr>
          <div class="plot">
            <h2>Synopsis</h2>
            ${overview}
            <hr>
          </div>
          <div class="life">
            <button onclick="location.href='http://imdb.com/title/${imdb_id}'" class="btn btn-primary">View IMDB</button>
            <button id="button-s" class="btn btn-primary" onclick="chooseM()">Remove from Watchlist</button>
          </div>
        </div>
      `;
      if(n==true){
        $('#movie-details').html(output1);
      }
      else{
        $('#movie-details').html(output);
      }

        
    })
    .catch((err)=>{
        console.log(err);
    });   
}

//Series
function tvSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'individuals.html';
    return false;
}

function getIndividualS(){
    let IndividualId = sessionStorage.getItem('movieId');
    const URLInd = `https://api.themoviedb.org/3/tv/${IndividualId}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        let movie = response.data;
        const { name, poster_path, overview, genres, first_air_date, vote_average, imdb_id, backdrop_path, episode_run_time, status, number_of_seasons, production_companies, id} = movie

        l = ifItSIncludes(id);
        mIdS = id;

        var gen = (genres.map(function(obj) {
            return obj.name;
        }).join(","));

        var prod = (production_companies.map(function(obj) {
            return obj.name;
        }).join(","));

        n = ifItIncludes(id);
        mId = id;

        background = IMG_PATH + backdrop_path;

        $(document).ready(function() {
          $("body").css("background-image", `url(${background})`)
          .css("background-repeat", "no-repeat");
      })



        let output =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class = "info">
            <h1>${name}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${first_air_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${episode_run_time} mins per ep</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Number of Seasons : </strong> ${number_of_seasons}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">        
          <div class = "info-right">
            <h1>${name}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          </div>                  
          <hr>
          <div class="plot">
            <h2>Synopsis</h2>
            ${overview}
            <hr>
          </div>
          <div class = "life">          
            <button id="button-s" class="btn btn-primary" onclick="chooseS()">Add to Watchlist</button>
          </div>
        </div>
      `;

      let output1 =`
        <div class="left">        
          <div class="image-dp">
            <img src="${IMG_PATH + poster_path}" class="thumbnail">
          </div>
          <div class = "info">
            <h1>${name}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          <hr>
          </div>
          <div class="extra-info">
          <h2>Information</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Rating : </strong><i class="fas fa-star"></i> ${vote_average}</li>
              <li class="list-group-item"><strong>Released : </strong> ${first_air_date}</li>
              <li class="list-group-item"><strong>Duration : </strong> ${episode_run_time} mins per ep</li>
              <li class="list-group-item"><strong>Status : </strong> ${status}</li>
              <li class="list-group-item"><strong>Number of Seasons : </strong> ${number_of_seasons}</li>
              <li class="list-group-item"><strong>Produced by : </strong> ${prod}</li>
            </ul>
          </div>
        </div>
        <div class="right">        
          <div class = "info-right">
            <h1>${name}</h1>
            <p><strong>Genre:</strong> ${gen}</p>
          </div>                  
          <hr>
          <div class="plot">
            <h2>Synopsis</h2>
            ${overview}
            <hr>
          </div>
          <div class = "life">          
            <button id="button-s" class="btn btn-primary" onclick="chooseS()">Remove from Watchlist</button>
          </div>
        </div>
      `;
      if(l == true){
        $('#movie-details').html(output1);
      }
      else{
        $('#movie-details').html(output);
      }

    })
    .catch((err)=>{
        console.log(err);
    });   
}




/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////LOCAL STORAGE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function wishSelected(id){
  let makId;
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  makId.push(id);
  localStorage.setItem("makId", JSON.stringify(makId));
}

function wishUnSelected(id){
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  const indexofId = makId.indexOf(id);
  makId.splice(indexofId, 1);
  localStorage.setItem("makId", JSON.stringify(makId));
}



function getWishMovie(){
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  makId.forEach((newMovie) => {
    const URLInd = `https://api.themoviedb.org/3/movie/${newMovie}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        movie = response.data;


        const { title, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie1')
        


        movieEl.innerHTML = `
            <a onclick = "movieSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${title}" >
            </a>
            <a onclick = "movieSelected('${id}')" href = "#">
                <div class="overview">
                    <h3>${title}</h3>
                    ${summary}...
                </div>
            </a>
        `
        
        cinemaw.appendChild(movieEl)
    })
    .catch((err)=>{
        console.log(err);
    });   
  }

  )}
  

function ifItIncludes(id)
{
  let makId;
  if(localStorage.getItem('makId')==null){
    makId = [];
  }
  else{
    makId = JSON.parse(localStorage.getItem('makId'));
  }
  var m = makId.includes(id);
  return m;
}

function chooseM(){
  if(n === true){
    wishUnSelected(mId);
    window.location.reload();
  }
  else{
    wishSelected(mId);
    window.location.reload()
  }
}



/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////LOCAL STORAGE///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function wishSelectedS(id){
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  makSId.push(id);
  localStorage.setItem("makSId", JSON.stringify(makSId));
}

function wishUnSelectedS(id){
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  const indexofSId = makSId.indexOf(id);
  makSId.splice(indexofSId, 1);
  localStorage.setItem("makSId", JSON.stringify(makSId));
}



function getWishMovieS(){
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  makSId.forEach((newSeries) => {
    const URLInd = `https://api.themoviedb.org/3/tv/${newSeries}?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US`;
    axios.get(URLInd)
    .then((response)=>{
        movie = response.data;

        const { name, poster_path, overview, id } = movie

        var summary = overview.split(' ').slice(0,10).join(' ');

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie1')
        


        movieEl.innerHTML = `
            <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" >
            </a>
            <a onclick = "tvSelected('${id}')" href = "#">
                <div class="overview">
                    <h3>${name}</h3>
                    ${summary}...
                </div>
            </a>
        `
        
        seriesw.appendChild(movieEl)
    })
    .catch((err)=>{
        console.log(err);
    });   
  }

  )}
  

function ifItSIncludes(id)
{
  let makSId;
  if(localStorage.getItem('makSId')==null){
    makSId = [];
  }
  else{
    makSId = JSON.parse(localStorage.getItem('makSId'));
  }
  var l = makSId.includes(id);
  return l;
}

function chooseS(){
  if(l === true){
    wishUnSelectedS(mIdS);
    window.location.reload()
  }
  else{
    wishSelectedS(mIdS);
    window.location.reload()
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////GENRE///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

var selectedGenre
function setGenre(){
  let t = `<option class = "tag" value = "" selected disable>Genres</option>`;
  genres.forEach(genre => {
    t += `
    <option class = "tag" id = "${genre.id}" value = "${genre.id}" >${genre.name}</option>
    `
  })  
        
  $('.tags').html(t);
  
}


function selectGenre(){  
  const s = document.querySelector(".tags").value;
  sessionStorage.setItem('genreId', s);
  window.location.reload();
  window.location = 'moviegenre.html';
  return false;
}

async function getGMovies() {
  let m;
  let genreId = sessionStorage.getItem('genreId');
  genres.forEach(genreN => {
    if(genreId == genreN.id){
      m = genreN.name;
    }
    }
  )  
  document.getElementById("headin").innerHTML = m + " Movies";
  console.log(m);
  const url = `
  https://api.themoviedb.org/3/discover/movie?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genreId}`;
  const res = await fetch(url)
  const data = await res.json()

  showGMovies(data.results)
  console.log(data)
}

function showGMovies(lmovies) {

  lmovies.forEach((lmovie) => {
      const { title, poster_path, overview, id } = lmovie

      var summary = overview.split(' ').slice(0,10).join(' ');

      const movieEl = document.createElement('div')
      movieEl.classList.add('movie1')

      movieEl.innerHTML = `
              <a onclick = "movieSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${title}" ></a>
              <a onclick = "movieSelected('${id}')" href = "#">
                  <div class="overview">
                      <h3>${title}</h3>
                      ${summary}...
                  </div>
              </a>
      `
      gcinema.appendChild(movieEl)
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////SERIES GENRE/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

var selectedSGenre
function setSGenre(){
  let t = `<option class = "tag" value = "">Genres</option>`;
  Sgenres.forEach(genre => {
    t += `
    <option class = "tag" id = "${genre.id}" value = "${genre.id}" >${genre.name}</option>
    `
  })  
        
  $('.tagss').html(t);
  
}



function selectSGenre(){  
  const sM = document.querySelector(".tagss").value;
  sessionStorage.setItem('genreSId', sM);
  window.location.reload();
  window.location = 'seriesgenre.html';
  return false;
}

async function getGSeries() {
  console.log('dhur bal');
  let mS;
  let genreSId = sessionStorage.getItem('genreSId');
  Sgenres.forEach(genreN => {
    if(genreSId == genreN.id){
      mS = genreN.name;
    }
    }
  )  
  document.getElementById("headin").innerHTML = mS + " Series";
  console.log(mS);
  const urls = `
  https://api.themoviedb.org/3/discover/tv?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&sort_by=popularity.desc&page=1&with_genres=${genreSId}`;
  const res = await fetch(urls)
  const data = await res.json()

  showGSeries(data.results)
  console.log(data)
}

function showGSeries(gtv) {

  gseries.innerHTML = ''

    gtv.forEach((tv) => {
        const { name, poster_path, overview, id } = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv1')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        gseries.appendChild(tvEl)
    })
}

function scrollL(){
  document.querySelector(".scroll-c").scrollLeft +=20;
}
function scrollR(){
  document.querySelector(".scroll-c").scrollLeft -=20;
}

//MOVIE INDEX:-
const buttonLM = document.querySelector('.slide-left-m');
const buttonRM = document.querySelector('.slide-right-m');

if(buttonRM!=null){
  buttonRM.onclick = function () {
    document.querySelector(".scroll-c").scrollLeft += (document.querySelector(".scroll-c").offsetWidth)- 200;
  };
}
if(buttonLM!=null){
  buttonLM.onclick = function () {
    document.querySelector(".scroll-c").scrollLeft -= (document.querySelector(".scroll-c").offsetWidth)- 200;
  };
}


//SERIES INDEX:-
const buttonLS = document.querySelector('.slide-left-s');
const buttonRS = document.querySelector('.slide-right-s');

if(buttonRS!=null){
  buttonRS.onclick = function () {
    document.querySelector(".scroll-c1").scrollLeft += (document.querySelector(".scroll-c1").offsetWidth)- 200;
  };
}
if(buttonLS!=null){
buttonLS.onclick = function () {
  document.querySelector(".scroll-c1").scrollLeft -= (document.querySelector(".scroll-c1").offsetWidth)- 200;
};
}

//MOVIE1:-
const buttonLM1 = document.querySelector('.slide-left-m1');
const buttonRM1 = document.querySelector('.slide-right-m1');

if(buttonRM1!=null){
  buttonRM1.onclick = function () {
    document.querySelector(".scroll-c2").scrollLeft += (document.querySelector(".scroll-c2").offsetWidth)- 200;
  };
}
if(buttonLM1!=null){
  buttonLM1.onclick = function () {
    document.querySelector(".scroll-c2").scrollLeft -= (document.querySelector(".scroll-c2").offsetWidth)- 200;
  };
}

//MOVIE2:-
const buttonLM2 = document.querySelector('.slide-left-m2');
const buttonRM2 = document.querySelector('.slide-right-m2');

if(buttonRM2!=null){
  buttonRM2.onclick = function () {
    document.querySelector(".scroll-c3").scrollLeft += (document.querySelector(".scroll-c3").offsetWidth)- 200;
  };
}
if(buttonLM2!=null){
  buttonLM2.onclick = function () {
    document.querySelector(".scroll-c3").scrollLeft -= (document.querySelector(".scroll-c3").offsetWidth)- 200;
  };
}

//MOVIE3:-
const buttonLM3 = document.querySelector('.slide-left-m3');
const buttonRM3 = document.querySelector('.slide-right-m3');

if(buttonRM3!=null){
  buttonRM3.onclick = function () {
    document.querySelector(".scroll-c4").scrollLeft += (document.querySelector(".scroll-c4").offsetWidth)- 200;
  };
}
if(buttonLM3!=null){
  buttonLM3.onclick = function () {
    document.querySelector(".scroll-c4").scrollLeft -= (document.querySelector(".scroll-c4").offsetWidth)- 200;
  };
}

//SERIES 2:-
const buttonLS2 = document.querySelector('.slide-left-s2');
const buttonRS2 = document.querySelector('.slide-right-s2');

if(buttonRS2!=null){
  buttonRS2.onclick = function () {
    document.querySelector(".scroll-c5").scrollLeft += (document.querySelector(".scroll-c5").offsetWidth)- 200;
  };
}
if(buttonLS2!=null){
buttonLS2.onclick = function () {
  document.querySelector(".scroll-c5").scrollLeft -= (document.querySelector(".scroll-c5").offsetWidth)- 200;
};
}

//SERIES 3:-
const buttonLS3 = document.querySelector('.slide-left-s3');
const buttonRS3 = document.querySelector('.slide-right-s3');

if(buttonRS3!=null){
  buttonRS3.onclick = function () {
    document.querySelector(".scroll-c6").scrollLeft += (document.querySelector(".scroll-c6").offsetWidth)- 200;
  };
}
if(buttonLS3!=null){
buttonLS3.onclick = function () {
  document.querySelector(".scroll-c6").scrollLeft -= (document.querySelector(".scroll-c6").offsetWidth)- 200;
};
}