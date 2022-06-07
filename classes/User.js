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

}