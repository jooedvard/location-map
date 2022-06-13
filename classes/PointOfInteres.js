class Poi{
    constructor(data,map){
        this.data = data;
        this.map = map;
        console.log(this);
        this.addMarker();
    }

    addMarker(){
        let pos = this.data.geometry.coordinates;
        let marker  = L.marker([pos[1], pos[0]]).addTo(this.map);
        marker.bindPopup(`<div>${this.data.properties.osm_tags.name}</div>`).openPopup();
    }

}