class Locations{
    constructor(){
        this.locations = [];
    }

    add(location){
        this.locations.push(location);
        if(this.locations.length==2){
            this.createPlan();
        }
    }
    
    createPlan(){
        let road = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624810b913f2e42649f6b248346a06d229fb&start=${this.locations[0].coordinates[0]},${this.locations[0].coordinates[1]}&end=${this.locations[1].coordinates[0]},${this.locations[1].coordinates[1]}`;
        fetchData(road,path=>{
            let map = this.locations[0].map;
            let {coordinates} = path.features[0].geometry;
            coordinates.forEach(coord=>{
             
                var polyline = L.polyline([coord[1], coord[0]], {color: 'red'}).addTo(map);
                map.fitBounds(polyline.getBounds());
            })
        })
    }
}

class Location {
  constructor(parent, data, map) {
    this.parent = parent;
    this.data = data;
    this.map = map;
    this.parent.append(`<div>${this.data.properties.label}</div>`);
    this.node = this.parent.find("div:last");
    let { coordinates } = this.data.geometry;
    this.coordinates = coordinates;
    this.node.on("click", () => {
      this.addMarker();
      let event = new CustomEvent("addLocations",{detail:this});
      window.dispatchEvent(event);
    });
  }

  addMarker() {
    
    this.marker = L.marker([this.coordinates[1], this.coordinates[0]]).addTo(this.map);
    this.addPopup();
  }

  addPopup() {
    let api = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${this.coordinates[1]}&lon=${this.coordinates[0]}`;
    fetchData(api, (street) => {
      let {
        country,
        postcode,
        city_district,
        shop,
        industrial,
        road,
        suburb,
        type,
      } = street.address;
      this.marker.bindPopup(`
        <div>
          <span>${country === undefined ? "" : country}</span>
          <span>${postcode === undefined ? "" : postcode}</span>
          <span>${city_district === undefined ? "" : city_district}</span>
          <span>${road === undefined ? "" : road}</span>
        </div>
        <div>
        <span>${suburb === undefined ? "" : suburb}</span>
        <span> ${shop === undefined ? "" : shop} ${
        industrial === undefined ? "" : industrial
      }</span>
        <span>${type === undefined ? "" : type}</span>
        </div>
        `);
    });
  }
}
