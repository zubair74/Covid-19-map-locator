// initialize map

var mymap = L.map('mapid').setView([32.842674, -35.507813], 3);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

window.onload = function () {
  displayStores()
  showStoresMarkers()
  // clickshow()
  search()
}

// initialize marker array
let markers = [];
let storearr = [];

//  display all stores in the file

function displayStores() {
  let html = "";
  const Http = new XMLHttpRequest();
  const url = 'https://corona.lmao.ninja/v2/countries';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    let stores = JSON.parse(Http.responseText)

    stores.forEach(function (store, index) {
      // console.log(store);

      let address = store['country']
      let phoneNumber = store['continent']
      html += `<div class="store-container">
              <div class="store-address">
              <span>${address}</span>
              </div>
              <div class="store-phone-number">${phoneNumber}</div>
              <div class="store-number-container">
              <div class="store-number">
              ${index + 1}
              </div>
              </div>
              </div>`

      document.querySelector('.stores-list').innerHTML = html



    })
  }
}

// displaying markers of all stores

function showStoresMarkers() {
  const Http = new XMLHttpRequest();
  const url = 'https://corona.lmao.ninja/v2/countries';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    let stores = JSON.parse(Http.responseText)
    // console.log(stores);


    stores.forEach(function (store, index) {
      // console.log(store);

      let name = store['country']
      let lat = store['countryInfo']['lat']

      let long = store['countryInfo']['long']
      let address = store['cases']
      let phonenumber = store['todayCases']
      let timings = store['recovered']
      let postalcode = store['deaths']
      let tests = store['tests']
      let todaydeaths = store['todayDeaths']
      let storeobj = {
        names: name,
        Case: address,
        todaycases: phonenumber,
        recovered: timings,
        death: postalcode,
        test: tests,
        todaydeath: todaydeaths
      }
      storearr.push(storeobj)


      showMarkers(name, address, lat, long, index, phonenumber, timings, postalcode, tests, todaydeaths)
    })


  }

}

// showing the respective marker on store ckick




// initalize markers and add popup

function showMarkers(name, address, lat, long, index, phonenumber, timings, postalcode, tests, todaydeaths) {
  let marker = L.marker([lat, long]).addTo(mymap);
  markers.push(marker)
  // console.log(markers)

  function onMapClick() {
    let htmc =
      `<div class = 'store-info'>
      <div class = 'store-info-name'>${name}</div>
      <div class = 'store-info-timing'>TOTAL CASES: ${address}</div>
      <div class='store-info-phoneNumber'>
      CASES TODAY: ${phonenumber}
      </div>
      <div class='store-info-phoneNumber'>
      DEATHS TODAY: ${todaydeaths}
      </div>
      
      <div class='store-info-phoneNumber'>
      TOTAL DEATHS: ${postalcode}
      </div>
      <div class='store-info-phoneNumber'>
      TOTAL RECOVERED: ${timings}
      </div>
      
      <div class='store-info-phoneNumber'>
      TOTAL TESTS: ${tests}
      </div>
      </div>`
    var popup = L.popup()
      .setLatLng([lat, long])
      .setContent(htmc)
      .openOn(mymap);
  }

  marker.on('click', onMapClick);

}

// let postalarr = []



// let story = document.getElementsByClassName('stores-list')
// story.
// console.log(story);


// Array.from(story).forEach(element => {
//   postalarr.push(element)
//   // console.log(postalarr);

//   // console.log(element);

//   element.addEventListener('click',function(){
//     console.log('hello world');

//   })


// });



// function clickshow() {
//   let storeelements = document.getElementsByClassName('stores-list')
//   console.log(storeelements);

//   Array.from(storeelements).forEach(function (element, indexi) {
//     element.addEventListener('click', function () {
//       let myname = storearr[indexi].names
//       console.log(myname);


//       let my = `<div class = 'store-info'>
//       <div class = 'store-info-name'>${storearr[indexi].names}</div>
//       <div class = 'store-info-timing'>TOTAL CASES: ${storearr[indexi].Case}</div>
//       <div class='store-info-phoneNumber'>
//       CASES TODAY: ${storearr[indexi].todayCases}
//       </div>
//       <div class='store-info-phoneNumber'>
//       DEATHS TODAY: ${storearr[indexi].todayDeaths}
//       </div>
      
