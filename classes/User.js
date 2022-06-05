class Userinfo{
    constructor(data,domElement){
        let {ip,city,country_code,country_name,flag,emoji_unicode,languages} = data;
        this.ip = ip;
        this.city = city;
        this.country_code = country_code;
        this.country_name = country_name;
        this.flag = flag;
        this.emoji_unicode = emoji_unicode;
        this.languages = languages;
        this.parent = domElement;
        console.log(this.languages);
    }

    showData(){
        this.parent.empty();
        this.parent.append(`
        <div class="cc">${this.country_code}</div>
        <div><img src="${this.flag}"/></div>
        <div>${this.ip}</div>
        <div>${this.city}</div>
        <div>${this.country_name}</div>
        <div>${this.languages[0].native}</div>`
        );
    }

}