$(() => {
  main();
});

function main() {
  getInfoFromIP();

  getUserLocation((location) => {
    let map = document.querySelector("#map");
    let { latitude, longitude } = location.coords;
    createMap(map, latitude, longitude);
    onAddLocations();
  
  });

  menuOpenEvent();
  menuCloseEvent();
  closeMenu();  

  
}
function createMap(domElement, lat, long) {
  let map = L.map(domElement).setView([lat, long], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  autoCompleteLocation(map);
  onVisitedLocations(map);
}

function autoCompleteLocation(map) {
  let api = `https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf6248f5aeefad36a74b7fbc0428cf783e8f21&text=`;
  let search = $(".search");
  let locations = $(".locations");

  search.on("input", (event) => {
    locations.hide();
    value = event.target.value;
    if (value !== "" || "") {
      fetchData(api + value, (data) => {
        locations.empty();
        let { features } = data;
        features.forEach((location) => {
          new Location(locations, location, map);
        });
        locations.slideDown(250);
      });
    } else {
      locations.empty();
    }
  });
}

function onAddLocations() {
  let places = new Locations();
  $(window).on("addLocations", (event) => {
    let locations = $(".locations");
    let {detail} = event;
    let searched = addSearchedLocation(detail);

    places.add(detail);
    locations.slideUp(250);
  });
}

function onVisitedLocations(map){
  $(window).on("See-Visited-Location",(evt) => {
    let {coordinates} = evt.detail;
    let long = coordinates[0];
    let lat = coordinates[1];
    map.flyTo([lat, long], 12)
   
  })
}

function addSearchedLocation(data){
  let searchedLocationDom = $(".already-visited-locations");
  let searchedLocation = new VisitedLocation(searchedLocationDom,data);
  return searchedLocation;
}

async function fetchData(url, callback,onerror) {
  await fetch(url).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        callback(data);
      });
    } else {
      alert("Sajnos nem találtunk útvonalat a rendszerünkben!");
      onerror();
    }
  });
}

async function getInfoFromIP() {
  let userinfo = $(".userinfo");
  let apikey = "e9dbdc6656b821659d74c53310cf97e3904c719ca9014eca74c572bc";
  let url = "https://api.ipdata.co?api-key=" + apikey;
  fetchData(url, (data) => {
    let info = new Userinfo(data, userinfo);
  });
}

function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((data) => {
      callback(data);
    });
  }
}

function menuCloseEvent(){
  let menuOpener = $(".menu-opener");
  let menuCloser = $(".menu-closer");
  menuCloser.on("click",()=>{
      closeMenu();
      menuCloser.hide();
      menuOpener.show();
  });
}

function menuOpenEvent(){
  let menuOpener = $(".menu-opener");
  let menuCloser = $(".menu-closer");
  menuOpener.on("click",()=>{
      openMenu();
      menuOpener.hide();
      menuCloser.show();
    });
}

function openMenu(){
  let menu = $(".menu");
  menu.show(250);
}

function closeMenu(){
  let menu = $(".menu");
  menu.hide(250);
}