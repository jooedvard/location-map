class Locations {
  constructor() {
    this.locations = [];
  }

  add(location) {
    let location1 = $("#location1");
    let location2 = $("#location2");

    this.locations.push(location);
    if (this.locations.length == 2) {
      location2.val(location.data.properties.label);
      this.createPlan();
      
     
    }
    else{
      location1.val(location.data.properties.label);
    }
  }

  createPlan() {
    let road = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f5aeefad36a74b7fbc0428cf783e8f21&start=${this.locations[0].coordinates[0]},${this.locations[0].coordinates[1]}&end=${this.locations[1].coordinates[0]},${this.locations[1].coordinates[1]}`;
    fetchData(
      road,
      (path) => {
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

        this.locations = [];
        this.hideLocationDomElements();
      },
      () => {
        this.locations = [];
        this.hideLocationDomElements();
      }
    );
  }

  hideLocationDomElements() {
    let location1 = $("#location1");
    let location2 = $("#location2");
    let search = $(".search");
    let locations = $(".locations");
    location1.val('');
    location2.val('');
    search.val("");
    locations.slideUp(250);
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