//       <div class='store-info-phoneNumber'>
//       TOTAL DEATHS: ${storearr[indexi].death}
//       </div>
//       <div class='store-info-phoneNumber'>
//       TOTAL RECOVERED: ${storearr[indexi].recovered}
//       </div>
      
//       <div class='store-info-phoneNumber'>
//       TOTAL TESTS: ${storearr[indexi].test}
//       </div>
//       </div>`
//       markers[indexi].bindPopup(my).openPopup();
//     })


//   })

// }


let postalarr = []

function search() {
  const Http = new XMLHttpRequest();
  // console.log(storearr);
  
  const url = 'https://corona.lmao.ninja/v2/countries';
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    let stores = JSON.parse(Http.responseText)
    // console.log(stores);


    stores.forEach(function (store, index) {
      let name = store['country']
      let lat = store['countryInfo']['lat']
      let long = store['countryInfo']['long']
      let address = store['cases']
      let phonenumber = store['todayCases']
      let timings = store['recovered']
      let postalcode = store['deaths']
      let tests = store['tests']
      let todaydeaths = store['todayDeaths']

      let storeobj = {
        names: name,
        Case: address,
        todaycases: phonenumber,
        recovered: timings,
        death: postalcode,
        test: tests,
        todaydeath: todaydeaths,
        lats : lat,
        longs : long
      }
      postalarr.push(storeobj)
    })

    // console.log(postalarr);

    let search = document.getElementById('zip-code-input')
    search.addEventListener('input', function () {
      let searchinp = document.getElementById('zip-code-input').value
      // console.log(searchinp);
      // console.log(postalarr);
      postalarr.forEach(function (hello) {
        // console.log(hello);

        let upp = searchinp[0].toUpperCase() +
          searchinp.slice(1);

        // console.log(upp);


        let mynam = hello.name
        // console.log(mynam);


        if (hello.names.includes(upp)) {

          let marker = L.marker([hello.lats, hello.longs]).addTo(mymap);
          let htm = `<div class = 'store-info'>
          <div class = 'store-info-name'>${hello.names}</div>
          <div class = 'store-info-timing'>TOTAL CASES: ${hello.Case}</div>
          <div class='store-info-phoneNumber'>
          CASES TODAY: ${hello.todaycases}
          </div>
          <div class='store-info-phoneNumber'>
          DEATHS TODAY: ${hello.todaydeath}
          </div>
          
          <div class='store-info-phoneNumber'>
          TOTAL DEATHS: ${hello.death}
          </div>
          <div class='store-info-phoneNumber'>
          TOTAL RECOVERED: ${hello.recovered}
          </div>
          
          <div class='store-info-phoneNumber'>
          TOTAL TESTS: ${hello.test}
          </div>
          </div>`

          var popup = L.popup()
            .setLatLng([hello.lats, hello.longs])
            .setContent(htm,{
              autoPan: false
          })
            .openOn(mymap);

          marker.on('click', onMapClick);



        }



      });




    })
    let storeelements = document.querySelectorAll('.store-container');
    // console.log(storeelements);
    let storesarr = [storeelements]
    // console.log(storesarr);
    
    
    

    storeelements.forEach(function(element,index){
      element.addEventListener('click',function(){

        let marker = L.marker([postalarr[index].lats, postalarr[index].longs]).addTo(mymap);
          let htma = `<div class = 'store-info'>
          <div class = 'store-info-name'>${postalarr[index].names}</div>
          <div class = 'store-info-timing'>TOTAL CASES: ${postalarr[index].Case}</div>
          <div class='store-info-phoneNumber'>
          CASES TODAY: ${postalarr[index].todaycases}
          </div>
          <div class='store-info-phoneNumber'>
          DEATHS TODAY: ${postalarr[index].todaydeath}
          </div>
          
          <div class='store-info-phoneNumber'>
          TOTAL DEATHS: ${postalarr[index].death}
          </div>
          <div class='store-info-phoneNumber'>
          TOTAL RECOVERED: ${postalarr[index].recovered}
          </div>
          
          <div class='store-info-phoneNumber'>
          TOTAL TESTS: ${postalarr[index].test}
          </div>
          </div>`

          var popup = L.popup()
            .setLatLng([postalarr[index].lats, postalarr[index].longs])
            .setContent(htma)
            .openOn(mymap);

          marker.on('click', onMapClick);

        
      })
      
    });
    

  }

}


function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}

mymap.on('click', onMapClick);
