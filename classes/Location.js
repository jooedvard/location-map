class Locations {
  constructor() {
    this.locations = [];
  }

  add(location) {
    this.locations.push(location);
    if (this.locations.length == 2) {
      this.createPlan();
    }
  }

  createPlan() {
    let road = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f5aeefad36a74b7fbc0428cf783e8f21&start=${this.locations[0].coordinates[0]},${this.locations[0].coordinates[1]}&end=${this.locations[1].coordinates[0]},${this.locations[1].coordinates[1]}`;
    fetchData(road, (path) => {
      let map = this.locations[0].map;
      let { coordinates } = path.features[0].geometry;

      L.Routing.control({
        waypoints: [
          L.latLng(coordinates[0][1], coordinates[0][0]),
          L.latLng(
            coordinates[coordinates.length - 1][1],
            coordinates[coordinates.length - 1][0]
          ),
        ],
        lineOptions: {
          styles: [{ color: "blue" }],
        },
      }).addTo(map);
    });
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
      let event = new CustomEvent("addLocations", { detail: this });
      window.dispatchEvent(event);
    });
  }

}
