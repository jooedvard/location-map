$(() => {main()});

function main() {
  
    getInfoFromIP();
    getUserLocation((location) => {
      console.log(location);
    let map = document.querySelector("#map");
    let { latitude, longitude } = location.coords;
    createMap(map, latitude, longitude);
    
  });
}

function getUserLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((data) => {
      callback(data);
    });
  }
}

function createMap(domElement, lat, long) {
  let map = L.map(domElement).setView([lat, long], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

}

function addMarker(map,lat,long){
    L.marker([lat,long]).addTo(map);
}

async function fetchData(url,callback){
    let request = await fetch(url);
    let response = await request.json().then((data)=>{
        callback(data);
    });
    
}

async function getInfoFromIP(){
    let userinfo = $(".userinfo");
    let apikey = "e9dbdc6656b821659d74c53310cf97e3904c719ca9014eca74c572bc";
    let url = "https://api.ipdata.co?api-key="+apikey;
    fetchData(url,(data)=>{
        let info = new Userinfo(data,userinfo);
        info.showData();
    })
}

