const TSAPI_URL = 'https://api.themoviedb.org/3/tv/top_rated?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1'
const USAPI_URL = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&language=en-US&page=1'
const SAPI_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613&page=1'


const tvSeries = document.getElementById('tv-series')
const utvSeries = document.getElementById('utv-series')
const ltvSeries = document.getElementById('ltv-series')




let st = 1;



// Get initial series
getSeries(SAPI_URL)

async function getSeries(url) {
    const res = await fetch(url)
    const data = await res.json()

    showSeries(data.results)
}

function showSeries(series) {
    tvSeries.innerHTML = ''

    series.forEach((tv) => {
        const { name, poster_path, overview, id } = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        tvSeries.appendChild(tvEl)
    })
}

// Get upcoming series
getTSeries(TSAPI_URL)

async function getTSeries(url) {
    const res = await fetch(url)
    const data = await res.json()

    showTSeries(data.results)
}

function showTSeries(tseries) {
    ltvSeries.innerHTML = ''

    tseries.forEach((tv) => {
        const { name, poster_path, overview, id } = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        ltvSeries.appendChild(tvEl)
    })
}

//On Air

getUSeries(USAPI_URL)

async function getUSeries(url) {
    const res = await fetch(url)
    const data = await res.json()

    showUSeries(data.results)
}

function showUSeries(useries) {
    utvSeries.innerHTML = ''

    useries.forEach((tv) => {
        const { name, poster_path, overview, id } = tv

        var summary = overview.split(' ').slice(0,10).join(' ');

        const tvEl = document.createElement('div')
        tvEl.classList.add('tv')

        tvEl.innerHTML = `
        <a onclick = "tvSelected('${id}')" href = "#"><img src="${IMG_PATH + poster_path}" alt="${name}" ></a>
        <a onclick = "tvSelected('${id}')" href = "#">
            <div class="overview">
                <h3>${name}</h3>
                ${summary}...
            </div>
        </a>
        `
        utvSeries.appendChild(tvEl)
    })
}


function tseries(){
    const URL = `https://api.themoviedb.org/3/tv/top_rated?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613`
    sessionStorage.setItem('getExtraSeries', URL);
    sessionStorage.setItem('nameTypeSeries', 'Top Rated Series');
    location.replace("extraseries.html")
}
function pseries(){
    const URL = `https://api.themoviedb.org/3/tv/popular?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613`
    sessionStorage.setItem('getExtraSeries', URL);
    sessionStorage.setItem('nameTypeSeries', 'Popular Series');
    location.replace("extraseries.html")
}
function oseries(){
    const URL = `https://api.themoviedb.org/3/tv/on_the_air?api_key=a3d1d37e68ef5b6e3c68f6fa5f9ba613`
    sessionStorage.setItem('getExtraSeries', URL);
    sessionStorage.setItem('nameTypeSeries', 'New Series');
    location.replace("extraseries.html")
}

/////EXTRA SERIES////
async function getESeries() {
    const urlt = sessionStorage.getItem('getExtraSeries');  
    const url = urlt + `&page=${st}`
    console.log(url);
    const nameTypeM = sessionStorage.getItem('nameTypeSeries');
    document.getElementById("headin").innerHTML = nameTypeM;
    console.log(nameTypeM);
    const res = await fetch(url)
    const data = await res.json()  
    showESeries(data.results)
  }
  
  function showESeries(gtv) {
      console.log(gtv);
  
      gtv.forEach((tv) => {
          const { name, poster_path, overview, id } = tv
          console.log(name);
  
          var summary = overview.split(' ').slice(0,10).join(' ');
  
          const tvEl = document.createElement('div')
          tvEl.classList.add('tv1')
  
          tvEl.innerHTML += `
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
  
  function getMeMoreSeries(){
    st++;
    getESeries();
  }

