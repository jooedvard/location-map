class VisitedLocation {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
    this.coordinates = this.data.coordinates;
    this.properties = this.data.data.properties;
    this.createNode();
  }

  createNode() {
    let { country, country_a, continent } = this.properties;
    this.parent.append(`

            <div class="already-visited-location"><div class="visited-country"><span>${country}</span></span>${country_a}</span></div><img src="icons/placeholder.png" class="icon2"/></div>
            
        `);
    this.elem = this.parent.find(".already-visited-location:last");
    this.onClick();
  }

  onClick() {
    this.elem.on("click", () => {
      this.onClickEvent();
    });
  }

  onClickEvent() {
    let click = new CustomEvent("See-Visited-Location", { detail: this });
    window.dispatchEvent(click);
    console.log(click);
  }
}
