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


}
function createMap(domElement, lat, long) {
  let map = L.map(domElement).setView([lat, long], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  autoCompleteLocation(map);
}


function autoCompleteLocation(map) {
  let api = `https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf624810b913f2e42649f6b248346a06d229fb&text=`;
  let search = $(".search");
  let locations = $(".locations");

  search.on("input", (event) => {
    value = event.target.value;
    if (value !== "" || "") {
      fetchData(api + value, (data) => {
        locations.empty();
          let {features} = data;
          features.forEach(location=>{
              new Location(locations,location,map);
          })
      });
    }
    else{
      locations.empty();
    }
  });
}

function onAddLocations(){
  let places = new Locations();
  $(window).on("addLocations",(event)=>{
      places.add(event.detail);
  })

}

async function fetchData(url, callback) {
  let request = await fetch(url);
  let response = await request.json().then((data) => {
    callback(data);
  });
}


async function getInfoFromIP() {
  let userinfo = $(".userinfo");
  let apikey = "e9dbdc6656b821659d74c53310cf97e3904c719ca9014eca74c572bc";
  let url = "https://api.ipdata.co?api-key=" + apikey;
  fetchData(url, (data) => {
    let info = new Userinfo(data, userinfo);
    info.showData();
  });
}

function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((data) => {
      callback(data);
    });
  }
}

